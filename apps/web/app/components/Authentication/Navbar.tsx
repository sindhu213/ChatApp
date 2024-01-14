"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import AuthForm from "app/components/Authentication/AuthForm";

function Authenticate() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {session.user?.name}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}

export default function Navbar() {
  return (
    <div>
      <AuthForm/>
      <Authenticate />
    </div>
  );
}
