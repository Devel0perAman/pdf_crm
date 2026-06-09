"use client";

import { FileText, PenTool } from "lucide-react";
import { usePdfStore } from "@/store/pdfStore";
import { useSignatureStore } from "@/store/signatureStore";

export default function DashboardStats() {
  const pdfs = usePdfStore((state) => state.pdfs);
  const signatures = useSignatureStore(
    (state) => state.signatures
  );

  return (
    <div className="grid md:grid-cols-4 gap-5">

      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <FileText className="mb-3" />
        <p className="text-gray-500">Total PDFs</p>
        <h2 className="text-4xl font-bold">
          {pdfs.length}
        </h2>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <PenTool className="mb-3" />
        <p className="text-gray-500">
          Signatures
        </p>
        <h2 className="text-4xl font-bold">
          {signatures.length}
        </h2>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <p className="text-gray-500">
          Shared Links
        </p>
        <h2 className="text-4xl font-bold">
          0
        </h2>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <p className="text-gray-500">
          Storage
        </p>
        <h2 className="text-4xl font-bold">
          0 MB
        </h2>
      </div>

    </div>
  );
}