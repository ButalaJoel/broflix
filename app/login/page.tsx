import type { Metadata } from "next";
import { LoginForm } from "@/components/account/login-form";

export const metadata: Metadata = {
  title: "Sign In · Broflix",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111111] p-8 shadow-2xl shadow-black/50">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#00FF00]">Broflix</p>
        <h1 className="mb-8 mt-2 text-3xl font-black text-white">Welcome back, bro.</h1>
        <LoginForm />
      </div>
    </main>
  );
}
