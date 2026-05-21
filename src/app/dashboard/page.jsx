"use client";

import { useEffect, useState } from "react";

import { authClient }
from "@/lib/auth-client";

export default function DashboardPage() {

  const {
    data,
    isPending,
  } = authClient.useSession();

  const [products, setProducts] =
    useState([]);

  const [permissions, setPermissions] =
    useState(null);

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    const res =
      await fetch("/api/products");

    const data =
      await res.json();

    setProducts(data.products);
  };

  // FETCH USER PERMISSIONS
  const fetchPermissions =
    async (userId) => {

      const res =
        await fetch(
          `/api/permissions/${userId}`
        );

      const data =
        await res.json();
      
      
      console.log(data)

      setPermissions(data.permissions);
    };

  useEffect(() => {

    if (data?.user) {

      console.log(
      "USER ID:",
      data.user.id
    );

      fetchProducts();

      fetchPermissions(
        data.user.id
      );
    }

  }, [data]);

  // LOADING
  if (isPending) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  // NOT LOGGED IN
  if (!data) {

    window.location.href =
      "/login";

    return null;
  }

  // DELETE PRODUCT
  const deleteProduct =
    async (id) => {

      const res =
        await fetch(
          `/api/products/${id}`,
          {
            method: "DELETE",
          }
        );

      const response =
        await res.json();

      if (response.success) {

        alert(
          "Product Deleted"
        );

        fetchProducts();

      } else {

        alert(
          response.error
        );
      }
    };

  return (

    <div className="p-10 text-black">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">

            Welcome
            {" "}
            {data.user.name}

          </h1>

          <p className="mt-2 text-xl">

            Role:
            {" "}
            {data.user.role}

          </p>

        </div>

        {/* CREATE BUTTON */}

        {permissions?.can_create && (

          <button
            className="bg-black text-white px-6 py-3 rounded-xl"
          >

            Create Product

          </button>
        )}

      </div>

      {/* PRODUCTS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="border rounded-2xl p-6"
          >

            <h2 className="text-2xl font-bold">

              {product.title}

            </h2>

            <p className="mt-3 text-gray-600">

              ₹
              {product.price}

            </p>

            {/* ACTION BUTTONS */}

            <div className="flex gap-4 mt-6">

              {/* EDIT */}

              {permissions?.can_edit && (

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >

                  Edit

                </button>
              )}

              {/* DELETE */}

              {permissions?.can_delete && (

                <button
                  onClick={() =>
                    deleteProduct(
                      product.id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >

                  Delete

                </button>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}