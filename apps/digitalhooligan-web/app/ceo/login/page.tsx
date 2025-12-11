"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CeoLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [passcode, setPasscode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const nextPath = searchParams.get("next") || "/ceo";

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/ceo/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ passcode }),
            });

            if (res.ok) {
                router.push(nextPath);
                router.refresh();
            } else {
                setError("Wrong passcode. Try again.");
            }
        } catch {
            setError("Something went wrong. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-50">
            <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-emerald-300"
                >
                    <span className="text-base leading-none">←</span>
                    <span>Back to main site</span>
                </Link>

                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold">CEO entrance</h1>
                    <p className="text-sm text-neutral-400">
                        Private cockpit for Digital Hooligan. This is a simple gate, not
                        bank-grade security.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4"
                >
                    <label className="block text-sm font-medium text-neutral-200">
                        Access passcode
                        <input
                            type="password"
                            autoComplete="off"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-50 outline-none ring-0 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            placeholder="Enter passcode"
                        />
                    </label>

                    {error && (
                        <p className="text-xs text-rose-400" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || !passcode}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-300"
                    >
                        {isSubmitting ? "Checking…" : "Enter CEO dashboard"}
                    </button>

                    <p className="text-[11px] text-neutral-500">
                        Demo-only gate. Real auth can plug in here later without changing
                        the CEO views.
                    </p>
                </form>
            </div>
        </div>
    );
}