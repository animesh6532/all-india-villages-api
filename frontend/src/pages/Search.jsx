import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { geoApi } from "../api/geoApi";
import EmptyState from "../components/EmptyState.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import LoadingState from "../components/LoadingState.jsx";
import VillageTable from "../components/VillageTable.jsx";

export default function Search() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filters, setFilters] = useState({ q: "", stateId: "", districtId: "", page: 1 });
  const [result, setResult] = useState({ data: [], meta: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    geoApi.states({ limit: 100 }).then((payload) => setStates(payload.data)).catch(() => setStates([]));
  }, []);

  useEffect(() => {
    if (!filters.stateId) {
      setDistricts([]);
      return;
    }
    geoApi
      .districts({ stateId: filters.stateId, limit: 100 })
      .then((payload) => setDistricts(payload.data))
      .catch(() => setDistricts([]));
  }, [filters.stateId]);

  async function runSearch(page = 1) {
    try {
      setLoading(true);
      setError(null);
      const payload = await geoApi.villages({
        q: filters.q || undefined,
        stateId: filters.stateId || undefined,
        districtId: filters.districtId || undefined,
        page,
        limit: 15
      });
      setResult(payload);
      setFilters((current) => ({ ...current, page }));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    runSearch(1);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-brand-700">Search</p>
        <h1 className="mt-1 text-3xl font-bold tracking-normal text-ink">Village Lookup</h1>
      </div>
      <form
        className="panel grid gap-4 p-5 lg:grid-cols-[1fr_220px_220px_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          runSearch(1);
        }}
      >
        <input
          className="input"
          placeholder="Search village name"
          value={filters.q}
          onChange={(event) => setFilters((current) => ({ ...current, q: event.target.value }))}
        />
        <select
          className="input"
          value={filters.stateId}
          onChange={(event) => setFilters((current) => ({ ...current, stateId: event.target.value, districtId: "" }))}
        >
          <option value="">All states</option>
          {states.map((state) => (
            <option value={state.id} key={state.id}>
              {state.name}
            </option>
          ))}
        </select>
        <select
          className="input"
          value={filters.districtId}
          onChange={(event) => setFilters((current) => ({ ...current, districtId: event.target.value }))}
          disabled={!filters.stateId}
        >
          <option value="">All districts</option>
          {districts.map((district) => (
            <option value={district.id} key={district.id}>
              {district.name}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" type="submit">
          <SearchIcon size={17} />
          Search
        </button>
      </form>
      <ErrorBanner message={error} />
      {loading ? <LoadingState label="Searching villages" /> : result.data.length ? <VillageTable villages={result.data} /> : <EmptyState />}
      {result.meta && (
        <div className="flex flex-col items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row">
          <p className="text-sm text-slate-600">
            Page {result.meta.page} of {result.meta.totalPages || 1}
          </p>
          <div className="flex gap-2">
            <button
              className="btn btn-secondary"
              disabled={result.meta.page <= 1}
              onClick={() => runSearch(result.meta.page - 1)}
              type="button"
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              disabled={result.meta.page >= result.meta.totalPages}
              onClick={() => runSearch(result.meta.page + 1)}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
