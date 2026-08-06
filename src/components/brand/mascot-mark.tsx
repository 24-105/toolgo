import Image from "next/image";

import { publicPath } from "@/lib/seo";

type MascotMarkProps = {
  size?: "sm" | "md";
  priority?: boolean;
};

export function MascotMark({ size = "md", priority = false }: MascotMarkProps) {
  const pixels = size === "sm" ? 28 : 36;

  return (
    <Image
      src={publicPath("/brand/frog-logo-mark.png")}
      alt=""
      width={pixels}
      height={pixels}
      priority={priority}
      className={`mascot-mark mascot-mark-${size}`}
      aria-hidden="true"
    />
  );
}
