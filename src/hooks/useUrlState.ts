/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// Yardımcı fonksiyonlar
function parseUrlValue(value: string, defaultValue: any) {
  if (Array.isArray(defaultValue)) {
    return value.split(",").filter(Boolean);
  }
  if (typeof defaultValue === "boolean") return value === "true";
  if (typeof defaultValue === "number") return Number(value);
  // JSON verilerini parse etmeyi dene
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function serializeValue(value: any): string | null {
  if (value == null) return null;
  if (Array.isArray(value) && value.length === 0) return null;
  if (Array.isArray(value)) return value.join(",");
  // Obje tipindeki verileri JSON string'e çevir
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

function shouldSkipValue(
  value: any,
  defaultValue: any,
  searchParams: URLSearchParams,
  key: string,
  newState: any
): boolean {
  return (
    value === defaultValue &&
    !searchParams.has(key) &&
    newState[key] === undefined
  );
}

export function useUrlState<T extends Record<string, any>>(defaultState: T) {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL'den state'i oku
  const state = useMemo(() => {
    const result = { ...defaultState };

    searchParams.forEach((value, key) => {
      if (!(key in defaultState)) return;

      const defaultValue = defaultState[key as keyof T];

      (result as any)[key] = parseUrlValue(value, defaultValue);
    });

    return result;
  }, [searchParams, defaultState]);

  // State'i URL'e yaz
  const setState = useCallback(
    (newState: Partial<T>) => {
      const nextState = { ...state, ...newState };
      const params = new URLSearchParams();

      Object.entries(nextState).forEach(([key, value]) => {
        if (
          shouldSkipValue(value, defaultState[key], searchParams, key, newState)
        )
          return;

        const serializedValue = serializeValue(value);
        if (serializedValue) {
          params.set(key, serializedValue);
        }
      });

      setSearchParams(params);
    },
    [searchParams, state, defaultState]
  );

  return [state, setState] as const;
}
