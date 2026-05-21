"use client";

import { authClient }
from "@/lib/auth-client";

export default function AdminPage() {

  const session =
    authClient.useSession();

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

  // BLOCK NORMAL USERS
  if (
    session.data.user.role !==
    "admin"
  ) {

    window.location.href =
      "/dashboard";

    return null;
  }

  return (

    <div className="p-10">

      <h1 className="text-5xl font-bold text-black">

        Admin Dashboard

      </h1>

      <p className="mt-4 text-xl">

        Welcome Admin:
        {" "}
        {session.data.user.name}

      </p>

    </div>
  );
}