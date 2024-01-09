import { authOptions } from "@/services/next-auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SignUpForm } from "@/components/signup";

export default async function SignUp() {

  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }
  
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
      <SignUpForm></SignUpForm>
    </div>
  );
};
