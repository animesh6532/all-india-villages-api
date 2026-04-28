import { formatNumber } from "../utils/formatters";

export default function StatCard({ title, value, icon: Icon, accent = "bg-brand-50 text-brand-700" }) {
  return (
    <div className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-normal text-ink">{formatNumber(value)}</p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-md ${accent}`}>
          <Icon size={21} />
        </span>
      </div>
    </div>
  );
}
