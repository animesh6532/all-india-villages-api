import { SearchX } from "lucide-react";

export default function EmptyState({ title = "No results found", description = "Try a different search term." }) {
  return (
    <div className="panel flex min-h-40 flex-col items-center justify-center p-8 text-center">
      <SearchX className="text-slate-400" size={32} />
      <p className="mt-3 font-semibold text-ink">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}
