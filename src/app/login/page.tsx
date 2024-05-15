"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";
import { Toast } from "@/components/Toast";
import { setCookie } from "cookies-next";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleError = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const signInWithEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { data: user, error: fetchError } = await supabase
      .from("members")
      .select("*")
      .eq("email", email)
      .single();

    // if (fetchError) throw new Error(fetchError.message); // If there's a fetch error, throw to catch block

    if (!user) {
      // Display some error message to the user
      console.error("User not found");
      handleError("User not found");
      return;
    }

    const isValid = bcrypt.compareSync(password, user.password_hash);

    if (!isValid) {
      // Display some error message to the user
      console.error("Invalid password");
      handleError("Invalid password");
      return;
    }

    // Set cookie
    setCookie("id", user.id, {
      maxAge: 1 * 24 * 60 * 60, // 1 days
      path: "/",
    });

    router.push("/account");
  };

  return (
    <>
      <Head>
        <title>Electric Cars, Solar & Clean Energy | Tesla</title>
      </Head>

      <div className="min-h-screen content-center mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
            nulla eaque error neque ipsa culpa autem, at itaque nostrum!
          </p>
        </div>

        <form
          onSubmit={signInWithEmail}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account? &nbsp;
              <a
                className="underline cursor-pointer"
                onClick={() => router.push("/signup")}>
                Sign up
              </a>
            </p>

            <button
              type="submit"
              className="px-4 py-2 rounded-md border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
              Sign in
            </button>
          </div>
        </form>
        <Toast
          message={toastMessage}
          show={showToast}
          onClose={() => setShowToast(false)}
        />
      </div>
    </>
  );
};

export default Login;
