"use client";

import { useState } from "react";

import TypedSignature from "@/components/signature/TypedSignature";
import DrawSignature from "@/components/signature/DrawSignature";

export default function SignaturesPage() {
  const [activeTab, setActiveTab] =
    useState("typed");

  return (
    <main>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Signatures
        </h1>

        <div className="flex gap-3 mb-6">

          <button
            onClick={() =>
              setActiveTab("typed")
            }
            className={`px-5 py-3 rounded-xl ${
              activeTab === "typed"
                ? "bg-green-500 text-white"
                : "bg-white border"
            }`}
          >
            Typed Signature
          </button>

          <button
            onClick={() =>
              setActiveTab("draw")
            }
            className={`px-5 py-3 rounded-xl ${
              activeTab === "draw"
                ? "bg-green-500 text-white"
                : "bg-white border"
            }`}
          >
            Draw Signature
          </button>

        </div>

        {activeTab === "typed" ? (
          <TypedSignature />
        ) : (
          <DrawSignature />
        )}

      </div>

    </main>
  );
}   