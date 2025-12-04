'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CeoLoginPage() {
    const router = useRouter();
    const [accessKey, setAccessKey] = useState('');
    const [error, setError] = useState<string | null>(null);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // For now, we don’t actually check anything – this is just a “grown-up” entry point.
        // Later, this can hook into real auth or a simple env-based key.
        if (!accessKey.trim()) {
            setError('Enter any key for now – this is a soft gate.');
            return;
        }

        setError(null);
        router.push('/ceo');
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                        <Lock className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight">
                            CEO dashboard access
                        </h1>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Hidden grown-up entrance for the Digital Hooligan command center.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="space-y-2 text-xs">
                        <label
                            htmlFor="access-key"
                            className="inline-flex items-center gap-1 text-muted-foreground"
                        >
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>Access key</span>
                        </label>
                        <input
                            id="access-key"
                            type="password"
                            value={accessKey}
                            onChange={(e) => setAccessKey(e.target.value)}
                            className="h-9 w-full rounded-lg border border-border bg-background px-3 text-xs outline-none ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            placeholder="For now, anything goes. Later, real auth."
                        />
                        {error && (
                            <p className="text-[11px] text-amber-400">
                                {error}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
                    >
                        <span>Enter CEO dashboard</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                </form>

                <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1 hover:bg-muted"
                    >
                        <span>Back to marketing site</span>
                    </Link>
                    <span className="text-xs text-muted-foreground/70">
                        Future: wire into real auth & audit.
                    </span>
                </div>
            </div>
        </div>
    );
}