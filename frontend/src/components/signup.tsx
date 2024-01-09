"use client";

import { createUser } from "@/services/server-api";
import { redirect } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, setUser } from '@/redux/features/signupSlice';
import { RootState } from "@/redux/store";
import { toast } from "react-hot-toast";

export function SignUpForm() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.signup.data);

  const [inputs, setInputs] = useState<UserData>({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  useEffect(() => {
    if (user) {
      // Reset fields after successful submission
      setInputs({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      });
      dispatch(resetUser());
    }
  }, [user, dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await createUser(inputs);
      dispatch(setUser(inputs));
      // Show success toast
      toast.success("User created successfully!");
      redirect('/signin');
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error as needed
    }
  }
  
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="col-span-1">
          <label htmlFor="firstName" className="block text-sm font-medium leading-6">
            First Name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="firstName"
              required
              value={inputs.firstName || ""}
              onChange={handleChange}
              className="w-full input-text bg-transparent"
            />
          </div>
        </div>
        <div className="col-span-1">
          <label htmlFor="lastName" className="block text-sm font-medium leading-6">
            Last Name
          </label>
          <div className="mt-2">
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="lastName"
              required
              value={inputs.lastName || ""}
              onChange={handleChange}
              className="w-full input-text bg-transparent"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={inputs.email || ""}
              onChange={handleChange}
              className="w-full input-text bg-transparent"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label htmlFor="password" className="block text-sm font-medium leading-6">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={inputs.password || ""}
              onChange={handleChange}
              className="w-full input-text bg-transparent"
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="button-secondary bg-gray-600"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};
