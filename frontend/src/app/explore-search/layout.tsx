import Layout from "@/components/CustomLayout/layout";
import ExploreHeader from "@/components/ExploreHeader/ExploreHeader";
import TopBar from "@/components/Topbar/TopBar";
import React from "react";

function layout({ children }: any) {
  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };
  return (
    <Layout>
      <ExploreHeader />
      <TopBar />

      <div
        style={sectionStyle}
        className="flex flex-col bg-[#091619] h-full py-4 overflow-y-scroll"
      >
        {children}
      </div>
    </Layout>
  );
}

export default layout;
