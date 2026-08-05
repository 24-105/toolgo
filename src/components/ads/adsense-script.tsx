import { isAdSenseConfigured } from "./ad-slot";

export function AdSenseScript() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim();

  if (!isAdSenseConfigured() || !publisherId) {
    return null;
  }

  return (
    <script
      id="adsense-script"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
    />
  );
}
