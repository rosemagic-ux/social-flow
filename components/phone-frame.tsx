import { cn } from "@/lib/utils";

export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate w-[min(100%,22rem)] shrink-0 overflow-hidden rounded-[2.4rem] bg-ink shadow-[0_30px_80px_-24px_rgba(66,38,48,0.45)] ring-1 ring-ink/80",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] ring-8 ring-ink" />
      <div className="relative aspect-[9/19.4] overflow-hidden rounded-[2.05rem] bg-ink">
        {children}
      </div>
    </div>
  );
}

export function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div
      className={cn(
        "relative z-30 flex h-11 items-end justify-between px-7 pb-1.5 text-[11px] font-semibold tracking-tight",
        light ? "text-zinc-900" : "text-white"
      )}
    >
      <span>9:41</span>
      <div className="absolute top-2 left-1/2 h-5 w-[6.5rem] -translate-x-1/2 rounded-full bg-black" />
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-3.5 rounded-[1px] ring-1 ring-current">
          <span
            className={cn(
              "ml-auto block h-full w-2/3",
              light ? "bg-zinc-900" : "bg-white"
            )}
          />
        </span>
      </div>
    </div>
  );
}
