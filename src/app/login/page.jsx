"use client";

import { useState } from "react";

import { authClient }
from "@/lib/auth-client";

export default function LoginPage() {

  const [isLogin, setIsLogin] =
    useState(true);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async () => {

    // LOGIN
    if (isLogin) {

      const result =
        await authClient.signIn.email({

          email,
          password,

        });

      console.log(result);

      if (result.error) {
        alert(result.error.message);
        return;
      }

      alert("Login Success");

      if (
        result.data.user.role ===
        "admin"
        ) {

        window.location.href =
            "/admin";

        } else {

        window.location.href =
            "/dashboard";
    }

      return;
    }

    // REGISTER
    const result =
      await authClient.signUp.email({

        name,
        email,
        password,

      });

    console.log(result);

    if (result.error) {
      alert(result.error.message);
      return;
    }

    alert("Account Created");

    setIsLogin(true);
  };

  return (

    <div className="min-h-screen flex items-center justify-center text-black">

      {/* RIGHT */}

      <div className="w-1/2 flex items-center justify-center">

        <div className="w-100 rounded-2xl p-10 shadow-2xl">

          <h1 className="text-4xl font-bold mb-8">

            {isLogin
              ? "Welcome back"
              : "Create account"}

          </h1>

          {!isLogin && (
            <div>
                <label className="text-gray-600">Name*</label>
                <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                className="w-full border p-3 rounded mb-4"/>
            </div>
            )
            }
          <div>
            <label className="text-gray-600">Email*</label>
            <input
            type="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />
          </div>

          <div>
            <label className="text-gray-600">Password*</label>
            <input
            type="password"
            placeholder="●●●●●●●●"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 rounded mb-6"
          />
          </div>
          
          

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded active:bg-gray-400"
          >

            {isLogin
              ? "Login"
              : "Create Account"}

          </button>
            
        <div className="flex justify-center">
                <button
            onClick={() =>
              setIsLogin(!isLogin)
            }
            className="mt-6 text-blue-600 "> {isLogin? "Create account": "Already have account?"} </button>
        </div>
          

        </div>
      </div>
    </div>
  );
}