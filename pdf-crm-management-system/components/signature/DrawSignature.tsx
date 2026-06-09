"use client";

import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

export default function DrawSignature() {
  const sigRef = useRef<SignatureCanvas>(null);

  const clearSignature = () => {
    sigRef.current?.clear();
  };

  const saveSignature = () => {
    const image =
      sigRef.current?.toDataURL("image/png");

    console.log(image);

    alert("Signature Saved");
  };

  return (
    <div className="bg-white rounded-[32px] border shadow-md p-6">

      <h2 className="text-xl font-semibold mb-5">
        Draw Signature
      </h2>

      <div className="border rounded-2xl overflow-hidden">

        <SignatureCanvas
          ref={sigRef}
          canvasProps={{
            width: 700,
            height: 250,
            className: "bg-white w-full",
          }}
        />

      </div>

      <div className="flex gap-3 mt-5">

        <button
          onClick={clearSignature}
          className="px-5 py-3 rounded-xl border"
        >
          Clear
        </button>

        <button
          onClick={saveSignature}
          className="px-5 py-3 rounded-xl bg-green-500 text-white"
        >
          Save
        </button>

      </div>

    </div>
  );
}