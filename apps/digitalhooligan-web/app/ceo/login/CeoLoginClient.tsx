"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Temporary hard-coded CEO passcode.
// If you change it, update this constant.
const EXPECTED_PASSCODE = "digital-chaos1@";

export function CeoLoginClient() {
    const router = useRouter();

    const [passcode, setPasscode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);

        setIsSubmitting(true);
        try {
            if (passcode.trim() !== EXPECTED_PASSCODE) {
                setError("Invalid passcode");
                return;
            }

            // 🔑 On success, go straight to /ceo
            router.push("/ceo");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-neutral-950 px-4 py-8 text-neutral-100">
            <div className="mx-auto flex max-w-md flex-col gap-6">
                {/* Header */}
                <header className="space-y-2">
                    <p className="text-xs uppercase tracking-wide text-neutral-500">
                        Digital Hooligan · CEO
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        CEO entrance
                    </h1>
                    <p className="text-sm text-neutral-400">
                        Enter the CEO passcode to access the internal dashboard.
                    </p>
                </header>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4"
                >
                    <div className="space-y-2">
                        <label
                            htmlFor="ceo-passcode"
                            className="text-xs font-medium uppercase tracking-wide text-neutral-400"
                        >
                            CEO passcode
                        </label>
                        <input
                            id="ceo-passcode"
                            type="password"
                            autoComplete="current-password"
                            className="w-full rounded-xl border border-neutral-700 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none ring-0 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-red-400" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Checking…" : "Enter dashboard"}
                    </button>
                </form>

                {/* Footer note */}
                <div className="text-xs text-neutral-500">
                    <p>
                        CEO passcode is currently{" "}
                        <span className="font-mono text-emerald-400">
                            digital-chaos1@
                        </span>{" "}
                        (set in <span className="font-mono">CeoLoginClient.tsx</span>).
                    </p>
                    <p className="mt-2">
                        <Link
                            href="/"
                            className="text-emerald-400 hover:text-emerald-300"
                        >
                            ← Back to main site
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}