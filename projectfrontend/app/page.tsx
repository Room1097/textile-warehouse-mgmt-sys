"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/stock");
  return (
    <div className="p-5">
      <h1>Hola Amigo!!</h1>
    </div>
  );
}
