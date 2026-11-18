"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * "My List" stored in the browser (localStorage) until BroFlix has accounts.
 *
 * Pattern adapted from Reely's watchlist hook (github.com/Vette1123/movies-streaming-platform, MIT):
 * useSyncExternalStore keeps every button and page in sync, including across tabs,
 * and renders an empty list on the server so hydration never mismatches.
 */

const STORAGE_KEY = "broflix:my-list";
const CHANGE_EVENT = "broflix:my-list-change";
const EMPTY: string[] = [];

let cachedRaw: string | null = null;
let cachedIds: string[] = EMPTY;

function readIds(): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }

  if (raw === cachedRaw) {
    return cachedIds;
  }

  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedIds = Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : EMPTY;
  } catch {
    cachedIds = EMPTY;
  }
  return cachedIds;
}

function writeIds(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage can be full or blocked (private mode); the list just won't persist.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useMyList() {
  const ids = useSyncExternalStore(subscribe, readIds, () => EMPTY);

  const isInList = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    const current = readIds();
    writeIds(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }, []);

  const clear = useCallback(() => writeIds([]), []);

  return { ids, isInList, toggle, clear };
}
