"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Layout from "@/components/CustomLayout/layout";
import { leagueGothic } from "@/font/font";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useSelector } from "@/store";
import { useEffect } from "react";

const Edit = () => {
  const authState = useSelector((state: any) => state.auth.userData) || [];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      Username: "",
      Bio: "",
    },
  });
  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  const onUpdate = (data: any) => {
    setValue("Name", data?.name);
    setValue("Username", data?.username);
    setValue("Bio", data?.bio);
  };

  useEffect(() => {
    onUpdate(authState);
  }, [authState]);

  console.log("rppage pro: ", register("Name"));

  const onSubmit = (data: any) => console.log(data);

  return (
    <Layout>
      <div className="flex items-center py-6 bg-[#091619]">
        <div className="flex justify-between items-center w-full mx-4">
          <div className="flex gap-4 items-center">
            <h1 className={`${leagueGothic.className} text-2xl sm:text-4xl`}>
              EDIT PROFILE
            </h1>
          </div>
        </div>
      </div>

      <section
        style={sectionStyle}
        className="flex flex-col items-center bg-gray-50 dark:bg-[#091619] min-h-screen"
      >
        <div className="flex justify-between px-6 py-8 md:h-screen lg:py-0">
          <div className="relative p-6 sm:p-8">
            <div className="mb-4 w-20 h-20 rounded-lg relative">
              <Image
                src={authState.profilePicture}
                alt="Profile Picture"
                className="w-full h-full rounded-lg"
                width={10}
                height={10}
                sizes="100vw"
              />
              <div className="absolute -bottom-2 -right-2 cursor-pointer">
                <label htmlFor="dropzone-file">
                  <Image
                    src={SVG.Cameraupload}
                    alt="Cameraupload"
                    className="w-6 h-6 rounded-lg"
                    width={10}
                    height={10}
                  />
                </label>
                <input id="dropzone-file" type="file" className="hidden" />
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4 sm:p-8 md:w-96">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block font-bold mb-2 text-sm text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 dark:text-white"
                  placeholder="Name"
                  required
                  {...register("Name", {
                    required: true,
                    max: 12,
                    min: 4,
                    maxLength: 12,
                  })}
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 dark:text-white"
                  placeholder="Username"
                  required
                  {...register("Username", {
                    required: true,
                    max: 16,
                    min: 4,
                    maxLength: 16,
                  })}
                />
              </div>

              <div>
                <label
                  htmlFor="Date of Birth"
                  className="block mb-2 text-sm font-bold  text-gray-900 dark:text-white"
                >
                  Date of Birth (optional)
                </label>
                <input
                  type="Date"
                  name="Date"
                  id="Date"
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-2.5 dark:text-white"
                  placeholder="Date of Birth"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                  Bio
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-2.5 dark:text-white"
                  placeholder="Lorem ipsum dolor sit amet consectetur. Ante duis tellus tincidunt nibh"
                  {...register("Bio", {
                    required: true,
                    min: 10,
                    maxLength: 100,
                  })}
                  // {...register("AccountType", { required: true })}
                ></textarea>
              </div>

              <div>
                <p className="mb-2 text-sm font-bold ">Account Type</p>
                <div className="flex justify-center w-full gap-2">
                  <button className="text-white w-full justify-center bg-primary-700  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#162423] dark:border-green-500 border border-gray-200">
                    Public
                  </button>
                  <button className="w-full justify-center text-gray-500 items-center outline-none rounded-lg text-sm font-medium px-5 py-2.5 bg-[#162423]">
                    Private
                  </button>
                </div>
              </div>

              <button className="w-full font-bold h-12 bg-[#37C535] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
                Update
              </button>
              <p className="text-md text-center text-gray-50 dark:text-gray-50">
                <a
                  href="/login"
                  className="font-bold text-primary-600 underline "
                >
                  Deactivate Account
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Edit;
