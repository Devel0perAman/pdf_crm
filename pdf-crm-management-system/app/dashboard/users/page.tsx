"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getUsers,
  updateRole,
  deleteUser,
} from "@/services/user.service";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;

  _count: {
    pdfDocuments: number;
  };
}

export default function UsersPage() {

    useEffect(() => {
  const user = JSON.parse(
    localStorage.getItem("user") ||
      "{}"
  );

  if (
    user.role !== "admin"
  ) {
    window.location.href =
      "/dashboard";
  }
}, []);

  const [users, setUsers] =
    useState<User[]>([]);

  const [search, setSearch] =
    useState("");

  const loadUsers =
    async () => {
      try {
        const response =
          await getUsers();

        setUsers(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const response = await getUsers();
        if (mounted) setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleRole =
    async (
      id: string,
      role: string
    ) => {
      try {
        await updateRole(
          id,
          role === "admin"
            ? "user"
            : "admin"
        );

        loadUsers();
      } catch (error) {
        console.error(error);
      }
    };

  const handleDelete =
    async (id: string) => {
      const confirmed =
        confirm(
          "Delete this user?"
        );

      if (!confirmed) return;

      try {
        await deleteUser(id);

        loadUsers();
      } catch (error) {
        console.error(error);
      }
    };

  const filteredUsers =
    users.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        user.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <main className="max-w-7xl mx-auto">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-bold">
          User Management
        </h1>

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search users..."
          className="
            border
            rounded-2xl
            px-4
            py-3
            w-72
          "
        />

      </div>

      <div className="bg-white border rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left p-5">
                Name
              </th>

              <th className="text-left p-5">
                Username
              </th>

              <th className="text-left p-5">
                Email
              </th>

              <th className="text-left p-5">
                PDFs
              </th>

              <th className="text-left p-5">
                Role
              </th>

              <th className="text-left p-5">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map(
              (user) => (
                <tr
                  key={user.id}
                  className="
                    border-t
                    hover:bg-gray-50
                  "
                >

                  <td className="p-5">
                    {user.name}
                  </td>

                  <td className="p-5">
                    {user.username}
                  </td>

                  <td className="p-5">
                    {user.email}
                  </td>

                  <td className="p-5">
                    {
                      user._count
                        .pdfDocuments
                    }
                  </td>

                  <td className="p-5">

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        ${
                          user.role ===
                          "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="p-5 flex gap-2">

                    <button
                      onClick={() =>
                        handleRole(
                          user.id,
                          user.role
                        )
                      }
                      className="
                        px-4
                        py-2
                        rounded-xl
                        bg-blue-500
                        text-white
                      "
                    >
                      {user.role ===
                      "admin"
                        ? "Make User"
                        : "Make Admin"}
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          user.id
                        )
                      }
                      className="
                        px-4
                        py-2
                        rounded-xl
                        bg-red-500
                        text-white
                      "
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </main>
  );
}