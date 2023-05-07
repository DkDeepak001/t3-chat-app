import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { api } from "y/utils/api";
import { db } from "../../firebase";
import {
  DocumentData,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "@firebase/firestore";
import { useSession } from "next-auth/react";

type selectedFriend = {
  id: string;
  name: string;
  email: string;
  image: string;
};

const Dashboard = () => {
  const [message, setMessage] = useState<string>("");
  const [selectedFriend, setSelectedFriend] = useState<selectedFriend>();
  const [messageId, setMessageId] = useState<string>("");
  const [receivedMessage, setReceivedMessage] = useState<DocumentData[]>();

  const { data: getAllFriend } = api.user.getAllFriend.useQuery();
  const user = useSession();

  const handleSelectFriend = (data: selectedFriend, id: string) => {
    setMessageId(id);
    setSelectedFriend(data);
  };
  useEffect(() => {
    if (!messageId) return;

    const queryMessage = query(
      collection(db, "messages"),
      where("messageId", "==", messageId)
    );
    console.log("queryMessage:", queryMessage);
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      console.log("Received snapshot:", snapshot);
      const data = snapshot.docs.map((doc) => {
        console.log("Received doc:", doc.data());
        return { ...doc.data(), id: doc.id };
      });

      data.sort((a, b) => (a?.createdAt > b?.createdAt ? 1 : -1));

      setReceivedMessage(data);
    });
    return () => unsubscribe();
  }, [selectedFriend]);

  const handleSendMessage = async (): Promise<void> => {
    if (!message) return;
    const docRef = await addDoc(collection(db, "messages"), {
      messageId: getAllFriend[0]?.messageId,
      senderId: user.data?.user.id,
      receiverId: selectedFriend?.id,
      senderName: user.data?.user.name,
      receiverName: selectedFriend?.name,
      message: message,
      createdAt: new Date().toISOString(),
    });
    setMessage("");
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
              selectedFriend?.id === e?.Friend?.id ? "bg-slate-300" : ""
            }`}
            onClick={() => handleSelectFriend(e?.Friend, e.messageId)}
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
        {!messageId ? (
          <h2 className=""> select user to sent message</h2>
        ) : (
          <div>
            <h2 className="ml-5 mt-3">{selectedFriend?.name}</h2>
            <div className="flex w-full flex-col ">
              {receivedMessage?.map((e, index) => (
                <h2
                  key={e?.id}
                  className={`relative mx-10 mt-3
                  w-fit
                  rounded-full
                  ${
                    e.senderId === user?.data?.user?.id
                      ? "self-end bg-blue-400"
                      : "self-start bg-slate-300"
                  }
                px-4 py-2 text-slate-700`}
                >
                  {e.message}
                </h2>
              ))}
            </div>
            {/* footer */}
            <div className="absolute bottom-4 flex w-2/4 flex-row items-center  justify-center ">
              <input
                type="text"
                placeholder="message"
                className="ml-5   w-full rounded-l-2xl border-2 border-black/30 px-2  py-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className=" h-full  rounded-r-2xl bg-slate-500  px-3 py-3 text-white"
                onClick={() => handleSendMessage()}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
