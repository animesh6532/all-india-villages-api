import { BarChart3, Building2, Map, MapPin, Server } from "lucide-react";
import AnalyticsChart from "../components/AnalyticsChart.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import LoadingState from "../components/LoadingState.jsx";
import StatCard from "../components/StatCard.jsx";
import { geoApi } from "../api/geoApi";
import { useAsync } from "../hooks/useAsync";

export default function Dashboard() {
  const { data, loading, error } = useAsync(() => geoApi.analytics(), []);

  if (loading) return <LoadingState label="Loading dashboard" />;

  const totals = data?.data?.totals || {};
  const dailyUsage = data?.data?.dailyUsage || [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-brand-700">Dashboard</p>
        <h1 className="mt-1 text-3xl font-bold tracking-normal text-ink">Geography API Overview</h1>
      </div>
      <ErrorBanner message={error} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total States" value={totals.states} icon={Map} />
        <StatCard title="Total Districts" value={totals.districts} icon={Building2} accent="bg-emerald-50 text-emerald-700" />
        <StatCard title="Total Villages" value={totals.villages} icon={MapPin} accent="bg-amber-50 text-amber-700" />
        <StatCard title="API Calls" value={totals.apiCalls} icon={Server} accent="bg-slate-100 text-slate-700" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <AnalyticsChart data={dailyUsage} />
        <div className="panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="text-brand-600" size={20} />
            <h2 className="font-semibold text-ink">Top Search Requests</h2>
          </div>
          <div className="space-y-3">
            {(data?.data?.topSearches || []).map((item) => (
              <div key={item.path} className="rounded-md border border-slate-200 p-3">
                <p className="truncate text-sm font-medium text-ink">{item.path}</p>
                <p className="mt-1 text-xs text-slate-500">{item.count} calls</p>
              </div>
            ))}
            {!data?.data?.topSearches?.length && <p className="text-sm text-slate-500">Search activity will appear here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
