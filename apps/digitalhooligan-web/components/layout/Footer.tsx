"use client";

import React from "react";
import Container from "./Container";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-dh-street-gray/70 bg-dh-black/90">
            <Container>
                <div className="flex flex-col gap-3 py-4 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {year} Digital Hooligan. Built and operated by{" "}
                        <span className="text-neutral-200 font-medium">Courtez “TezDevs” Cannady</span>.
                    </p>
                    <p className="text-[11px] text-neutral-500">
                        Small, sharp tools for people who live in drops, charts, and alerts.
                    </p>
                </div>
            </Container>
        </footer>
    );
}

