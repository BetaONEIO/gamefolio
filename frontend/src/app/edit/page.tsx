"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { SVG } from "@/assets/SVG";
import Layout from "@/components/CustomLayout/layout";
import { dispatch, useSelector } from "@/store";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { updateProfile } from "@/store/slices/authSlice";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "@/services/api";
import Modal from "@/components/Modals/Modal";
import DeleteAccount from "@/components/Modals/DeleteAccount";
import CustomHeader from "@/components/CustomHeader/CustomHeader";

const Edit = () => {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      dateOfBirth: "",
      accountType: "public",
      profilePicture: "",
    },
  });

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  const [modalState, setModalState] = useState({
    isDeleteModalOpen: false,
  });

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const onUpdate = (data: any) => {
    setValue("name", data?.name);
    setValue("username", data?.username);
    setValue("bio", data?.bio);
    setValue("dateOfBirth", data?.dateOfBirth);
    setValue("accountType", data?.accountType);
  };

  const onUpdateAccountType = (value: string) => {
    setValue("accountType", value);
  };

  const onUpdateProfilePicture = (value: string) => {
    setValue("profilePicture", value);
  };
  // Watch the value of the 'accountType' field
  const accountTypeValue = watch("accountType");

  useEffect(() => {
    onUpdate(authState);
  }, [authState]);

  const handleUpdateProfile = (data: any) => {
    const payload = {
      userID: authState._id,
      ...data,
    };

    const successCallback = (response: any) => {
      toastSuccess(response);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };
    dispatch(updateProfile(params));
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `${BASE_URL}/storage/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        onUpdateProfilePicture(response.data.imageURL);
        toastSuccess(response.data.message);
      } catch (error) {
        toastError(error);
      }
    }
  };

  return (
    <Layout>
      {/* Header */}
      <CustomHeader>SETTINGS</CustomHeader>
      <section
        style={sectionStyle}
        className="flex flex-col items-center bg-[#091619] min-h-screen"
      >
        <div className="flex justify-between px-6 py-8 md:h-screen lg:py-0">
          <div className="relative p-6 sm:p-8">
            <div className="mb-4 w-20 h-20 rounded-lg relative">
              <Image
                src={
                  image ? URL.createObjectURL(image) : authState.profilePicture
                }
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
                    className="w-6 h-6 rounded-lg hover:opacity-80 cursor-pointer"
                    width={10}
                    height={10}
                  />
                </label>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleUploadImage}
                />
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4 sm:p-8 md:w-96">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleUpdateProfile)}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block font-bold mb-2 text-sm text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 text-white"
                  placeholder="Name"
                  required
                  {...register("name", {
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
                  className="block mb-2 text-sm font-bold text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 text-white"
                  placeholder="Username"
                  required
                  {...register("username", {
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
                  className="block mb-2 text-sm font-bold text-white"
                >
                  Date of Birth (optional)
                </label>
                <input
                  type="Date"
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white hover:opacity-80 cursor-pointer"
                  placeholder="Date of Birth"
                  {...register("dateOfBirth")}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-white">
                  Bio
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white"
                  placeholder="Lorem ipsum dolor sit amet consectetur. Ante duis tellus tincidunt nibh"
                  {...register("bio", {
                    required: true,
                    min: 10,
                    maxLength: 100,
                  })}
                ></textarea>
              </div>

              <div>
                <p className="mb-2 text-sm font-bold text-gray-50">
                  Account Type
                </p>
                <div className="flex justify-center w-full gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateAccountType("public")}
                    className={
                      accountTypeValue === "public"
                        ? "text-white w-full justify-center bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#162423] border-green-500 border"
                        : "w-full justify-center text-gray-500 items-center outline-none rounded-lg text-sm font-medium px-5 py-2.5 bg-[#162423]"
                    }
                  >
                    Public
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateAccountType("private")}
                    className={
                      accountTypeValue === "private"
                        ? "text-white w-full justify-center bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#162423] border-green-500 border"
                        : "w-full justify-center text-gray-500 items-center outline-none rounded-lg text-sm font-medium px-5 py-2.5 bg-[#162423]"
                    }
                  >
                    Private
                  </button>
                </div>
              </div>

              <button className="w-full font-bold h-12 bg-[#37C535] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
                Update
              </button>
            </form>
            <div className="text-md text-center text-gray-50">
              <p
                className="font-bold text-primary-600 underline hover:opacity-80 cursor-pointer"
                onClick={() => handleModalToggle("isDeleteModalOpen")}
              >
                Deactivate Account
              </p>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </section>

      <Modal
        isOpen={modalState.isDeleteModalOpen}
        handleClose={() => handleModalToggle("isDeleteModalOpen")}
      >
        <DeleteAccount
          handleCloseModal={() => handleModalToggle("isDeleteModalOpen")}
        />
      </Modal>
    </Layout>
  );
};

export default Edit;
