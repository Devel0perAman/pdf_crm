import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-3xl border p-6">

      <h2 className="text-xl font-semibold mb-5">
        Quick Actions
      </h2>

      <div className="space-y-3">

        <Link
          href="/dashboard/pdfs/create"
          className="block bg-green-500 text-white p-3 rounded-xl text-center"
        >
          Create PDF
        </Link>

        <Link
          href="/dashboard/signatures"
          className="block border p-3 rounded-xl text-center"
        >
          Signatures
        </Link>

      </div>

    </div>
  );
}