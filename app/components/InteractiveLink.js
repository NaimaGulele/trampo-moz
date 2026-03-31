"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InteractiveLink({ 
  href, 
  children, 
  style,
  hoverBgColor,
  normalBgColor,
  onClick,
  ...props 
}) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (!e.defaultPrevented) {
      e.preventDefault();
      router.push(href);
    }
  };

  const linkStyle = {
    ...style,
    ...(isHovering && hoverBgColor ? { backgroundColor: hoverBgColor } : {}),
    ...(normalBgColor && !isHovering ? { backgroundColor: normalBgColor } : {}),
  };

  return (
    <a 
      href={href}
      style={linkStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {children}
    </a>
  );
}
