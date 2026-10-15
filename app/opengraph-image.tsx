import { ogImage, ogSize } from "./lib/og";

export const alt = "Brandan Pratt — I advise on AI, then I build it.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "AI Consultant & Builder", title: "I advise on AI, then I build it." });
}
