import { formatNumber } from "../utils/formatters";

export default function VillageTable({ villages = [] }) {
  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Village</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Subdistrict</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">District</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">State</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Population</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {villages.map((village) => {
              const subdistrict = village.subdistrict || {};
              const district = subdistrict.district || {};
              const state = district.state || {};
              return (
                <tr key={village.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-ink">{village.name}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{subdistrict.name || "-"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{district.name || "-"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{state.name || "-"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                    {village.population ? formatNumber(village.population) : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
