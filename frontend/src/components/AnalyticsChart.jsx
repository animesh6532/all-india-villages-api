import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AnalyticsChart({ data = [] }) {
  return (
    <div className="panel h-80 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-ink">API Traffic</p>
          <p className="text-sm text-slate-500">Daily request volume</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#64748b" />
          <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip />
          <Bar dataKey="calls" fill="#2563eb" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
