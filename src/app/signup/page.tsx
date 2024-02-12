"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";


const signuppage = () => {

  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [button, setbutton] = useState(false);

  useEffect(() => {
    if(user.email.length >0 && user.password.length>0 && user.username.length>0){
        setbutton(false);
    }else{
      setbutton(true);
    }
  }, [user])
  
  const onsignup = async () => {

    try {

      const response = await axios.post("/api/users/signup",user);
      console.log("signup successful",response.data);
      router.push("/login");
      
    } catch (error:any) {
      console.log("signup failed ",error);
      toast.error(error.message);
    }finally{

    }


  };
  return (
    <div className="flex flex-col items-center bg-gray-300 h-screen justify-center">
      <h1 className="font-bold capitalize">sign-up page</h1>
      <br></br>
      <input
        className="border-2 border-gray-700 p-2 rounded-xl m-2"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <input
        className="border-2 border-gray-700 p-2 rounded-xl m-2"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <input
        className="border-2 border-gray-700 p-2 rounded-xl m-2"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button className="rounded-xl m-3 bg-gray-900 text-white capitalize p-2 "
      onClick={onsignup}
      >{button ? "no signup":"signup"}</button>

      <Link href="/login">Have an account? LOGIN</Link>

    </div>
  );
};

export default signuppage;
