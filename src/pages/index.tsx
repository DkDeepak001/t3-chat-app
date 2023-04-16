import { signIn, signOut, useSession } from "next-auth/react";

export default function home() {
  const { data: session } = useSession();

  const handleGooleLogin = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {!session ? <h2>login</h2> : <h2>sigin in as {session?.user.name}</h2>}
      <h2></h2>
      <button onClick={!session ? handleGooleLogin : (): void => signOut()}>
        {!session ? `sigin` : `sigin out`}
      </button>
    </div>
  );
}
