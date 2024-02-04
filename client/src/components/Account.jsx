import { useGetUser } from "@/hooks/useUser";
import { Button } from "./ui/button";
import React from "react";

export default function Account() {
  const user = useGetUser();

  console.log("user : ", user);
  let filteredUser = {};

  if (user) {
    filteredUser = Object.fromEntries(
      Object.entries(user).filter(
        ([key, value]) => key !== "avatar" && key !== "otp" && value !== ""
      )
    );
  }

  console.log("filtered : ", filteredUser);

  return (
    <main className="px-10 bg-[#2b2b2b] py-2 w-full rounded-md ">
      {/* right side */}
      <section className="flex justify-between w-[69%] max-w-[1300px]max-md:flex-col-reverse">
        <div className="flex px-2 py-6 flex-col space-y-10  justify-center items-start">
          <h1 className="text-2xl border-b ">User Details : </h1>
          <ul className="list-none">
            {user &&
              Object.entries(filteredUser).map(([key, value], index) => (
                <li key={index} className="flex space-x-6 w-full">
                  <h1 className="text-[1.3rem] font-semibold">{key} : </h1>
                  <p className="text-green-200 text-[1.2rem]">
                    {String(value)}
                  </p>
                </li>
              ))}
          </ul>
          <Button className="bg-red-400 px-6 text-white">Update Details</Button>
        </div>
        {/* left side */}
        <div className="mt-10">
          <img
            src={user && String(user.avatar)}
            className="w-[190px] bg-gray-400 rounded-md bg-white"
            alt="your-avatar"
          />
        </div>
      </section>
    </main>
  );
}
