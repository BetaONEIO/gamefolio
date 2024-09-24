"use client";
import React, { useEffect } from "react";
import Messages from "@/components/Chat/Messages";
import "@/components/Chat/ChatLayout.css";
import Chat from "@/components/Chat/Chat";
// import ChatHeader from "@/components/ChatHeader/ChatHeader";
import Layout from "@/components/CustomLayout/layout";
import ChatHeader from "@/components/ChatHeader/ChatHeader";
import CustomHeader from "@/components/CustomHeader/CustomHeader";

function ChatLayout() {
  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };
  return (
    <Layout children={undefined}>
      {/* Header */}
      {/* <CustomHeader>Messages</CustomHeader>

      <section style={sectionStyle} className="flex w-full bg-[#091619]">
        <div className="flex h-screen flex-grow rounded-lg bg-[#091619] font-poppins shadow-sm bg-navy-800 mt-4">


          <Messages />



          <Chat />
        </div>
      </section> */}
    </Layout>
  );
}

export default ChatLayout;
