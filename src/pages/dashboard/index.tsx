import Image from "next/image";
import React from "react";
import { api } from "y/utils/api";
const Dashboard = () => {
  const { data: getAllFriend } = api.user.getAllFriend.useQuery();
  console.log(getAllFriend);
  return (
    <div>
      {" "}
      {getAllFriend?.map((e) => (
        <div key={e.Friend?.id} className="ml-5 mt-5 flex flex-row">
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
  );
};

export default Dashboard;
