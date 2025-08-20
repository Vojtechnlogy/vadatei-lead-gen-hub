import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LANGS: { code: "en" | "cz" | "de"; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "cz", label: "CZ" },
  { code: "de", label: "DE" },
];

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const current =
    LANGS.find((l) =>
      i18n.language ? i18n.language.toLowerCase().startsWith(l.code) : false
    ) || LANGS[0];

  const setLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    setOpen(false);
  };

  const openMenu = () => {
    if (closeTimeout.current) {
      window.clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpen(true);
  };

  const closeMenuDelayed = (delay = 120) => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    closeTimeout.current = window.setTimeout(() => {
      setOpen(false);
      closeTimeout.current = null;
    }, delay);
  };

  // Close on outside click or Escape
  useEffect(() => {
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const target = e.target as Node | null;
      if (!target) return;
      if (!containerRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      document.removeEventListener("keydown", onKey);
      if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={() => closeMenuDelayed(120)}
      onFocus={openMenu}
      onBlur={() => closeMenuDelayed(120)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 px-2 py-0 text-sm bg-transparent hover:bg-muted-foreground/5 rounded focus:outline-none"
        title={`Language: ${current.label}`}
        onClick={() => setOpen((v) => !v)} // click toggles the menu
      >
        <span className="font-medium">{current.label}</span>

        {/* chevron that flips between down (v) and up (∧) */}
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ease-out ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        role="menu"
        onMouseEnter={openMenu}
        onMouseLeave={() => closeMenuDelayed(120)}
        className={`absolute right-0 top-full mt-1 w-28 rounded-md bg-background shadow-md z-50 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="py-1">
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              role="menuitem"
              onClick={() => setLang(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-muted-foreground/5 ${
                lang.code === current.code ? "font-semibold" : "font-normal"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}