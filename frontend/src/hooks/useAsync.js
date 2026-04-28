import { useCallback, useEffect, useState } from "react";

export function useAsync(callback, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setData(await callback());
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    run();
  }, [run]);

  return { data, loading, error, refetch: run };
}
