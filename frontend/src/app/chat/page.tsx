"use client";
import React, { useEffect } from "react";
import Messages from "@/components/Chat/Messages";
import "@/components/Chat/ChatLayout.css";
import Chat from "@/components/Chat/Chat";
// import ChatHeader from "@/components/ChatHeader/ChatHeader";
import Layout from "@/components/CustomLayout/layout";
import ChatHeader from "@/components/ChatHeader/ChatHeader";

function ChatLayout() {
  return (
    <Layout>
      {/* Header */}
      <ChatHeader />
      <div className="flex h-screen rounded-lg bg-[#091619] font-poppins shadow-sm bg-navy-800">
        {/* First column  */}
        <Messages />

        {/* Second Column */}
        <Chat />
      </div>
    </Layout>
  );
}

export default ChatLayout;
