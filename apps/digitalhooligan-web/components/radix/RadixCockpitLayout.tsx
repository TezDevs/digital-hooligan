// apps/digitalhooligan-web/components/radix/RadixCockpitLayout.tsx
export function RadixCockpitLayout(props: {
  header?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 p-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">RadixOS</h1>
        <p className="text-sm opacity-70">CEO cockpit (v1 • single-user • mock persistence)</p>
      </header>

      {props.header ? <div className="space-y-4">{props.header}</div> : null}

      <main className="space-y-4">{props.children}</main>
    </div>
  );
}
