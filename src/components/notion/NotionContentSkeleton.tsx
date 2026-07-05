export function NotionContentSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-2/3 rounded bg-neutral-100" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-neutral-100" />
        <div className="h-4 w-full rounded bg-neutral-100" />
        <div className="h-4 w-4/5 rounded bg-neutral-100" />
      </div>
      <div className="h-48 w-full rounded-xl bg-neutral-100" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-neutral-100" />
        <div className="h-4 w-3/4 rounded bg-neutral-100" />
      </div>
    </div>
  );
}
