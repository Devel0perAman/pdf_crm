"use client";

import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  loginUser,
  registerUser,
} from "../../services/auth.service";

export default function AuthCard() {
  const router = useRouter();

  const [isLogin, setIsLogin] =
    useState(false);

  const [name, setName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister =
    async () => {
      try {
        if (
          !name.trim() ||
          !username.trim() ||
          !email.trim() ||
          !password.trim()
        ) {
          alert(
            "Please fill all fields"
          );
          return;
        }

        setLoading(true);

        await registerUser({
          name,
          username,
          email,
          password,
        });

        alert(
          "Account created successfully"
        );

        setName("");
        setUsername("");
        setEmail("");
        setPassword("");

        setIsLogin(true);
      } catch (error: unknown) {
        console.error(error);

        if (
          axios.isAxiosError(error) &&
          error.response?.data?.message
        ) {
          alert(
            error.response.data.message
          );
        } else {
          alert(
            "Registration failed"
          );
        }
      } finally {
        setLoading(false);
      }
    };

  const handleLogin =
    async () => {
      try {
        if (
          !username.trim() ||
          !password.trim()
        ) {
          alert(
            "Please enter username and password"
          );
          return;
        }

        setLoading(true);

        const response =
          await loginUser({
            username,
            password,
          });

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        router.push(
          "/dashboard"
        );
      } catch (error: unknown) {
        console.error(error);

        if (
          axios.isAxiosError(error) &&
          error.response?.data?.message
        ) {
          alert(
            error.response.data.message
          );
        } else {
          alert(
            "Invalid credentials"
          );
        }
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
  className="
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-8
    lg:gap-10
    items-center
  "
>

      {/* LEFT */}

     <div
  className="
    w-full
    max-w-md
    mx-auto
    px-4
    lg:px-0
  "
>

        <h1
  className="
    text-3xl
    md:text-4xl
    font-bold
  "
>
          {isLogin
            ? "Welcome Back"
            : "Create Account"}
        </h1>

       <p
  className="
    text-gray-500
    mt-2
    pb-6
    md:pb-8
  "
>
          Join PDF CRM Management System
        </p>

        {/* REGISTER */}

        {!isLogin && (
          <div className="space-y-4">

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Full Name"
              className="
  w-full
  border
  rounded-xl
  p-3
  md:p-4
"
            />

            <input
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              placeholder="Username"
              className="
  w-full
  border
  rounded-xl
  p-3
  md:p-4
"
            />

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Email Address"
              className="
                w-full
                border
                rounded-xl
                p-3
                md:p-4
              "
            />

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Password"
              className="
  w-full
  border
  rounded-xl
  p-3
  md:p-4
"
            />

            <button
              onClick={
                handleRegister
              }
              disabled={loading}
              className="
  w-full
  bg-black
  text-white
  rounded-xl
  py-3
  md:py-4
  disabled:opacity-50
"
            >
              {loading
                ? "Creating..."
                : "Create Account"}
            </button>

          </div>
        )}

        {/* LOGIN */}

        {isLogin && (
          <div className="space-y-4">

            <input
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              placeholder="Username"
              className="
  w-full
  border
  rounded-xl
  p-3
  md:p-4
"
            />

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Password"
              className="
  w-full
  border
  rounded-xl
  p-3
  md:p-4
"
            />

            <button
              onClick={
                handleLogin
              }
              disabled={loading}
             className="
  w-full
  bg-black
  text-white
  rounded-xl
  py-3
  md:py-4
  disabled:opacity-50
"
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>

          </div>
        )}

        <p className="mt-6 text-center">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            onClick={() =>
              setIsLogin(
                !isLogin
              )
            }
            className="
              ml-2
              font-semibold
              underline
            "
          >
            {isLogin
              ? "Sign Up"
              : "Login"}
          </button>

        </p>

      </div>

      {/* RIGHT IMAGE */}

      <div
  className="
    hidden
    lg:block
    relative
    h-[700px]
    rounded-[40px]
    overflow-hidden
  "
>

        <Image
          src="/images/auth-image.jpg"
          alt="Auth"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute bottom-10 left-10 right-10 text-white">

          <h2 className="text-5xl font-light leading-tight">
            Manage PDFs,
            Signatures &
            Documents
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4">
              Create PDFs
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4">
              Digital Signatures
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}