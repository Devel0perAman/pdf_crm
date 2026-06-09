"use client";

import {
  useRef,
  useState,
} from "react";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import SignatureCanvas from "react-signature-canvas";
import Image from "next/image";

interface PdfEditorProps {
  onSignatureChange: (
    type: string,
    data: string
  ) => void;

  onContentChange: (
    html: string,
    text: string,
    richtext: string
  ) => void;

  initialHtml?: string;

  initialSignatureType?:
    | "TYPE"
    | "DRAW";

  initialSignatureData?: string;
}

export default function PdfEditor({
  onSignatureChange,
  onContentChange,
  initialHtml,
  initialSignatureType =
    "TYPE",
  initialSignatureData = "",
}: PdfEditorProps) {
  const [signatureMode, setSignatureMode] =
    useState<"TYPE" | "DRAW">(
      initialSignatureType
    );

  const [typedSignature, setTypedSignature] =
    useState(
      initialSignatureType ===
        "TYPE"
        ? initialSignatureData
        : ""
    );

  const sigCanvas =
    useRef<SignatureCanvas>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Link.configure({
        openOnClick: false,
      }),
    ],

    content:
      initialHtml ||
      `
      <h2>PDF CRM Document</h2>
      <p>Start typing here...</p>
    `,

    onUpdate: ({ editor }) => {
      onContentChange(
        editor.getHTML(),
        editor.getText(),
        JSON.stringify(
          editor.getJSON()
        )
      );
    },
  });

  if (!editor) return null;

  const clearCanvas = () => {
    sigCanvas.current?.clear();

    onSignatureChange(
      "DRAW",
      ""
    );
  };

  const updateDrawSignature =
    () => {
      const image =
        sigCanvas.current
          ?.getTrimmedCanvas()
          .toDataURL("image/png") ||
        "";

      onSignatureChange(
        "DRAW",
        image
      );
    };

  return (
    <div className="space-y-6">

      {/* Editor */}

      <div className="bg-white rounded-3xl border overflow-hidden">

        <div className="border-b p-4 flex flex-wrap gap-2">

          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className="px-3 py-2 border rounded-lg"
          >
            Bold
          </button>

          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className="px-3 py-2 border rounded-lg"
          >
            Italic
          </button>

          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleUnderline()
                .run()
            }
            className="px-3 py-2 border rounded-lg"
          >
            Underline
          </button>

          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 1,
                })
                .run()
            }
            className="px-3 py-2 border rounded-lg"
          >
            H1
          </button>

          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 2,
                })
                .run()
            }
            className="px-3 py-2 border rounded-lg"
          >
            H2
          </button>

          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
            className="px-3 py-2 border rounded-lg"
          >
            Bullet List
          </button>

          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
            className="px-3 py-2 border rounded-lg"
          >
            Number List
          </button>

          <button
            onClick={() => {
              const url =
                window.prompt(
                  "Enter URL"
                );

              if (url) {
                editor
                  .chain()
                  .focus()
                  .setLink({
                    href: url,
                  })
                  .run();
              }
            }}
            className="px-3 py-2 border rounded-lg"
          >
            Link
          </button>

        </div>

        <div className="p-6 min-h-[500px]">

          <EditorContent
            editor={editor}
            className="min-h-[450px]"
          />

        </div>

      </div>

      {/* Signature */}

      <div className="bg-white rounded-3xl border p-6">

        <h2 className="text-xl font-semibold mb-5">
          Signature
        </h2>

        <div className="flex gap-3 mb-5">

          <button
            onClick={() => {
              setSignatureMode(
                "TYPE"
              );

              onSignatureChange(
                "TYPE",
                typedSignature
              );
            }}
            className={`px-4 py-2 rounded-xl ${
              signatureMode ===
              "TYPE"
                ? "bg-green-500 text-white"
                : "border"
            }`}
          >
            Type Signature
          </button>

          <button
            onClick={() =>
              setSignatureMode(
                "DRAW"
              )
            }
            className={`px-4 py-2 rounded-xl ${
              signatureMode ===
              "DRAW"
                ? "bg-green-500 text-white"
                : "border"
            }`}
          >
            Draw Signature
          </button>

        </div>

        {signatureMode ===
          "TYPE" && (
          <>
            <input
              value={
                typedSignature
              }
              onChange={(
                e
              ) => {
                const value =
                  e.target
                    .value;

                setTypedSignature(
                  value
                );

                onSignatureChange(
                  "TYPE",
                  value
                );
              }}
              placeholder="Type your signature"
              className="w-full border rounded-xl p-3"
            />

            <div className="mt-5 border rounded-xl p-6 text-center text-4xl font-serif min-h-[100px] flex items-center justify-center">

              {typedSignature ||
                "Your Signature"}

            </div>
          </>
        )}

        {signatureMode ===
          "DRAW" && (
          <>
            {initialSignatureData && (
              <div className="mb-4 border rounded-xl p-4">

                <Image
                  src={
                    initialSignatureData
                  }
                  alt="Signature"
                  width={128}
                  height={128}
                  className="max-h-32"
                />

              </div>
            )}

            <div className="border rounded-xl overflow-hidden">

              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                onEnd={
                  updateDrawSignature
                }
                canvasProps={{
                  width: 900,
                  height: 220,
                  className:
                    "w-full bg-white",
                }}
              />

            </div>

            <div className="flex gap-3 mt-4">

              <button
                onClick={
                  clearCanvas
                }
                className="px-4 py-2 border rounded-xl"
              >
                Clear Signature
              </button>

            </div>
          </>
        )}

      </div>

      {/* HTML Preview */}

      <div className="bg-white rounded-3xl border p-6">

        <h2 className="text-xl font-semibold mb-4">
          Generated HTML
        </h2>

        <pre className="overflow-auto text-xs whitespace-pre-wrap bg-gray-50 p-4 rounded-xl">

          {editor.getHTML()}

        </pre>

      </div>

    </div>
  );
}