"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  uploadProfileImage,
} from "@/services/user.service";

export default function SettingsPage() {
  const [name, setName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [profileImage, setProfileImage] =
  useState("/avatar.png");

const [image, setImage] =
  useState<File | null>(null);

  useEffect(() => {
    const loadProfile =
      async () => {
        try {
          const response =
            await getProfile();

          if (!response.data) return;

          setName(
            response.data.name || ""
          );

          setUsername(
            response.data.username || ""
          );

          setEmail(
            response.data.email || ""
          );

          if (
  response.data.profileImage
) {
  setProfileImage(
    `${process.env.NEXT_PUBLIC_API_URL}${response.data.profileImage}`
  );
}

        } catch (error) {
          console.error(error);
        }
      };

    loadProfile();
  }, []);

  const handleProfile =
    async () => {
      try {
        await updateProfile({
          name,
          username,
          email,
        });

        alert(
          "Profile updated successfully"
        );
      } catch (error) {
        console.error(error);
      }
    };

  const handlePassword =
    async () => {
      try {
        await changePassword({
          currentPassword,
          newPassword,
        });

        alert(
          "Password updated successfully"
        );

        setCurrentPassword("");
        setNewPassword("");
      } catch (error) {
        console.error(error);
      }
    };

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    window.location.href = "/";
  };

  const handleDelete =
    async () => {
      const confirmDelete =
        window.confirm(
          "Delete account permanently?"
        );

      if (!confirmDelete) return;

      try {
        await deleteAccount();

        localStorage.removeItem(
          "token"
        );

        window.location.href = "/";
      } catch (error) {
        console.error(error);
      }
    };

    const handleImageUpload =
  async () => {
    if (!image) {
      alert(
        "Please select an image"
      );
      return;
    }

    try {
      const formData =
        new FormData();

      formData.append(
        "image",
        image
      );

      const response =
        await uploadProfileImage(
          formData
        );

      setProfileImage(
        `${process.env.NEXT_PUBLIC_API_URL}${response.data.profileImage}`
      );

      alert(
        "Profile image updated successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to upload image"
      );
    }
  };

  return (
   <main
  className="
    max-w-6xl
    mx-auto
    px-4
    md:px-0
    pb-20
  "
>

      <div
  className="
    bg-white
    rounded-[32px]
    border
    shadow-sm
    p-5
    md:p-8
  "
>

        <h1
  className="
    text-2xl
    md:text-3xl
    font-bold
    mb-8
  "
>
          My Profile
        </h1>

        {/* Profile Section */}

        <div className="border-b pb-8">

          <div
  className="
    flex
    flex-col
    sm:flex-row
    items-center
    gap-5
  "
>

  <Image
    src={profileImage}
    alt="Profile"
    width={80}
    height={80}
    className="
      rounded-full
      border
      object-cover
      h-20
      w-20
    "
  />

  <div className="flex flex-col gap-3">

    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setImage(
          e.target.files?.[0] ||
            null
        )
      }
      className="text-sm"
    />

    <div
  className="
    flex
    flex-col
    sm:flex-row
    gap-3
    w-full
  "
>

      <button
        onClick={
          handleImageUpload
        }
        className="
  bg-black
  text-white
  px-4
  py-2
  rounded-xl
  w-full
  sm:w-auto
"
      >
        Upload Image
      </button>

      <button
        onClick={() =>
          setProfileImage(
            "/avatar.png"
          )
        }
        className="
  border
  px-4
  py-2
  rounded-xl
  w-full
  sm:w-auto
"
      >
        Remove Image
      </button>

    </div>

  </div>

</div>

          <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-5
    mt-8
  "
>
  </div><div className="grid md:grid-cols-2 gap-5 mt-8">

            <div>

              <label className="text-sm text-gray-500">
                Name
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2
                  border
                  rounded-xl
                  p-3
                "
              />

            </div>

            <div>

              <label className="text-sm text-gray-500">
                Username
              </label>

              <input
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2
                  border
                  rounded-xl
                  p-3
                "
              />

            </div>

          </div>

          <div className="mt-5">

            <label className="text-sm text-gray-500">
              Email
            </label>

            <input
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                w-full
                mt-2
                border
                rounded-xl
                p-3
              "
            />

          </div>

          <button
            onClick={
              handleProfile
            }
            className="
  mt-6
  bg-green-500
  text-white
  px-6
  py-3
  rounded-xl
  w-full
  md:w-auto
"
          >
            Save Profile
          </button>

        </div>

        {/* Password */}

        <div className="border-b py-8">

          <h2 className="text-xl font-semibold mb-5">
            Account Security
          </h2>

          <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-5
  "
>

            <input
              type="password"
              value={
                currentPassword
              }
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              placeholder="Current Password"
              className="
                border
                rounded-xl
                p-3
              "
            />

            <input
              type="password"
              value={
                newPassword
              }
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder="New Password"
              className="
                border
                rounded-xl
                p-3
              "
            />

          </div>

          <button
            onClick={
              handlePassword
            }
            className="
  mt-5
  bg-black
  text-white
  px-6
  py-3
  rounded-xl
  w-full
  md:w-auto
"
          >
            Change Password
          </button>

        </div>

        {/* Support */}

        <div className="pt-8">

          <h2 className="text-xl font-semibold mb-5">
            Support Access
          </h2>

          <div
  className="
    flex
    flex-col
    sm:flex-row
    gap-4
  "
>

            <button
              onClick={
                handleLogout
              }
              className="
  border
  px-6
  py-3
  rounded-xl
  w-full
  sm:w-auto
"
            >
              Logout
            </button>

            <button
              onClick={
                handleDelete
              }
              className="
  bg-red-500
  text-white
  px-6
  py-3
  rounded-xl
  w-full
  sm:w-auto
"
            >
              Delete Account
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}