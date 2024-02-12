"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast/headless";
const profilepage = () => {
  const [data, setdata] = useState("nothing");
  const router = useRouter();
  const onclicklogout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getuserdata = async () => {
    try {
      const res = await axios.get('/api/users/me');
      console.log("Response data:", res.data);
      setdata(res.data.data._id);
    } catch (error) {
      console.error("Error details:", error);
    }
  };
  return (
    <div className="flex bg-gray-900 text-white flex-col items-center justify-center h-screen">
      <h1>profile</h1>

      <hr></hr>
      <h2 className="bg-green-600 p-3 m-3 text-white">
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button onClick={getuserdata} className="p-3 bg-blue-700 text-white m-5">
        getuserdata
      </button>
      <button onClick={onclicklogout} className="p-3 bg-red-700 text-white m-5">
      Logout
      </button>
    </div>
  );
};
export default profilepage;
