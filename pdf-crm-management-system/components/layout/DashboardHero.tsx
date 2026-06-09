import { FileText } from "lucide-react";

export default function DashboardHero() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-5xl font-bold">
        PDF CRM Management System
      </h1>

      <p className="text-gray-500 mt-3">
        Manage PDFs, Signatures and Shared Documents
      </p>

      <div className="mt-12 w-full max-w-5xl h-[350px] rounded-[40px] bg-white border shadow-sm flex flex-col items-center justify-center">
        <FileText size={120} className="text-green-500" />

        <h2 className="text-2xl font-semibold mt-4">
          Agreement Contract.pdf
        </h2>

        <p className="text-gray-500">
          Last updated 5 minutes ago
        </p>
      </div>
    </div>
  );
}