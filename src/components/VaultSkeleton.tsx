export const VaultSkeleton = () => (
  <div className="flex flex-col h-full justify-center animate-pulse">
    <div className="h-6 bg-slate-200 rounded mb-[25px] w-48" />
    <div className="flex flex-col gap-[10px] mb-[50px]">
      <div className="flex flex-col gap-1">
        <div className="h-4 bg-slate-200 rounded w-24" />
        <div className="h-5 bg-slate-200 rounded w-24" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-4 bg-slate-200 rounded w-24" />
        <div className="h-5 bg-slate-200 rounded w-24" />
      </div>
    </div>
    <div className="h-8 bg-slate-200 rounded" />
  </div>
);
