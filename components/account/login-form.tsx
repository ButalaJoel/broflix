"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import type { FormEvent } from "react";

/**
 * Demo sign-in. The profile lives in localStorage only — swap this for a real
 * auth provider (e.g. Auth.js, Clerk, Supabase) when Broflix gets a backend.
 */
const PROFILE_KEY = "broflix:profile";
const PROFILE_EVENT = "broflix:profile-change";

function subscribe(onChange: () => void) {
  window.addEventListener(PROFILE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(PROFILE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readProfile(): string | null {
  try {
    return window.localStorage.getItem(PROFILE_KEY);
  } catch {
    return null;
  }
}

function saveProfile(name: string | null) {
  try {
    if (name) window.localStorage.setItem(PROFILE_KEY, name);
    else window.localStorage.removeItem(PROFILE_KEY);
  } catch {
    // ignore blocked storage
  }
  window.dispatchEvent(new Event(PROFILE_EVENT));
}

export function LoginForm() {
  const profile = useSyncExternalStore(subscribe, readProfile, () => null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const name = String(data.get("name") ?? "").trim();

    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    setError(null);
    saveProfile(name || email.split("@")[0]);
  };

  const inputClass =
    "h-12 w-full rounded-lg border border-white/10 bg-zinc-900 px-4 text-white placeholder:text-zinc-500 focus:border-[#00FF00]/60 focus:outline-none";

  if (profile) {
    return (
      <div className="text-center">
        <p className="text-sm text-zinc-400">Signed in as</p>
        <p className="mt-1 text-2xl font-bold text-white">{profile}</p>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/my-list" className="rounded-full bg-[#00FF00] px-5 py-3 text-sm font-bold text-[#0a0a0a]">
            Go to My List
          </Link>
          <button
            type="button"
            onClick={() => saveProfile(null)}
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {mode === "signup" ? <input name="name" placeholder="Display name" autoComplete="nickname" className={inputClass} /> : null}
      <input name="email" type="email" placeholder="Email" autoComplete="email" required className={inputClass} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        autoComplete={mode === "signup" ? "new-password" : "current-password"}
        required
        className={inputClass}
      />
      {error ? (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      ) : null}
      <button type="submit" className="h-12 w-full rounded-full bg-[#00FF00] text-sm font-bold text-[#0a0a0a] transition-transform hover:scale-[1.01]">
        {mode === "signin" ? "Sign In" : "Create Account"}
      </button>
      <p className="text-center text-sm text-zinc-400">
        {mode === "signin" ? "New to Broflix?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
          }}
          className="font-semibold text-[#00FF00] hover:underline"
        >
          {mode === "signin" ? "Sign up now" : "Sign in"}
        </button>
      </p>
    </form>
  );
}
