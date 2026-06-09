"use client";

import { useState } from "react";

import PdfEditor from "@/components/pdf/PdfEditor";

export default function CreatePdfPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [signatureType, setSignatureType] =
    useState("TYPE");

  const [signatureData, setSignatureData] =
    useState("");

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!signatureData.trim()) {
      alert("Signature is required");
      return;
    }

    console.log({
      title,
      description,
      signatureType,
      signatureData,
    });

    alert(
      "Validation passed. Backend API will be connected next."
    );
  };

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Create PDF
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Editor */}

        <div className="lg:col-span-2">

          <PdfEditor />

          <div className="mt-6">

           
          </div>

        </div>

        {/* Right Panel */}

        <div className="space-y-6">

          {/* Settings */}

          <div className="bg-white rounded-3xl border p-6">

            <h2 className="font-semibold text-xl mb-5">
              Document Settings
            </h2>

            <div className="space-y-4">

              <input
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="PDF Title"
                className="w-full border rounded-xl p-3"
              />

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Description"
                rows={4}
                className="w-full border rounded-xl p-3"
              />

              <button
                onClick={handleSave}
                className="w-full bg-green-500 text-white rounded-xl py-3"
              >
                Save PDF
              </button>

            </div>

          </div>

          {/* Preview */}

          <div className="bg-white rounded-3xl border p-6">

            <h2 className="font-semibold text-xl mb-5">
              PDF Preview
            </h2>

            <div className="bg-white shadow-lg rounded-2xl w-[220px] h-[300px] mx-auto p-5">

              <div className="h-3 bg-gray-200 rounded mb-3"></div>

              <div className="h-3 bg-gray-200 rounded mb-3"></div>

              <div className="h-3 bg-gray-200 rounded mb-3"></div>

              <div className="h-32 bg-gray-100 rounded mt-5"></div>

              <div className="h-3 bg-gray-200 rounded mt-5"></div>

              <div className="h-3 bg-gray-200 rounded mt-3"></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}