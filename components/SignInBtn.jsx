"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInBtn = () => {
  const { status } = useSession();
  return (
    <>
      {status === "authenticated" ? (
        <button
          onClick={() => signOut()}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Log out <span aria-hidden="true">&rarr;</span>
        </button>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </button>
      )}
    </>
  );
};

export default SignInBtn;
