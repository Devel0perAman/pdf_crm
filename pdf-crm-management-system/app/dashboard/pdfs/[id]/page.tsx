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
getPdf,
} from "@/services/pdf.service";

interface PdfDocument {
id: string;
title: string;
descriptionHtml?: string;
textContent?: string;
signatureType?: string;
signatureData?: string;
createdAt: string;

user?: {
id: string;
name: string;
username: string;
};
}

export default function PdfViewPage() {
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
await getPdf(
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
return ( <div className="max-w-6xl mx-auto py-20 text-center">
Loading PDF... </div>
);
}

if (!pdf) {
return ( <div className="max-w-6xl mx-auto py-20 text-center">
PDF not found </div>
);
}

return ( <main className="max-w-6xl mx-auto">
  <div className="bg-white rounded-3xl border shadow-sm p-8">

    <div className="flex justify-between items-start mb-8">

      <div>

        <h1 className="text-4xl font-bold">
          {pdf.title}
        </h1>

        <p className="text-gray-500 mt-2">
          Created:
          {" "}
          {new Date(
            pdf.createdAt
          ).toLocaleString()}
        </p>

        {pdf.user && (
          <p className="text-gray-500 mt-1">
            Created By:
            {" "}
            {pdf.user.name}
          </p>
        )}

      </div>

    </div>

    <div className="border-t pt-8">

      <div
        className="
          prose
          prose-lg
          max-w-none
        "
        dangerouslySetInnerHTML={{
          __html:
            pdf.descriptionHtml ||
            "",
        }}
      />

    </div>

    <div className="border-t mt-10 pt-8">

      <h2 className="text-2xl font-semibold mb-5">
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
          className="border rounded-xl p-4 bg-white"
        />
      ) : (
        <div className="font-serif text-5xl">
          {pdf.signatureData}
        </div>
      )}

    </div>

  </div>

</main>
);
}
