import type { ReactNode } from "react";

/**
 * Full-screen app frame: glass sidebar at left, flat content plane at right
 * (no boxed container around the content), ambient aurora glows behind, the
 * "richness engine" of the dark HUB WEB look (saturated blurred color on black).
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
      <div className="pointer-events-none absolute -top-40 right-[12%] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(72,219,252,0.10),transparent_62%)] blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-44 left-[26%] size-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,255,26,0.09),transparent_64%)] blur-[60px]" />
      <div className="pointer-events-none absolute -right-32 bottom-[-120px] size-[480px] rounded-full bg-[radial-gradient(circle,rgba(195,77,255,0.08),transparent_65%)] blur-[60px]" />

      <div className="relative z-10 flex h-full">
        {sidebar}
        <main className="h-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-14 pb-24 pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}
