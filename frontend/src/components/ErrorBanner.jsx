import { AlertCircle } from "lucide-react";

export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <AlertCircle className="mt-0.5 shrink-0" size={18} />
      <span>{message}</span>
    </div>
  );
}
