import { ENABLE_COOKIES } from "@/lib/utils";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean | null | undefined>;

const hasGtag = () => typeof window !== "undefined" && typeof window.gtag === "function";

export const canTrack = () => ENABLE_COOKIES && hasGtag();

let currentPagePath = "";

export function setAnalyticsPagePath(path: string) {
  currentPagePath = path;
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (!canTrack()) return;
  window.gtag!("event", name, {
    page_path: currentPagePath || undefined,
    ...params,
  });
}

export function trackPageView(path: string, title?: string) {
  if (!canTrack()) return;
  setAnalyticsPagePath(path);
  window.gtag!("event", "page_view", {
    page_path: path,
    page_title: title,
  });
}

export function trackCtaClick(label: string, location: string, extra: EventParams = {}) {
  trackEvent("cta_click", {
    cta_label: label,
    cta_location: location,
    ...extra,
  });
}

export function trackPhoneClick(phone: string, location: string) {
  trackEvent("phone_click", {
    phone,
    click_location: location,
  });
}

export function trackEmailClick(email: string, location: string) {
  trackEvent("email_click", {
    email,
    click_location: location,
  });
}

export function trackOutboundClick(url: string, location: string, label?: string) {
  trackEvent("outbound_click", {
    url,
    click_location: location,
    label,
  });
}

export function startScrollDepthTracking() {
  if (typeof window === "undefined") return () => {};

  const thresholds = [25, 50, 75, 90, 100];
  let fired = new Set<number>();
  let ticking = false;

  const computeScrollPercent = () => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollTop = window.scrollY || doc.scrollTop || body.scrollTop || 0;
    const scrollHeight = doc.scrollHeight || body.scrollHeight || 0;
    const viewport = window.innerHeight || doc.clientHeight || 0;
    const maxScroll = Math.max(1, scrollHeight - viewport);
    const pct = Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100)));
    return pct;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      if (!canTrack()) return;

      const pct = computeScrollPercent();
      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          trackEvent("scroll_depth", {
            percent: t,
          });
        }
      }
    });
  };

  const onRouteChange = () => {
    fired = new Set<number>();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("vadatei:route_change", onRouteChange);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("vadatei:route_change", onRouteChange);
  };
}
