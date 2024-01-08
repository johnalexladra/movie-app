"use client";
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { PiGithubLogo, PiGoogleLogo } from "react-icons/pi";

type LoginInput = {
  email: string;
  password: string;
}

type PageProps = {
  searchParams: { error?: string }
}

export default function LoginPage({searchParams}: PageProps) {
  const [inputs, setInputs] = useState<LoginInput>({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

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
    await signIn("credentials", { 
      email: inputs.email, 
      password: inputs.password, 
      callbackUrl: '/' });
  }
  return (

    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight hidden">
            Sign in to your account
          </h2>
        </div>

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
                  className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
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