"use client";

import { useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";

// Helper to generate a unique ID if it doesn't exist
const generateUUID = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const getOSName = () => {
  const ua = navigator.userAgent;
  if (ua.indexOf("Win") !== -1) return "Windows";
  if (ua.indexOf("Mac") !== -1) return "macOS";
  if (ua.indexOf("X11") !== -1) return "UNIX";
  if (ua.indexOf("Linux") !== -1) return "Linux";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  return "Unknown OS";
};

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet";
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Opera Mini/i.test(ua)) return "Mobile";
  return "Desktop";
};

const getBrowserName = () => {
  const ua = navigator.userAgent;
  if (ua.indexOf("Firefox") > -1) return "Firefox";
  if (ua.indexOf("SamsungBrowser") > -1) return "Samsung Browser";
  if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) return "Opera";
  if (ua.indexOf("Trident") > -1) return "Internet Explorer";
  if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) return "Edge";
  if (ua.indexOf("Chrome") > -1) return "Chrome";
  if (ua.indexOf("Safari") > -1) return "Safari";
  return "Unknown Browser";
};

const getDeviceSpecs = () => {
  return JSON.stringify({
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    pixelRatio: window.devicePixelRatio || 1,
    os: getOSName(),
    cpuCores: navigator.hardwareConcurrency || "Unknown",
    deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Unknown",
  });
};

const fetchLocation = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (res.ok) {
      const data = await res.json();
      return `${data.city || "Unknown City"}, ${data.country_name || "Unknown Country"}`;
    }
  } catch (error) {
    console.error("Failed to fetch location from ipapi.co:", error);
  }
  
  // Fallback to timezone if geolocation API is blocked or offline
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return `Unknown Location (Timezone: ${tz})`;
  } catch {
    return "Unknown Location";
  }
};

export default function VisitorTracker() {
  const isInitialized = useRef(false);
  const sessionTime = useRef(0);
  const visitorIdRef = useRef("");

  useEffect(() => {
    // Prevent double execution in React StrictMode
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Retrieve or generate visitor ID
    let storedId = localStorage.getItem("tmz_visitor_id");
    if (!storedId) {
      storedId = generateUUID();
      localStorage.setItem("tmz_visitor_id", storedId);
    }
    visitorIdRef.current = storedId;

    const deviceType = getDeviceType();
    const browserName = getBrowserName();
    const specs = getDeviceSpecs();

    const initTracker = async () => {
      const locationInfo = await fetchLocation();

      if (supabase) {
        const { error } = await supabase.from("site_visitors").upsert(
          {
            visitor_id: storedId,
            device: deviceType,
            location: locationInfo,
            browser: browserName,
            device_speq: specs,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "visitor_id" }
        );

        if (error) {
          console.error("Supabase visitor registration error:", error);
        } else {
          console.log("Supabase visitor registration success:", storedId);
        }
      } else {
        console.log("Simulating visitor registration:", {
          visitor_id: storedId,
          device: deviceType,
          location: locationInfo,
          browser: browserName,
          device_speq: specs,
        });
      }
    };

    initTracker();

    // Heartbeat to track session time every 15 seconds
    const interval = setInterval(async () => {
      // Only track time when page is visible to user
      if (document.hidden) return;

      sessionTime.current += 15;

      if (supabase) {
        const { error } = await supabase
          .from("site_visitors")
          .update({
            session_time: sessionTime.current,
            updated_at: new Date().toISOString(),
          })
          .eq("visitor_id", storedId);

        if (error) {
          console.error("Supabase heartbeat update error:", error);
        }
      } else {
        console.log(`Simulating heartbeat: Session duration ${sessionTime.current}s`);
      }
    }, 15000);

    // Track on page unload/visibility change for final sync (best-effort)
    const syncFinalSessionTime = () => {
      if (!supabase) return;
      const payload = JSON.stringify({
        visitor_id: storedId,
        session_time: sessionTime.current,
        updated_at: new Date().toISOString(),
      });
      
      // Attempt to use sendBeacon for reliable delivery on page close
      if (navigator.sendBeacon) {
        // SendBeacon requires a Blob or FormData for JSON
        const blob = new Blob([payload], { type: "application/json" });
        // Note: Supabase REST API endpoints can receive POSTs, but standard update requires PUT/PATCH and auth.
        // As sendBeacon doesn't support custom headers (like auth headers needed for Supabase anon key),
        // we'll fall back to standard fetch inside visible changes or keep relying on the heartbeat.
      }
      
      // Standard fetch as fallback
      supabase
        .from("site_visitors")
        .update({
          session_time: sessionTime.current,
          updated_at: new Date().toISOString(),
        })
        .eq("visitor_id", storedId)
        .then(({ error }) => {
          if (error) console.error("Final session sync failed:", error);
        });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        syncFinalSessionTime();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", syncFinalSessionTime);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", syncFinalSessionTime);
    };
  }, []);

  return null; // Silent analytics component
}
