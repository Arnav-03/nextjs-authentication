"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setverified(true);
    } catch (error: any) {
      seterror(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="text-4xl">
      <h1>verify your email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div className="">
          <h2 className="text-2xl">email verified</h2>
          <Link href="/login">
           Login
          </Link>
        </div>
      )}

      
{error && (
        <div className="">
          <h2 className="text-2xl bg-red-500">error</h2>
        </div>
      )}
    </div>
  );
}
