const AUTH_KEY = "trampoAuth";
const USERS_KEY = "trampoUsers";

export function getAuth() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  } catch {
    return null;
  }
}

export function setAuth(email, name = "") {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, JSON.stringify({ email, name }));
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}

export function getUsers() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveUser(user) {
  if (typeof window === "undefined") return;
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUser(email) {
  if (!email) return null;
  return getUsers().find((user) => user.email === email.toLowerCase());
}

export function getProfileKey(email) {
  return `trampoProfile_${email}`;
}

export function getProfile(email) {
  if (typeof window === "undefined" || !email) return null;
  try {
    return JSON.parse(localStorage.getItem(getProfileKey(email)) || "null");
  } catch {
    return null;
  }
}

export function saveProfile(email, profile) {
  if (typeof window === "undefined" || !email) return;
  localStorage.setItem(getProfileKey(email), JSON.stringify(profile));
}

export function isAuthenticated() {
  return !!getAuth()?.email;
}
