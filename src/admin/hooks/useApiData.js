import { useState, useEffect } from "react";

export function useApiData(apiFn, storageFn) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await apiFn();
        if (!cancelled && Array.isArray(result) && result.length > 0) {
          setData(result);
          setError(null);
          setLoading(false);
          return;
        }
      } catch (err) {
        if (!cancelled) setError(err);
      }
      if (!cancelled) setData(storageFn());
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [apiFn, storageFn]);

  return { data, setData, loading, error };
}
