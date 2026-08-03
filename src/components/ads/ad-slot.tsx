export type AdPlacement = "tool-bottom" | "home-bottom";

export function AdSlot({ placement }: { placement: AdPlacement }) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== "true") {
    return null;
  }

  return (
    <aside className="ad-slot" aria-label="広告" data-ad-placement={placement}>
      <p className="ad-slot-label">広告</p>
      <div className="ad-slot-content">
        広告を表示するには、広告サービスの設定が必要です。
      </div>
    </aside>
  );
}
