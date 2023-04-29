import React, { useState } from "react";
import { api } from "y/utils/api";
import { useRouter } from "next/navigation";

const Add = () => {
  const [email, setEmail] = useState<string>("");
  const { mutateAsync } = api.user.addFriend.useMutation();
  const router = useRouter();
  //handleSubmmit
  const handleSubmit = async (): Promise<void> => {
    try {
      await mutateAsync({ email });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
    }
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <h2 className="text-3xl font-bold text-slate-600">
        {" "}
        Add Friend using mail id
      </h2>
      <div className="flex flex-row items-center justify-center gap-2">
        <input
          className="rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={() => handleSubmit()}
          className="mb-2 mr-2 rounded-lg bg-slate-400 px-5 py-2.5 text-center text-sm font-medium text-white disabled:cursor-default disabled:hover:bg-black"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Add;
