"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

const themeEvent = "toolgo-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(themeEvent, callback);
  return () => window.removeEventListener(themeEvent, callback);
}

function getSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    let savedTheme: string | null = null;
    try {
      savedTheme = window.localStorage.getItem("toolgo-theme");
    } catch {
      // localStorageが利用できない環境でも、テーマ切り替え自体は動作させます。
    }
    const dark = savedTheme === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    window.dispatchEvent(new Event(themeEvent));
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;
    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    try {
      window.localStorage.setItem("toolgo-theme", nextIsDark ? "dark" : "light");
    } catch {
      // 保存できない環境では、現在のページ内だけテーマを切り替えます。
    }
    window.dispatchEvent(new Event(themeEvent));
  }

  return (
    <button
      className="icon-button"
      type="button"
      aria-label={isDark ? "ライトテーマに切り替え" : "ダークテーマに切り替え"}
      title={isDark ? "ライトテーマ" : "ダークテーマ"}
      onClick={toggleTheme}
    >
      {isDark ? (
        <Sun size={17} strokeWidth={1.8} />
      ) : (
        <Moon size={17} strokeWidth={1.8} />
      )}
    </button>
  );
}
