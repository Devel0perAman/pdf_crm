"use client";

import { useState } from "react";

export default function TypedSignature() {
  const [name, setName] = useState("");

  return (
    <div className="bg-white rounded-[32px] border shadow-md p-6">

      <h2 className="text-xl font-semibold mb-5">
        Typed Signature
      </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="w-full border rounded-xl p-3"
      />

      <div className="mt-8">

        <p className="text-sm text-gray-500 mb-2">
          Signature Preview
        </p>

        <div className="border rounded-2xl p-8 min-h-[120px] flex items-center justify-center bg-gray-50">

          <span
            style={{
              fontFamily: "cursive",
              fontSize: "42px",
            }}
          >
            {name || "John Smith"}
          </span>

        </div>

      </div>

    </div>
  );
}