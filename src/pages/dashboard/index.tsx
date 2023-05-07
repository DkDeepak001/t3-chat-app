import Image from "next/image";
import React, { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { api } from "y/utils/api";
const Dashboard = () => {
  const { data: getAllFriend } = api.user.getAllFriend.useQuery();

  const [selectedFriend, setSelectedFriend] = useState<string>("");

  const handleSelectFriend = (id: string) => {
    setSelectedFriend(id);
  };

  if (!getAllFriend)
    return (
      <div className="flex h-screen items-center justify-center bg-black ">
        <LoaderIcon style={{ height: 50, width: 50 }} />
      </div>
    );

  return (
    <div className="flex h-screen w-screen flex-row">
      <div className="w-1/5 border-r-[1px] border-black/30">
        {getAllFriend?.map((e) => (
          <div
            key={e.Friend?.id}
            className={`mx-2 mt-5 flex flex-row rounded-lg py-3 pl-5 ${
              selectedFriend === e?.Friend?.id ? "bg-slate-300" : ""
            }`}
            onClick={() => handleSelectFriend(e?.Friend?.id ?? "")}
          >
            <div>
              <Image
                src={e.Friend?.image ?? ""}
                width={60}
                height={60}
                alt={`Profile pic of ${e.Friend?.name ?? "user "}`}
                className="mr-3 rounded-full"
              />
            </div>
            <div className="flex flex-col  justify-center">
              <h2 className="text-base font-semibold text-slate-600">
                {e.Friend?.name}
              </h2>
              <h4 className="text-sm font-normal text-slate-500">
                {e.Friend?.email}
              </h4>
            </div>
          </div>
        ))}
      </div>
      <div className="w-4/5 ">
        <div className="absolute bottom-4 flex w-2/4 flex-row items-center  justify-center ">
          <input
            type="text"
            placeholder="message"
            className="ml-5   w-full rounded-l-2xl border-2 border-black/30 px-2  py-3"
          />
          <button className=" h-full  rounded-r-2xl bg-slate-500  px-3 py-3 text-white">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
