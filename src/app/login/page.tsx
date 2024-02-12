"use client";
import Link from "next/link";
import React,{useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


const loginpage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [button, setbutton] = useState(false);

  useEffect(() => {
    if(user.email.length >0 && user.password.length>0){
        setbutton(false);
    }else{
      setbutton(true);
    }
  }, [user])
  const onlogin = async () => {
    try {
      const response = await axios.post("/api/users/login",user);
      console.log("login successful",response.data);
      toast.success("login success");
      router.push("/profile");
      
      
    } catch (error:any) {
      console.log("signup failed ",error);
      toast.error(error.message);
    }finally{

    }
  };
  return (
    <div className="flex flex-col items-center bg-gray-300 h-screen justify-center">
      <h1 className="font-bold capitalize">login page</h1>
      <br></br>
     
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

      <button className="rounded-xl m-3 bg-gray-900 text-white capitalize p-2"
      onClick={onlogin}
      >login</button>
      <Link href="/signup">Don't have an account? SIGN-UP </Link>
    </div>
  );
};

export default loginpage;
