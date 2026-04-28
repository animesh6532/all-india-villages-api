import { KeyRound, Save } from "lucide-react";
import { useState } from "react";
import { useApiKey } from "../context/ApiKeyContext.jsx";

export default function CredentialPanel() {
  const { credentials, saveCredentials } = useApiKey();
  const [form, setForm] = useState(credentials);

  function submit(event) {
    event.preventDefault();
    saveCredentials(form);
  }

  return (
    <form onSubmit={submit} className="panel p-5">
      <div className="mb-4 flex items-center gap-2">
        <KeyRound size={19} className="text-brand-600" />
        <h2 className="font-semibold text-ink">API Credentials</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="input"
          value={form.apiKey}
          onChange={(event) => setForm((current) => ({ ...current, apiKey: event.target.value }))}
          aria-label="API key"
        />
        <input
          className="input"
          value={form.apiSecret}
          onChange={(event) => setForm((current) => ({ ...current, apiSecret: event.target.value }))}
          aria-label="API secret"
          type="password"
        />
      </div>
      <button className="btn btn-primary mt-4" type="submit">
        <Save size={17} />
        Save
      </button>
    </form>
  );
}
