// components/LockVh.tsx
"use client";
import { useEffect } from "react";

export default function LockVh() {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh-locked",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);
  return null;
}
