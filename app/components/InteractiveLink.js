"use client";

import Link from "next/link";

export default function InteractiveLink({ 
  href, 
  children, 
  onMouseEnter, 
  onMouseLeave, 
  style,
  ...props 
}) {
  return (
    <Link 
      href={href}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </Link>
  );
}
