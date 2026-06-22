/** Empty Content Plan body shown when the plan ran out: a countdown to the next plan. */
export function NextPlanTimer({
  days = 30,
  hours = 20,
  minutes = 30,
}: {
  days?: number;
  hours?: number;
  minutes?: number;
}) {
  const pad = (v: number) => String(v).padStart(2, "0");
  return (
    <div className="grid place-items-center pb-2 pt-20">
      <div className="text-center">
        <span className="font-ui text-[13px] font-bold uppercase tracking-[0.08em] text-lime">
          Your next plan drops in
        </span>
        <div className="mt-4 font-display text-[clamp(40px,6vw,72px)] font-extrabold italic leading-none tracking-tight">
          <span className="text-irid-h">
            {pad(days)}d : {pad(hours)}h : {pad(minutes)}m
          </span>
        </div>
      </div>
    </div>
  );
}
