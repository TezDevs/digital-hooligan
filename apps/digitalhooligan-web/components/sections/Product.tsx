"use client";

import React from "react";
import Image from "next/image";

type ProductProps = {
    name: string;
    label?: string;
    description: string;
    iconSrc: string;
    iconAlt: string;
    accent?: "mint" | "purple" | "amber";
    isSelected?: boolean;
    onClick?: () => void;
};

export function Product({
    name,
    label = "Hooligan App",
    description,
    iconSrc,
    iconAlt,
    accent = "mint",
    isSelected = false,
    onClick,
}: ProductProps) {
    const accentBorder =
        accent === "purple"
            ? "border-[#a855f7]/60"
            : accent === "amber"
                ? "border-amber-400/70"
                : "border-dh-electric-mint/70";

    const accentGlow =
        accent === "purple"
            ? "shadow-[0_0_24px_rgba(168,85,247,0.45)]"
            : accent === "amber"
                ? "shadow-[0_0_24px_rgba(251,191,36,0.4)]"
                : "shadow-[0_0_24px_rgba(30,255,203,0.55)]";

    const selectedRing = isSelected
        ? "ring-2 ring-dh-electric-mint/70"
        : "ring-0";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`group relative flex h-full flex-col justify-between rounded-3xl border border-dh-street-gray/70 bg-black/80 px-4 py-4 sm:px-5 sm:py-5 text-left
                  transition-transform transition-shadow duration-200
                  hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(30,255,203,0.35)]
                  ${isSelected ? accentGlow : ""}`}
        >
            {/* icon + title */}
            <div className="flex items-start gap-3">
                <div
                    className={`relative h-12 w-12 rounded-2xl border bg-zinc-950 ${accentBorder} ${selectedRing} flex items-center justify-center overflow-hidden`}
                >
                    <Image
                        src={iconSrc}
                        alt={iconAlt}
                        width={48}
                        height={48}
                        className="h-10 w-10 object-contain"
                    />
                </div>

                <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                        {label}
                    </p>
                    <h3 className="text-sm sm:text-base font-semibold text-white">
                        {name}
                    </h3>
                </div>
            </div>

            {/* description */}
            <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {description}
            </p>

            {/* subtle bottom bar */}
            <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-500">
                <span className="group-hover:text-dh-electric-mint">
                    Tap to spotlight this app
                </span>
                <span className="hidden sm:inline-block text-neutral-600">
                    Built under the Hooligan banner
                </span>
            </div>
        </button>
    );
}
