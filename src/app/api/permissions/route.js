import { NextResponse } from "next/server";

import { pool } from "@/lib/db";

export async function PUT(req) {

  try {

    const body = await req.json();

    console.log(body);

    const {
      user_id,
      can_view,
      can_edit,
      can_delete,
      can_create,
    } = body;

    // CHECK EXISTING
    const existing =
      await pool.query(
        `
        SELECT *
        FROM permissions
        WHERE user_id = $1
        `,
        [user_id]
      );

    // UPDATE
    if (existing.rows.length > 0) {

      await pool.query(
        `
        UPDATE permissions

        SET
          can_view = $1,
          can_edit = $2,
          can_delete = $3,
          can_create = $4

        WHERE user_id = $5
        `,
        [
          can_view,
          can_edit,
          can_delete,
          can_create,
          user_id,
        ]
      );

    } else {

      // INSERT
      await pool.query(
        `
        INSERT INTO permissions
        (
          user_id,
          can_view,
          can_edit,
          can_delete,
          can_create
        )

        VALUES
        ($1, $2, $3, $4, $5)
        `,
        [
          user_id,
          can_view,
          can_edit,
          can_delete,
          can_create,
        ]
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(
      "PERMISSION ERROR:"
    );

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}