"use client";
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { PiGithubLogo, PiGoogleLogo } from "react-icons/pi";
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";
import { toast } from 'react-hot-toast';

export default function SignIn({searchParams}: PageProps) {
  const [inputs, setInputs] = useState<LoginData>({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const { data: session } = useSession();

  if (session) {
    redirect('/dashboard');
  }

  const handleRememberMeChange = (e: any) => {
    setRememberMe(e.target.checked);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (event:FormEvent) => {
    event.preventDefault();
    try {
      const test = await signIn("credentials", {
        email: inputs.email,
        password: inputs.password,
        callbackUrl: 'http://localhost:3000/dashboard',
        redirect: false,
      });

      if(test?.error) {
        toast.error('Sign-in failed. Please check your credentials.');
      } else {
        //// Show success toast
        toast.success('Sign-in successful!');
      }
    } catch (error:any) {
      // Show error toast
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized error
        // You might want to show a different error message or redirect to a login page
        toast.error('Invalid credentials. Please try again.');
        // Or redirect to a login page
        // window.location.href = 'http://localhost:3000/login';
      } else {
        // Handle other errors
        toast.error('Sign-in failed. Please check your credentials.');
      }
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Email and Password Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
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
                  className="flex w-full justify-center input-text bg-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={inputs.password || ""}
                  onChange={handleChange}
                  className="flex w-full justify-center input-text bg-transparent"
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="rememberMe" className="text-gray-600">Remember Me</label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center button-secondary bg-gray-600"
              >
                Sign in
              </button>
            </div>
          </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="border-t border-gray-400 w-full"></div>
          <div className="mx-4 text-gray-500">Or</div>
          <div className="border-t border-gray-400 w-full"></div>
        </div>

        {/* OAuth Buttons with Pi Icons */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => signIn("google", { callbackUrl: '/' })} className="flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            <PiGoogleLogo size={24} className="mr-2" />
            Google
          </button>
          <button onClick={() => signIn("github", { callbackUrl: '/' })}  className="flex items-center justify-center w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900">
            <PiGithubLogo size={24} className="mr-2" />
            GitHub
          </button>
        </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
      { searchParams.error && (
        <p className="text-red-600 text-center capitalize">
          Login failed.
        </p>
      )}
    </>
  )
}