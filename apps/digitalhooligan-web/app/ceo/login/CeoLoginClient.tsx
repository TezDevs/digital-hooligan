"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type LoginResponse = { ok: true } | { ok: false; message?: string };

export function CeoLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextPath = useMemo(() => {
    const n = searchParams.get("next");
    // Basic safety: only allow internal redirects
    if (!n) return "/ceo";
    if (!n.startsWith("/")) return "/ceo";
    if (n.startsWith("//")) return "/ceo";
    return n;
  }, [searchParams]);

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/ceo/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json().catch(() => ({}))) as LoginResponse;

      if (!res.ok || !data || (data as any).ok !== true) {
        setError((data as any)?.message ?? "Login failed.");
        return;
      }

      router.replace(nextPath);
    } catch {
      setError("Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-8 text-neutral-100">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Digital Hooligan · CEO
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            CEO entrance
          </h1>
          <p className="text-sm text-neutral-400">
            Enter the CEO password to access the internal dashboard.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="ceo-password"
              className="text-xs font-medium uppercase tracking-wide text-neutral-400"
            >
              CEO password
            </label>
            <input
              id="ceo-password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-neutral-700 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none ring-0 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="text-xs text-neutral-500">
          <p>
            This is a baseline password gate (no accounts). If you can’t log in,
            confirm <span className="font-mono">DH_CEO_GATE_PASSWORD</span> is
            set for this environment.
          </p>
          <p className="mt-2">
            <Link href="/" className="text-emerald-400 hover:text-emerald-300">
              ← Back to main site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
