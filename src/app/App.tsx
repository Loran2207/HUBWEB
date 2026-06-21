import { useState } from "react";
import { AppShell } from "@/app/AppShell";
import { Sidebar, type NavId } from "@/components/Sidebar";
import { ContentPlanPage } from "@/features/content-plan/ContentPlanPage";

const OTHER_LABELS: Record<Exclude<NavId, "content-plan">, string> = {
  assistant: "AI Assistant",
  apps: "AI Apps Library",
  templates: "Templates",
  academy: "Growth Academy",
  challenges: "Challenges",
};

function OtherScreen({ id }: { id: Exclude<NavId, "content-plan"> }) {
  return (
    <div className="grid min-h-[480px] h-full place-items-center text-center">
      <div className="max-w-[460px]">
        <div className="mb-3 font-display text-[40px] font-extrabold tracking-tight text-fg">
          {OTHER_LABELS[id]}
        </div>
        <p className="font-ui text-base leading-relaxed text-fg-muted">
          This area already exists in SMMHUB. This build focuses on the new{" "}
          <strong className="text-lime">Content Plan</strong> experience, open it
          from the top of the sidebar.
        </p>
      </div>
    </div>
  );
}

export function App() {
  const [active, setActive] = useState<NavId>("content-plan");
  return (
    <AppShell sidebar={<Sidebar active={active} onNavigate={setActive} />}>
      {active === "content-plan" ? (
        <ContentPlanPage />
      ) : (
        <OtherScreen id={active} />
      )}
    </AppShell>
  );
}
