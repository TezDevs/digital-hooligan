"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CEO_PASSWORD =
    process.env.NEXT_PUBLIC_CEO_PASSWORD ?? "smart-chaos";

export default function CeoLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (password.trim() === CEO_PASSWORD) {
            setError("");
            router.push("/ceo");
        } else {
            setError("Incorrect key. Try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-neutral-100">
            <div className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                            Digital Hooligan
                        </span>
                        <h1 className="mt-1 text-lg font-semibold text-neutral-50">
                            CEO Entrance
                        </h1>
                    </div>
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-300">
                        Private
                    </span>
                </div>

                <p className="mb-4 text-xs text-neutral-500">
                    This is your hidden control room. Enter the CEO key to access the
                    dashboard.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label
                            htmlFor="password"
                            className="block text-xs font-medium text-neutral-300"
                        >
                            CEO key
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none ring-0 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                            autoComplete="off"
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-rose-400" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-xl border border-emerald-500/70 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20"
                    >
                        Enter dashboard
                    </button>
                </form>

                <p className="mt-4 text-[11px] text-neutral-500">
                    Tip: set <code className="rounded bg-neutral-900 px-1 py-0.5">
                        NEXT_PUBLIC_CEO_PASSWORD
                    </code>{" "}
                    in your env to change this key later.
                </p>
            </div>
        </div>
    );
}