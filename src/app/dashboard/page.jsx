"use client";

import { authClient }
from "@/lib/auth-client";

export default function DashboardPage() {

  const {
    data,
    isPending,
  } = authClient.useSession();

  if (isPending) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!data) {

    window.location.href =
      "/login";

    return null;
  }

  return (

    <div className="p-10">

      <h1 className="text-4xl text-black font-bold">

        Welcome
        {" "}
        {data.user.name}

      </h1>

      <p className="mt-4 text-black text-xl">

        Role:
        {" "}
        {data.user.role}

      </p>

    </div>
  );
}