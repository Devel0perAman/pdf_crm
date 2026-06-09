import {
  FileText,
  PenTool,
  Share2,
  Download,
} from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">

      <button className="w-14 h-14 bg-white rounded-2xl shadow-md">
        <FileText className="mx-auto" />
      </button>

      <button className="w-14 h-14 bg-white rounded-2xl shadow-md">
        <PenTool className="mx-auto" />
      </button>

      <button className="w-14 h-14 bg-white rounded-2xl shadow-md">
        <Share2 className="mx-auto" />
      </button>

      <button className="w-14 h-14 bg-white rounded-2xl shadow-md">
        <Download className="mx-auto" />
      </button>

    </div>
  );
}