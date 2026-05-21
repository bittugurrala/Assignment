import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req,
  context
) {

  try {

    const params =
      await context.params;

    const userId =
      params.id[0];

    console.log(
      "PARAM USER ID:",
      userId
    );

    const result =
      await pool.query(
        `
        SELECT
          can_create,
          can_edit,
          can_delete
        FROM permissions
        WHERE user_id = $1
        `,
        [userId]
      );

    console.log(
      "DB RESULT:",
      result.rows
    );

    if (
      result.rows.length === 0
    ) {

      return NextResponse.json({
        success: true,

        permissions: {
          can_create: false,
          can_edit: false,
          can_delete: false,
        },
      });
    }

    return NextResponse.json({
      success: true,

      permissions:
        result.rows[0],
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}