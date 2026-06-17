"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  getPdfs,
  deletePdf,
  sharePdf,
} from "@/services/pdf.service";



interface PdfDocument {
  id: string;
  title: string;
  createdAt: string;
  signatureType?: string;

  userId: string;

  user?: {
    id: string;
    name: string;
    username: string;
  };
}
export default function PdfListPage() {
  const [pdfs, setPdfs] = useState<
    PdfDocument[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [currentUser, setCurrentUser] =
    useState<PdfDocument["user"] | null>(null);

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

        <div
          className="
    flex
    flex-col
    md:flex-row
    md:justify-between
    md:items-center
    gap-4
    mb-8
  "
        >

          <div>

            <h1 className="text-2xl md:text-4xl font-bold">
              PDF Documents
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all your PDF files
            </p>

          </div>

          <Link
            href="/dashboard/pdfs/create"
            className="
  bg-green-500
  text-white
  px-6
  py-3
  rounded-2xl
  w-full
  md:w-auto
  text-center
"
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
              className="
  w-full
  border
  rounded-xl
  p-3
  text-sm
  md:text-base
"
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
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left py-4">
                      Title
                    </th>

                    <th className="text-left py-4">
                      Created By
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
                        <div>
                          <p className="font-medium">
                            {doc.user?.name || "-"}
                          </p>

                          <p className="text-xs text-gray-500">
                            @{doc.user?.username || "-"}
                          </p>
                        </div>
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

                        {currentUser?.id ===
                          doc.userId && (
                            <Link
                              href={`/dashboard/pdfs/edit/${doc.id}`}
                              className="
      mr-2
      px-3
      py-2
      border
      rounded-lg
    "
                            >
                              Edit
                            </Link>
                          )}

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

                        <button
                          onClick={async () => {
                            try {
                              const response =
                                await sharePdf(doc.id);

                              navigator.clipboard.writeText(
                                response.data.shareLink
                              );

                              alert(
                                "Share link copied!"
                              );
                            } catch (error) {
                              console.error(error);
                            }
                          }}
                          className="mr-2 px-3 py-2 ml-2 border rounded-lg text-blue-500"
                        >
                          Share
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>
            </div>

          )}

          <div className="lg:hidden space-y-4">

            {filteredPdfs.map((doc) => (
              <div
                key={doc.id}
                className="
        bg-white
        border
        rounded-3xl
        p-5
        shadow-sm
      "
              >

                <div className="space-y-3">

                  <div>
                    <p className="text-xs text-gray-500">
                      Title
                    </p>

                    <p className="font-semibold">
                      {doc.title}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Created By
                    </p>

                    <p className="font-medium">
                      {doc.user?.name || "-"}
                    </p>

                    <p className="text-xs text-gray-500">
                      @{doc.user?.username || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Signature
                    </p>

                    <p>
                      {doc.signatureType || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Created
                    </p>

                    <p>
                      {new Date(
                        doc.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3">

                    <Link
                      href={`/dashboard/pdfs/${doc.id}`}
                      className="
              text-center
              border
              rounded-xl
              py-2
            "
                    >
                      View
                    </Link>

                    {currentUser?.id ===
                      doc.userId && (
                        <Link
                          href={`/dashboard/pdfs/edit/${doc.id}`}
                          className="
      text-center
      border
      rounded-xl
      py-2
    "
                        >
                          Edit
                        </Link>
                      )}

                    <button
                      onClick={async () => {
                        try {
                          const response =
                            await sharePdf(
                              doc.id
                            );

                          navigator.clipboard.writeText(
                            response.data.shareLink
                          );

                          alert(
                            "Share link copied!"
                          );
                        } catch (error) {
                          console.error(
                            error
                          );
                        }
                      }}
                      className="
              text-blue-500
              border
              rounded-xl
              py-2
            "
                    >
                      Share
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          doc.id
                        )
                      }
                      className="
              text-red-500
              border
              rounded-xl
              py-2
            "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}