"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import PdfEditor from "@/components/pdf/PdfEditor";

import {
  getPdf,
  updatePdf,
} from "@/services/pdf.service";

export default function EditPdfPage() {
  const params = useParams();

  const router = useRouter();

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
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const loadPdf =
      async () => {
        try {
          const response =
            await getPdf(
              params.id as string
            );

          const pdf =
            response.data;

          setTitle(pdf.title || "");

          setDescription(
            pdf.textContent || ""
          );

          setDescriptionHtml(
            pdf.descriptionHtml || ""
          );

          setDescriptionRichtext(
            pdf.descriptionRichtext ||
              ""
          );

          setTextContent(
            pdf.textContent || ""
          );

          setSignatureType(
            pdf.signatureType ||
              "TYPE"
          );

          setSignatureData(
            pdf.signatureData || ""
          );
        } catch (error) {
          console.error(error);

          alert(
            "Failed to load PDF"
          );
        } finally {
          setLoading(false);
        }
      };

    if (params.id) {
      loadPdf();
    }
  }, [params.id]);

  const handleUpdate =
    async () => {
      try {
        if (!title.trim()) {
          alert(
            "Title is required"
          );

          return;
        }

        setSaving(true);

        await updatePdf(
          params.id as string,
          {
            title,
            descriptionRichtext,
            descriptionHtml,
            textContent,
            signatureType,
            signatureData,
          }
        );

        alert(
          "PDF Updated Successfully"
        );

        router.push(
          "/dashboard/pdfs"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to update PDF"
        );
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <div className="p-10">
        Loading PDF...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Edit PDF
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Editor */}

        <div className="lg:col-span-2">

          <PdfEditor
            onSignatureChange={(
              type,
              data
            ) => {
              setSignatureType(
                type
              );

              setSignatureData(
                data
              );
            }}
            onContentChange={(
              html,
              text,
              richtext
            ) => {
              setDescriptionHtml(
                html
              );

              setTextContent(
                text
              );

              setDescriptionRichtext(
                richtext
              );
            }}
          />

        </div>

        {/* Sidebar */}

        <div className="space-y-6">

          <div className="bg-white rounded-3xl border p-6">

            <h2 className="font-semibold text-xl mb-5">
              Edit Document
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
                onClick={
                  handleUpdate
                }
                disabled={
                  saving
                }
                className="
                  w-full
                  bg-green-500
                  text-white
                  rounded-xl
                  py-3
                  font-medium
                  hover:bg-green-600
                  disabled:opacity-50
                "
              >
                {saving
                  ? "Updating..."
                  : "Update PDF"}
              </button>

            </div>

          </div>

          <div className="bg-white rounded-3xl border p-6">

            <h2 className="font-semibold text-xl mb-5">
              Preview
            </h2>

            <div className="border rounded-2xl p-5">

              <h3 className="font-bold text-lg">
                {title ||
                  "Document Title"}
              </h3>

              <p className="mt-3 text-sm text-gray-600 whitespace-pre-wrap">
                {description ||
                  "Document preview"}
              </p>

              <div className="mt-8 border-t pt-4">

                <p className="text-xs text-gray-400">
                  Signature
                </p>

                <div className="font-serif text-2xl mt-2 break-all">
                  {signatureData
                    ? signatureType ===
                      "DRAW"
                      ? "Drawn Signature Added"
                      : signatureData
                    : "No signature"}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}