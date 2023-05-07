import Image from "next/image";
import React from "react";
import { LoaderIcon } from "react-hot-toast";
import { api } from "y/utils/api";

const Request = () => {
  const context = api.useContext();
  const { data: request } = api.user.getRequest.useQuery();

  const { mutateAsync: cancel } = api.user.cancelReq.useMutation({
    onSuccess: async () => {
      await context.user.getRequest.invalidate();
    },
  });

  const { mutateAsync: accept } = api.user.acceptReq.useMutation({
    onSuccess: async () => {
      await context.user.invalidate();
    },
  });

  const handleAcceptReq = async (
    delete_id: string,
    user_id: string
  ): Promise<void> => {
    console.log(delete_id, user_id);
    try {
      await accept({ delete_id, user_id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelReq = async (id: string): Promise<void> => {
    try {
      await cancel({ id });
    } catch (error) {
      console.log(error);
    }
  };

  if (!request)
    return (
      <div className="flex h-screen items-center justify-center bg-black ">
        <LoaderIcon style={{ height: 50, width: 50 }} />
      </div>
    );

  return (
    <div>
      {request?.length === 0 && <p>no request found</p>}
      {request?.map((e) => (
        <div key={e.id} className="ml-5 mt-5 flex flex-row">
          <div>
            <Image
              src={e.From?.image ?? ""}
              width={60}
              height={60}
              alt={`Profile pic of ${e.From?.name ?? "user "}`}
              className="mr-3 rounded-full"
            />
          </div>
          <div className="flex flex-col  justify-center">
            <h2 className="text-base font-semibold text-slate-600">
              {e.From?.name}
            </h2>
            <h4 className="text-sm font-normal text-slate-500">
              {e.From?.email}
            </h4>
          </div>
          <div className="ml-5 flex flex-row items-center gap-2">
            <button
              className="h-8 w-8 rounded-full bg-red-300"
              onClick={() => handleCancelReq(e?.id)}
            >
              x
            </button>
            <button
              className="h-8 w-8 rounded-full bg-green-300"
              onClick={() => handleAcceptReq(e.id, e.From?.id)}
            >
              ✓
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Request;
