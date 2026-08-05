import Script from "next/script";

export type AdPlacement = "tool-bottom" | "home-bottom";

export function isAdSenseConfigured() {
  return (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_ADS_ENABLED === "true" &&
    Boolean(process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim())
  );
}

export function AdSlot({ placement }: { placement: AdPlacement }) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim();
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID?.trim();

  if (!isAdSenseConfigured() || !publisherId || !slotId) {
    return null;
  }

  return (
    <aside className="ad-slot" aria-label="広告" data-ad-placement={placement}>
      <p className="ad-slot-label">広告</p>
      <div className="ad-slot-content">
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: "5rem" }}
          data-ad-client={publisherId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <Script id={`adsense-slot-${placement}`} strategy="afterInteractive">
          {"(window.adsbygoogle = window.adsbygoogle || []).push({});"}
        </Script>
      </div>
    </aside>
  );
}
