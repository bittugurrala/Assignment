import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

import { pool } from "@/lib/db";

export async function GET(request) {

  try {

    // GET SESSION
    const session =
      await auth.api.getSession({
        headers: request.headers,
      });

    // NOT LOGGED IN
    if (!session) {

      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // CHECK ADMIN ROLE
    const adminResult =
      await pool.query(
        `
        SELECT role
        FROM "user"
        WHERE id = $1
        `,
        [session.user.id]
      );

    if (
      adminResult.rows.length === 0 ||
      adminResult.rows[0].role !== "admin"
    ) {

      return NextResponse.json(
        {
          success: false,
          error: "Admin only",
        },
        { status: 403 }
      );
    }

    // FETCH USERS
    const usersResult =
      await pool.query(`
        SELECT
          id,
          name,
          email,
          role
        FROM "user"
      `);

    return NextResponse.json({
      success: true,
      users: usersResult.rows,
    });

  } catch (error) {
  console.log("FULL ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      error: String(error),
    },
    { status: 500 }
  );
}
}