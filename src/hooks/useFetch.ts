import { useState, useEffect, useCallback } from "react";
import type { FetchState } from "../types";

/**
 * Hook customizado para buscar dados de forma assíncrona.
 * Gerencia estados de loading, data e error automaticamente.
 */
export function useFetch<T>(
  fetchFn: () => Promise<{ data: T }>,
  dependencies: unknown[] = []
): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await fetchFn();
      setState({ data: response.data, loading: false, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro desconhecido ao buscar dados.";
      setState({ data: null, loading: false, error: message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, refetch: execute };
}
