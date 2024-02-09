import CustomHeader from "@/components/CustomHeader/CustomHeader";
import Layout from "@/components/CustomLayout/layout";
import TopBar from "@/components/Topbar/TopBar";

function layout({ children }: any) {
  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };
  return (
    <Layout>
      <CustomHeader>EXPLORE</CustomHeader>

      <div
        style={sectionStyle}
        className="flex flex-col bg-[#091619] h-full py-4 overflow-y-scroll"
      >
        <TopBar />
        {children}
      </div>
    </Layout>
  );
}

export default layout;
