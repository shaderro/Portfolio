import { cn } from "@/lib/utils";
import { LtIcon } from "./LtIcon";

export function ArticleCard({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        "flex w-full max-w-[314px] flex-col gap-2 rounded-[var(--lt-radius-card)] border border-[var(--lt-border-default)] bg-[var(--lt-surface-card)] p-4 shadow-[0_1.5px_1.5px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.07)]",
        className,
      )}
    >
      <h3 className="text-sm font-semibold leading-6 text-[var(--lt-text-primary)]">
        Die Berliner Mauer: Geschichte
      </h3>
      <div className="flex items-center gap-2">
        <span className="rounded-[var(--lt-radius-badge)] bg-[var(--lt-bg-warning-subtle)] px-2.5 py-[3px] text-[10px] font-bold tracking-[1px] text-[var(--lt-text-warning)]">
          Intermediate
        </span>
        <p className="text-xs leading-[18px] text-[var(--lt-text-muted)]">
          259 words · 3 notes
        </p>
      </div>
      <p className="text-[13px] leading-5 text-[var(--lt-text-secondary)]">
        Die Berliner Mauer war mehr als 28 Jahre lang das Symbol des Kalten
        Krieges und trennte Ost- und Westberlin.
      </p>
      <p className="text-xs font-semibold leading-[18px] text-[var(--lt-text-brand-hover)]">
        Read →
      </p>
    </article>
  );
}

export function WordCard({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        "flex w-full max-w-[314px] flex-col gap-1.5 rounded-[var(--lt-radius-card)] bg-[var(--lt-surface-card)] p-3.5 shadow-[0_1.5px_1.5px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.07)]",
        className,
      )}
    >
      <h3 className="text-sm font-semibold leading-6 text-[var(--lt-text-primary)]">
        daran
      </h3>
      <p className="line-clamp-2 text-xs leading-[18px] text-[var(--lt-text-tertiary)]">
        对此，对此事（指代前文提到的某件事或想法）
      </p>
      <div className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-[3px] bg-[var(--lt-border-strong)]" />
        <p className="text-[11px] leading-4 text-[var(--lt-text-muted)]">
          Not mastered
        </p>
      </div>
    </article>
  );
}

export function InlineNote({
  title,
  body,
  className,
}: {
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex w-full flex-col gap-1.5 rounded-[var(--lt-radius-card)] bg-[var(--lt-surface-card)] p-2 shadow-[0_1.5px_1.5px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.07)]",
        className,
      )}
    >
      <p className="text-sm font-semibold leading-6 text-[var(--lt-brand-500)]">
        {title}
      </p>
      <p className="line-clamp-2 text-xs leading-[18px] text-[var(--lt-text-tertiary)]">
        {body}
      </p>
    </article>
  );
}

export function TopNav({
  className,
  active,
}: {
  className?: string;
  active?: "reading" | "insights" | "vocabulary";
}) {
  const items = [
    { id: "reading" as const, label: "Reading" },
    { id: "insights" as const, label: "Insights" },
    { id: "vocabulary" as const, label: "Vocabulary" },
  ];

  return (
    <nav
      className={cn(
        "flex h-[52px] w-full items-center border-b border-[var(--lt-border-default)] bg-[var(--lt-surface-nav)] px-6",
        className,
      )}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="flex size-[25px] items-center justify-center overflow-hidden rounded-[13px]">
          <LtIcon name="logo" alt="" />
        </span>
        <p className="text-sm font-semibold leading-6 text-[var(--lt-text-primary)]">
          LinkText
        </p>
      </div>
      <div className="px-3">
        <div className="h-[18px] w-px bg-[var(--lt-border-default)]" />
      </div>
      <div className="flex items-center">
        {items.map((item) => (
          <span
            key={item.id}
            className={cn(
              "relative px-3 py-4 text-[13px] leading-5",
              active === item.id
                ? "font-semibold text-[var(--lt-text-primary)]"
                : "text-[var(--lt-text-tertiary)]",
            )}
          >
            {item.label}
            {active === item.id ? (
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-[1px] bg-[var(--lt-bg-brand)]" />
            ) : null}
          </span>
        ))}
      </div>
      <div className="min-w-px flex-1" />
      <div className="flex items-center gap-3">
        <p className="text-xs font-medium leading-[18px] text-[var(--lt-text-secondary)]">
          German ▾
        </p>
        <p className="text-xs leading-[18px] text-[var(--lt-text-muted)]">
          1087 credits
        </p>
        <div className="flex items-center gap-2">
          <span className="flex size-[26px] items-center justify-center">
            <LtIcon name="avatar" alt="" />
          </span>
          <p className="text-xs font-medium text-[var(--lt-text-secondary)]">
            Account
          </p>
        </div>
      </div>
    </nav>
  );
}

export function TextInput({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[42px] w-full max-w-[260px] items-center rounded-[var(--lt-radius-input)] border border-[var(--lt-border-default)] bg-[var(--lt-bg-primary)] px-3.5 py-2.5",
        className,
      )}
    >
      <p className="text-[13px] leading-5 text-[var(--lt-text-muted)]">
        Placeholder text...
      </p>
    </div>
  );
}

export function FilterSelect({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-[130px] flex-col gap-1", className)}>
      <p className="text-xs leading-[18px] text-[var(--lt-text-muted)]">Label</p>
      <div className="flex h-[35px] items-center overflow-hidden rounded-[var(--lt-radius-input)] border border-[var(--lt-border-default)] bg-[var(--lt-surface-card)] px-3 py-2">
        <p className="text-[13px] leading-5 text-[var(--lt-text-primary)]">
          All
        </p>
        <span className="min-w-px flex-1" />
        <span className="text-[11px] leading-none text-[var(--lt-text-muted)]">
          ▾
        </span>
      </div>
    </div>
  );
}

export function MetadataRow({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "text-xs leading-[18px] text-[var(--lt-text-muted)]",
        className,
      )}
    >
      259 words · 3 notes
    </p>
  );
}

export function NavButton({
  className,
  label = "Previous",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-[24px] border border-[var(--lt-neutral-200)] bg-[var(--lt-neutral-50)]",
        className,
      )}
    >
      <span className="flex size-5 items-center justify-center">
        <LtIcon name="chevronLeft" />
      </span>
    </button>
  );
}
