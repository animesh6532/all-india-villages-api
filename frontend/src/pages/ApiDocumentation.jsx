import { Copy, KeyRound } from "lucide-react";
import { useState } from "react";
import { geoApi } from "../api/geoApi";
import ErrorBanner from "../components/ErrorBanner.jsx";
import { useApiKey } from "../context/ApiKeyContext.jsx";
import { endpointUrl } from "../utils/formatters";

const endpoints = [
  "GET /api/states",
  "GET /api/states/:id",
  "GET /api/districts?stateId=1",
  "GET /api/subdistricts?districtId=1",
  "GET /api/villages?q=wagholi&stateId=1",
  "GET /api/search?village=wagholi",
  "GET /api/analytics/overview",
  "POST /api/auth/generate-key"
];

export default function ApiDocumentation() {
  const { saveCredentials } = useApiKey();
  const [form, setForm] = useState({ name: "Demo Client", email: "demo@example.com" });
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState(null);

  async function generate(event) {
    event.preventDefault();
    try {
      setError(null);
      const payload = await geoApi.generateKey(form);
      const nextCredentials = {
        apiKey: payload.data.client.apiKey,
        apiSecret: payload.data.apiSecret
      };
      setGenerated(nextCredentials);
      saveCredentials(nextCredentials);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-brand-700">API Documentation</p>
        <h1 className="mt-1 text-3xl font-bold tracking-normal text-ink">Developer Reference</h1>
      </div>
      <ErrorBanner message={error} />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="panel p-5">
          <h2 className="font-semibold text-ink">Endpoints</h2>
          <div className="mt-4 divide-y divide-slate-100 rounded-md border border-slate-200">
            {endpoints.map((endpoint) => (
              <div key={endpoint} className="flex items-center justify-between gap-3 p-3">
                <code className="text-sm text-slate-700">{endpoint}</code>
                <Copy size={16} className="text-slate-400" />
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-md bg-slate-950 p-4 text-sm text-slate-100">
            <pre className="overflow-x-auto">
{`curl "${endpointUrl("/villages?q=wagholi&limit=10")}" \\
  -H "x-api-key: demo_key_123456" \\
  -H "x-api-secret: demo_secret_123456"`}
            </pre>
          </div>
        </section>
        <form onSubmit={generate} className="panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <KeyRound className="text-brand-600" size={20} />
            <h2 className="font-semibold text-ink">Generate API Key</h2>
          </div>
          <div className="space-y-3">
            <input
              className="input"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Client name"
            />
            <input
              className="input"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="Client email"
              type="email"
            />
            <button className="btn btn-primary w-full" type="submit">
              Generate
            </button>
          </div>
          {generated && (
            <div className="mt-4 space-y-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
              <p className="font-semibold">Credentials saved</p>
              <p className="break-all">Key: {generated.apiKey}</p>
              <p className="break-all">Secret: {generated.apiSecret}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
