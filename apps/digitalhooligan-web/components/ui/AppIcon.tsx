// apps/digitalhooligan-web/components/ui/AppIcon.tsx
import Image from "next/image";

type AppIconProps = {
  src?: string | null;
  alt: string;
  size?: number; // pixels
};

const FALLBACK_ICON = "/images/hypewatch-missing-icon.png";

export function AppIcon({ src, alt, size = 64 }: AppIconProps) {
  return (
    <div
      className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-[#111111] border border-white/10"
      style={{ width: size, height: size }}
    >
      <Image
        src={src || FALLBACK_ICON}
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
