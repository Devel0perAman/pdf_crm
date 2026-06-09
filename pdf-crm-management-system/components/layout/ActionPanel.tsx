import {
  FilePlus,
  PenTool,
  Share2,
  Download,
} from "lucide-react";

export default function ActionPanel() {
  return (
    <div className="fixed right-10 top-36 w-80">
      <div className="bg-white rounded-3xl border shadow-lg p-5">

        <h2 className="font-semibold text-lg mb-5">
          PDF Actions
        </h2>

        <div className="grid grid-cols-2 gap-3">

          <button className="border rounded-2xl p-4 text-left">
            <FilePlus size={18} />
            <p className="mt-2 text-sm">
              Create PDF
            </p>
          </button>

          <button className="border rounded-2xl p-4 text-left">
            <PenTool size={18} />
            <p className="mt-2 text-sm">
              Signature
            </p>
          </button>

          <button className="border rounded-2xl p-4 text-left">
            <Share2 size={18} />
            <p className="mt-2 text-sm">
              Share Link
            </p>
          </button>

          <button className="border rounded-2xl p-4 text-left">
            <Download size={18} />
            <p className="mt-2 text-sm">
              Download
            </p>
          </button>

        </div>

        <button className="mt-5 w-full bg-green-500 text-white py-3 rounded-2xl">
          New PDF
        </button>

      </div>
    </div>
  );
}