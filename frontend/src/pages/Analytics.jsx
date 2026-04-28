import { Activity, Clock, Database, ShieldCheck } from "lucide-react";
import AnalyticsChart from "../components/AnalyticsChart.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import LoadingState from "../components/LoadingState.jsx";
import StatCard from "../components/StatCard.jsx";
import { geoApi } from "../api/geoApi";
import { useAsync } from "../hooks/useAsync";

export default function Analytics() {
  const { data, loading, error } = useAsync(() => geoApi.analytics(), []);

  if (loading) return <LoadingState label="Loading analytics" />;

  const totals = data?.data?.totals || {};

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-brand-700">Analytics</p>
        <h1 className="mt-1 text-3xl font-bold tracking-normal text-ink">Usage and Dataset Health</h1>
      </div>
      <ErrorBanner message={error} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Indexed Villages" value={totals.villages} icon={Database} />
        <StatCard title="Logged Requests" value={totals.apiCalls} icon={Activity} accent="bg-emerald-50 text-emerald-700" />
        <StatCard title="Active Auth Layer" value={1} icon={ShieldCheck} accent="bg-amber-50 text-amber-700" />
        <StatCard title="Monitoring Window" value={14} icon={Clock} accent="bg-slate-100 text-slate-700" />
      </div>
      <AnalyticsChart data={data?.data?.dailyUsage || []} />
    </div>
  );
}
