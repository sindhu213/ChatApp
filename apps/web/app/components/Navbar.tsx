"use client";
import { signIn, signOut, useSession } from "next-auth/react";

function Authenticate() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {session.user?.name}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in? <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default function Navbar() {
  return (
    <div>
      <Authenticate />
    </div>
  );
}
