export function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(Number(value || 0));
}

export function endpointUrl(path) {
  const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  return `${base}${path}`;
}
