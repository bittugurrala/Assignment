"use client";

import { useEffect, useState }
from "react";

import { authClient }
from "@/lib/auth-client";

export default function AdminPage() {

  const session =
    authClient.useSession();

  const [users, setUsers] =
    useState([]);

  // FETCH USERS
  const fetchUsers = async () => {

    const res =
      await fetch("/api/users");

    const data =
      await res.json();


    setUsers(data.users);
  };

  useEffect(() => {

    if (session.data) {

      if (
        session.data.user.role !==
        "admin"
      ) {

        window.location.href =
          "/dashboard";

        return;
      }

      fetchUsers();
    }

  }, [session.data]);

  // UPDATE PERMISSIONS
  const updatePermission =
    async (user) => {

        console.log(user);
      await fetch(
        "/api/permissions",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            user_id: user.id,

            can_view:
              user.can_view,

            can_edit:
              user.can_edit,

            can_delete:
              user.can_delete,

            can_create:
              user.can_create,
          }),
        }
      );

      alert(
        "Permissions Updated"
      );
    };

  if (session.isPending) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!session.data) {

    window.location.href =
      "/login";

    return null;
  }

  return (

    <div className="p-10 text-black">

      <h1 className="text-5xl font-bold mb-10 text-black">

        Admin Dashboard

      </h1>

      <div className="space-y-6 text-black">

        {users.map((user) => (

          <div
            key={user.id}
            className="border p-6 rounded-xl"
          >

            <h2 className="text-2xl font-bold text-black">

              {user.name}

            </h2>

            <p className="text-gray-600">

              {user.email}

            </p>

            <div className="flex gap-6 mt-6 flex-wrap">

              {/* VIEW */}

              <label className="flex gap-2">

                <input
                  type="checkbox"

                 checked={user.can_view || false}

                  onChange={(e) => {

                    user.can_view =
                      e.target.checked;

                    setUsers([
                      ...users,
                    ]);
                  }}
                />

                View

              </label>

              {/* EDIT */}

              <label className="flex gap-2">

                <input
                  type="checkbox"

                  checked={user.can_edit || false}

                  onChange={(e) => {

                    user.can_edit =
                      e.target.checked;

                    setUsers([
                      ...users,
                    ]);
                  }}
                />

                Edit

              </label>

              {/* DELETE */}

              <label className="flex gap-2">

                <input
                  type="checkbox"

                  checked={user.can_delete || false}

                  onChange={(e) => {

                    user.can_delete =
                      e.target.checked;

                    setUsers([
                      ...users,
                    ]);
                  }}
                />

                Delete

              </label>

              {/* CREATE */}

              <label className="flex gap-2">

                <input
                  type="checkbox"

                  checked={user.can_create || false}

                  onChange={(e) => {

                    user.can_create =
                      e.target.checked;

                    setUsers([
                      ...users,
                    ]);
                  }}
                />

                Create

              </label>

            </div>

            <button
              onClick={() =>
                updatePermission(user)
              }
              className="bg-black text-white px-6 py-3 rounded mt-6"
            >

              Update Permissions

            </button>

          </div>
        ))}
      </div>
    </div>
  );
}