import { error } from "console";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

export default function home() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSigin = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <button
        onClick={() => handleSigin()}
        type="button"
        className=" mb-2 mr-2 rounded-lg bg-slate-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <div className="flex flex-row items-center justify-center gap-2">
          {isLoading ? (
            <TailSpin
              height="25"
              width="25"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <Image
              src={"/google.svg"}
              alt="google svg"
              width={25}
              height={25}
            />
          )}
          <h3 className="font-semibold text-black">Sigin with Google</h3>
        </div>
      </button>
    </div>
  );
}
