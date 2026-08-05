import Script from "next/script";

import { isAdSenseConfigured } from "./ad-slot";

export function AdSenseScript() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim();

  if (!isAdSenseConfigured() || !publisherId) {
    return null;
  }

  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
    />
  );
}
