
import Image from "next/image";
import React from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const AllMessages = () => {
  const users = [
    {
      id: 1,
      name: "Random James",
      userProfile: "/media/figure/author_6.jpg",
      lastUser: "Kamal Uddin",
      lastUserProfile: "/media/figure/author_3.jpg",
      lastMessage: {
        me: "",
        userMessage: "Hello I&apos;m Reduan jahan and you?",
      },
      time: "3.30 PM",
      messageSendType: "seen",
    },
    {
      id: 2,
      name: "John Doe",
      userProfile: "/media/figure/author_5.jpg",
      lastUser: "Faruk Hossin",
      lastUserProfile: "/media/figure/author_2.jpg",
      lastMessage: {
        me: "Today weather is very nice!",
        userMessage: "",
      },
      time: "1.30 AM",
      messageSendType: "Delivery",
    },
    {
      id: 3,
      name: "Bob Spinkler",
      userProfile: "/media/figure/author_7.jpg",
      lastUser: "Bayzid Hossain",
      lastUserProfile: "/media/figure/author_8.jpg",
      lastMessage: {
        me: "Tomorrow I&apos;m coming",
        userMessage: "",
      },
      time: "4.04 PM",
      messageSendType: "sent",
    },
    {
      id: 4,
      name: "Random James",
      userProfile: "/media/figure/author_9.jpg",
      lastUser: "Kamal Uddin",
      lastUserProfile: "/media/figure/author_1.jpg",
      lastMessage: {
        me: "",
        userMessage: "Hello I&apos;m Reduan jahan and you?",
      },
      time: "3.30 PM",
      messageSendType: "seen",
    },
    {
      id: 5,
      name: "Random James",
      userProfile: "/media/figure/author_4.jpg",
      lastUser: "Kamal Uddin",
      lastUserProfile: "/media/figure/author_3.jpg",
      lastMessage: {
        me: "",
        userMessage: "Hello I&apos;m Reduan jahan and you?",
      },
      time: "3.30 PM",
      messageSendType: "Delivery",
    },
  ];

  return (
    <div className="px-3 py-2">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex justify-start items-start gap-2 py-[6px] border-b-[1px] hover:bg-[#eff4fbc0] hover:rounded-md"
        >
          <Image
            src={user.userProfile}
            alt={user.name}
            width={500}
            height={500}
            className="w-[50px] h-[50px] object-cover rounded-full object-top"
          />
          <div className="w-full">
            <div className="flex justify-between items-start">
              <span className="text-[16px] font-bold ">{user.name}</span>
              <span className="text-[10px] font-normal">{user.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] leading-5">
                {user.lastMessage.me
                  ? user.lastMessage.me.length > 30
                    ? `You: ${user.lastMessage.me.substring(0, 30)}...`
                    : `You: ${user.lastMessage.me}`
                  : user.lastMessage.userMessage.length > 20
                  ? `${user.lastMessage.userMessage.substring(0, 30)}...`
                  : user.lastMessage.userMessage}
              </span>
              {user.messageSendType === "sent" && (
                <IoCheckmarkOutline className="w-3 h-3 text-[#615DFA]" />
              )}
              {user.messageSendType === "Delivery" && (
                <IoCheckmarkDoneOutline className="w-3 h-3 text-[#615DFA]" />
              )}
              {user.messageSendType === "seen" && (
                <Image
                  src={user.lastUserProfile}
                  alt={user.lastUser}
                  width={50}
                  height={50}
                  className="w-[12px] h-[12px] object-cover rounded-full object-top"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllMessages;
