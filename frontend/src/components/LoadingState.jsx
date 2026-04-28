export default function LoadingState({ label = "Loading data" }) {
  return (
    <div className="panel flex min-h-40 items-center justify-center p-8">
      <div className="text-center">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600" />
        <p className="mt-3 text-sm font-medium text-slate-600">{label}</p>
      </div>
    </div>
  );
}
