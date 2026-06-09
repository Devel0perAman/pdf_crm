"use client";

import { usePdfStore } from "@/store/pdfStore";

export default function RecentDocuments() {
  const pdfs = usePdfStore(
    (state) => state.pdfs
  );

  return (
    <div className="bg-white rounded-3xl border p-6">

      <h2 className="text-xl font-semibold mb-5">
        Recent Documents
      </h2>

      {pdfs.length === 0 ? (
        <p className="text-gray-500">
          No PDFs created yet.
        </p>
      ) : (
        <div className="space-y-4">

          {pdfs.map((pdf) => (
            <div
              key={pdf.id}
              className="border rounded-xl p-4"
            >
              <h3 className="font-semibold">
                {pdf.title}
              </h3>

              <p className="text-sm text-gray-500">
                {pdf.status}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}