"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  getPdfs,
  deletePdf,
} from "@/services/pdf.service";

interface PdfDocument {
  id: string;
  title: string;
  createdAt: string;
  signatureType?: string;
}

export default function PdfListPage() {
  const [pdfs, setPdfs] = useState<
    PdfDocument[]
  >([]);

  const [loading, setLoading] =
    useState(true);

    const [search, setSearch] =
  useState("");

  // fetch PDFs inside effect to avoid setting state synchronously in the effect body

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this PDF?"
      );

    if (!confirmDelete) return;

    try {
      await deletePdf(id);

      setPdfs((prev) =>
        prev.filter(
          (pdf) => pdf.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete PDF"
      );
    }
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await getPdfs();
        if (!isMounted) return;
        setPdfs(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPdfs =
  pdfs.filter((pdf) =>
    pdf.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );

  return (
    <main>

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              PDF Documents
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all your PDF files
            </p>

          </div>

          <Link
            href="/dashboard/pdfs/create"
            className="bg-green-500 text-white px-6 py-3 rounded-2xl"
          >
            Create PDF
          </Link>

        </div>

        <div className="bg-white rounded-[32px] border shadow-sm p-6">

          <div className="mb-5">

            <input
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  placeholder="Search PDFs..."
  className="w-full border rounded-xl p-3"
/>

          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading PDFs...
            </div>
          ) : filteredPdfs.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No PDFs found
            </div>
          ) : (
            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Title
                  </th>

                  <th className="text-left py-4">
                    Signature
                  </th>

                  <th className="text-left py-4">
                    Date
                  </th>

                  <th className="text-right py-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

               {filteredPdfs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b"
                  >

                    <td className="py-5">
                      {doc.title}
                    </td>

                    <td>
                      {doc.signatureType ||
                        "-"}
                    </td>

                    <td>
                      {new Date(
                        doc.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="text-right">

                      <Link
                        href={`/dashboard/pdfs/${doc.id}`}
                        className="mr-2 px-3 py-2 border rounded-lg"
                      >
                        View
                      </Link>

                      <Link
                        href={`/dashboard/pdfs/edit/${doc.id}`}
                        className="mr-2 px-3 py-2 border rounded-lg"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            doc.id
                          )
                        }
                        className="px-3 py-2 border rounded-lg text-red-500"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          )}

        </div>

      </div>

    </main>
  );
}