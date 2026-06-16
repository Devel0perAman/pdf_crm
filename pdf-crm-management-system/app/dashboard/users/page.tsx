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

     <div
  className="
    flex
    flex-col
    md:flex-row
    md:items-center
    md:justify-between
    gap-4
    mb-8
  "
>

       <h1 className="text-2xl md:text-4xl font-bold">
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
  w-full
  md:w-72
          "
        />

      </div>

      <div className="bg-white border rounded-3xl overflow-hidden">

        <div className="hidden lg:block overflow-x-auto">

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

        <div className="lg:hidden space-y-4">

  {filteredUsers.map((user) => (
    <div
      key={user.id}
      className="
        bg-white
        border
        rounded-3xl
        p-5
        shadow-sm
      "
    >

      <div className="space-y-2">

        <div>
          <p className="text-xs text-gray-500">
            Name
          </p>

          <p className="font-medium">
            {user.name}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Username
          </p>

          <p>
            {user.username}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Email
          </p>

          <p className="break-all">
            {user.email}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            PDFs
          </p>

          <p>
            {user._count.pdfDocuments}
          </p>
        </div>

        <div>
          <span
            className={`
              inline-block
              px-3
              py-1
              rounded-full
              text-sm
              ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-green-100 text-green-700"
              }
            `}
          >
            {user.role}
          </span>
        </div>

        <div className="flex gap-2 pt-3">

          <button
            onClick={() =>
              handleRole(
                user.id,
                user.role
              )
            }
            className="
              flex-1
              bg-blue-500
              text-white
              rounded-xl
              py-2
            "
          >
            {user.role === "admin"
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
              flex-1
              bg-red-500
              text-white
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

    </main>
  );
}