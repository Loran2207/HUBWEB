import type { ReactNode } from "react";

/**
 * Full-screen app frame: glass sidebar at left, flat content plane at right
 * (no boxed container around the content), ambient color glows behind.
 */
export function AppShell({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-canvas">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -bottom-48 left-[28%] size-[560px] rounded-full bg-[radial-gradient(circle,rgba(0,255,26,0.10),transparent_65%)] blur-[40px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-28 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(195,77,255,0.09),transparent_65%)] blur-[40px]" />
      <div className="pointer-events-none absolute -top-40 right-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,166,255,0.08),transparent_65%)] blur-[40px]" />

      <div className="relative z-10 flex h-full">
        {sidebar}
        <main className="h-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-14 pb-24 pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}
