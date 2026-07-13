import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-zinc-500">
          CodePilot
        </p>
        <h1 className="text-3xl font-semibold">Sign in to continue</h1>
        <p className="mt-3 text-sm text-zinc-400">
          Continue with GitHub to access your dashboard.
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
          className="mt-8"
        >
          <button
            type="submit"
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-black"
          >
            Continue with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}