"use client";
import { SVG } from "@/assets/SVG";
import CustomHeader from "@/components/CustomHeader/CustomHeader";
import Layout from "@/components/CustomLayout/layout";
import DeleteAccount from "@/components/Modals/DeleteAccount";
import Modal from "@/components/Modals/Modal";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { BASE_URL } from "@/services/api";
import { dispatch, useSelector } from "@/store";
import { updateProfile } from "@/store/slices/authSlice";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import Setting from "../page";

const EditProfile = () => {
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
    <Setting>
      {/* Header */}

      <div className="flex justify-start px-6 py-8 md:h-screen lg:py-0">
        <div className="flex relative p-6 sm:p-8">
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

      <Modal
        isOpen={modalState.isDeleteModalOpen}
        handleClose={() => handleModalToggle("isDeleteModalOpen")}
      >
        <DeleteAccount
          handleCloseModal={() => handleModalToggle("isDeleteModalOpen")}
        />
      </Modal>
    </Setting>
  );
};

export default EditProfile;
