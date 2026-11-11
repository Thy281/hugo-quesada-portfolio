"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const initialTheme: Theme = savedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
  }, []);

  function selectTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  }

  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      <button type="button" onClick={() => selectTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>[{theme === "dark" ? "Dark" : "Light"}]</button>
    </div>
  );
}
