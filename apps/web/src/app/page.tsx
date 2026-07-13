import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
          CodePilot
        </p>
        <h1 className="text-5xl font-semibold tracking-tight">
          Competitive programming intelligence platform
        </h1>
        <p className="mt-6 text-lg text-zinc-400">
          Import your profiles, detect weak topics, and get a focused practice plan.
        </p>
        <div className="mt-8">
          <Link
            href="/sign-in"
            className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
          >
            Get started
          </Link>
        </div>
      </div>
    </main>
  );
}