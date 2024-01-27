import { IMAGES } from "@/assets/images";
import { ReactNode } from "react";

const CustomBackground = ({children}: { children: ReactNode }) => {
  const backgroundImage = `url(${IMAGES.bgImage})`;

  return (
    <section
      style={{
        background: `linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.9) 60%), ${backgroundImage}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60 min-h-screen flex flex-col justify-center"
    >
      {children}
    </section>
  );
};

export default CustomBackground;
