"use client";

import { useState } from "react";

import PdfEditor from "@/components/pdf/PdfEditor";
import { createPdf } from "@/services/pdf.service";

export default function CreatePdfPage() {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [
    descriptionHtml,
    setDescriptionHtml,
  ] = useState("");

  const [
    descriptionRichtext,
    setDescriptionRichtext,
  ] = useState("");

  const [
    textContent,
    setTextContent,
  ] = useState("");

  const [signatureType, setSignatureType] =
    useState("TYPE");

  const [signatureData, setSignatureData] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSave = async () => {
    try {
      if (!title.trim()) {
        alert("Title is required");
        return;
      }

      if (!signatureData.trim()) {
        alert("Signature is required");
        return;
      }

      setLoading(true);

      await createPdf({
        title,
        descriptionRichtext,
        descriptionHtml,
        textContent,
        signatureType,
        signatureData,
      });

      alert(
        "PDF Saved Successfully"
      );

      setTitle("");
      setDescription("");
      setSignatureData("");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save PDF"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Create PDF
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left Side */}

        <div className="lg:col-span-2 space-y-6">

          <PdfEditor
            onSignatureChange={(
              type,
              data
            ) => {
              setSignatureType(type);
              setSignatureData(data);
            }}
            onContentChange={(
              html,
              text,
              richtext
            ) => {
              setDescriptionHtml(
                html
              );

              setTextContent(text);

              setDescriptionRichtext(
                richtext
              );
            }}
          />

        </div>

        {/* Right Side */}

        <div className="space-y-6">

          {/* Document Settings */}

          <div className="bg-white rounded-3xl border p-6">

            <h2 className="font-semibold text-xl mb-5">
              Document Information
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
                rows={5}
                placeholder="Description"
                className="w-full border rounded-xl p-3"
              />

              <div className="border rounded-xl p-3 bg-gray-50">

                <p className="text-sm text-gray-500">
                  Signature Type
                </p>

                <p className="font-semibold">
                  {signatureType}
                </p>

              </div>

              <button
                onClick={handleSave}
                disabled={loading}
                className="
                  w-full
                  bg-green-500
                  text-white
                  rounded-xl
                  py-3
                  font-medium
                  hover:bg-green-600
                  transition
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Saving..."
                  : "Save PDF"}
              </button>

            </div>

          </div>

          {/* Preview */}

          <div className="bg-white rounded-3xl border p-6">

            <h2 className="font-semibold text-xl mb-5">
              PDF Preview
            </h2>

            <div className="bg-white shadow-lg rounded-2xl min-h-[320px] p-5 border">

              <h3 className="font-bold text-lg mb-3">
                {title ||
                  "Document Title"}
              </h3>

              <p className="text-gray-600 text-sm whitespace-pre-wrap">
                {description ||
                  "Document description preview"}
              </p>

              <div className="mt-10 border-t pt-5">

                <p className="text-xs text-gray-400 mb-2">
                  Signature
                </p>

                <div className="font-serif text-2xl break-all">
                  {signatureData
                    ? signatureType ===
                      "DRAW"
                      ? "Drawn Signature Added"
                      : signatureData
                    : "No signature added"}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}