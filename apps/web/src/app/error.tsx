"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="mt-3 text-sm text-zinc-500">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
        >
          Try again
        </button>
      </div>
    </main>
  );
}