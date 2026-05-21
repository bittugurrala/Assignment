import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// GET PRODUCTS
export async function GET() {

  try {

    const result = await pool.query(`
      SELECT *
      FROM products
      ORDER BY id DESC
    `);

    return NextResponse.json({
      success: true,
      products: result.rows,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        products: [],
      },
      {
        status: 500,
      }
    );
  }
}