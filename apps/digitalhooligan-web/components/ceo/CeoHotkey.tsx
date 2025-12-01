"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Listens for a secret keyboard shortcut and routes to /ceo/login.
 *
 * Current combo: Cmd/Ctrl + Shift + C
 * (easy to remember: "CEO / Console / Control")
 */
export default function CeoHotkey() {
    const router = useRouter();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            const key = event.key.toLowerCase();

            const hasModifier = (event.metaKey || event.ctrlKey) && event.shiftKey;
            const isCombo = hasModifier && key === "c";

            if (!isCombo) return;

            event.preventDefault();
            router.push("/ceo/login");
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [router]);

    // Renders nothing – it just attaches the listener.
    return null;
}
