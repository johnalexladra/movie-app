"use client";
import { Button } from "@/components/button";
import InputBox from "@/components/inputbox";
import { createUser } from "@/services/server-api";
import { LoginData, UserData } from "@/types/api";
import Link from "next/link";
import React, { useRef } from "react";

const SignUp = () => {

  const register = async () => {
    const res = await createUser({
      email: data.current.email,
      password: data.current.password,
      name: data.current.name
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("User Registered!");
  };
  
  const data = useRef<UserData>({
    name: "",
    email: "",
    password: "",
  });
  
  return (
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600 hidden">
        Sign up
      </div>
      <div className="p-2 flex flex-col gap-6">
        <InputBox
          autoComplete="off"
          name="name"
          labelText="Name"
          required
          onChange={(e) => (data.current.name = e.target.value)}
        />
        <InputBox
          name="email"
          labelText="Email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <InputBox
          name="password"
          labelText="password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <Button onClick={register}>Submit</Button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
