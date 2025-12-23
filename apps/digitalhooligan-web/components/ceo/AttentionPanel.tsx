'use client'

export type AttentionItem = {
  id: string
  level: 'critical' | 'warning' | 'info'
  title: string
  description: string
  source: 'incidents' | 'health' | 'deployments' | 'security' | 'manual'
  actionLabel?: string
  actionHref?: string
  timestamp: string
}

const levelStyles: Record<AttentionItem['level'], string> = {
  critical: 'border-red-500 bg-red-500/5',
  warning: 'border-yellow-500 bg-yellow-500/5',
  info: 'border-slate-500 bg-slate-500/5',
}

const levelText: Record<AttentionItem['level'], string> = {
  critical: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-slate-300',
}

export function AttentionPanel({ items }: { items: AttentionItem[] }) {
  if (!items.length) {
    return (
      <section className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="mb-2 text-sm font-semibold text-slate-300">
          Attention
        </h2>
        <p className="text-slate-400">
          All systems nominal. No action required.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950 p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-300">
        Attention
      </h2>

      <div className="space-y-3">
        {items.slice(0, 6).map(item => (
          <div
            key={item.id}
            className={`flex gap-4 rounded-md border-l-4 p-3 ${levelStyles[item.level]}`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold uppercase ${levelText[item.level]}`}>
                  {item.level}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>

              <div className="mt-1 text-sm font-medium text-slate-100">
                {item.title}
              </div>

              <div className="mt-1 text-sm text-slate-400">
                {item.description}
              </div>
            </div>

            {item.actionHref && item.actionLabel && (
              <a
                href={item.actionHref}
                className="self-center text-sm font-medium text-slate-200 underline hover:text-white"
              >
                {item.actionLabel}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}