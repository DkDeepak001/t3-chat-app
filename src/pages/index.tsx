import { signIn, signOut, useSession } from "next-auth/react";

export default function home() {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-400">
      <button
        onClick={(): void => signIn("google")}
        type="button"
        className="mb-2 mr-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        Sigin with Google
      </button>
    </div>
  );
}
