"use client";
import React from "react";
import Messages from "./Messages";
import "./ChatLayout.css";
import Chat from "@/app/chat/Chat";
import ChatHeader from "@/components/ChatHeader/ChatHeader";
import Layout from "@/components/CustomLayout/layout";

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
