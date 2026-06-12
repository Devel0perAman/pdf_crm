"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  useParams,
} from "next/navigation";

import {
  getSharedPdf,
} from "@/services/pdf.service";

interface PdfDocument {
  id: string;
  title: string;
  descriptionHtml?: string;
  signatureType?: string;
  signatureData?: string;
  createdAt: string;

  user?: {
    name: string;
    username: string;
  };
}

export default function SharedPdfPage() {
  const params = useParams();

  const [pdf, setPdf] =
    useState<PdfDocument | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadPdf =
      async () => {
        try {
          const response =
            await getSharedPdf(
              params.id as string
            );

          setPdf(
            response.data
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    if (params.id) {
      loadPdf();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-10">
        Loading PDF...
      </div>
    );
  }

  if (!pdf) {
    return (
      <div className="p-10">
        PDF not found
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-10">

      <div className="bg-white border rounded-3xl p-8">

        <h1 className="text-4xl font-bold mb-3">
          {pdf.title}
        </h1>

        <p className="text-gray-500 mb-2">
          Shared by:
          {" "}
          {pdf.user?.name}
        </p>

        <p className="text-gray-500 mb-8">
          {new Date(
            pdf.createdAt
          ).toLocaleString()}
        </p>

        <div
          className="
            prose
            max-w-none
            mb-10
          "
          dangerouslySetInnerHTML={{
            __html:
              pdf.descriptionHtml ||
              "",
          }}
        />

        <div className="border-t pt-8">

          <h2 className="text-xl font-semibold mb-4">
            Signature
          </h2>

          {pdf.signatureType ===
          "DRAW" ? (
            <Image
              src={
                pdf.signatureData ||
                ""
              }
              alt="Signature"
              width={400}
              height={160}
              unoptimized
            />
          ) : (
            <div className="font-serif text-4xl">
              {
                pdf.signatureData
              }
            </div>
          )}

        </div>

      </div>

    </main>
  );
}