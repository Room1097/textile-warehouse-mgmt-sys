"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("Loading..");
  const [str, setStr] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/${str}`)
      .then((res) => res.json())
      .then(({ msg }) => {
        console.log(msg);
        setMsg(msg);
      });
  }, [str]);

  return (
    <div className="p-5">
      <div className="mb-4 flex w-[20vw] gap-20">
        <button
          onClick={() => {
            setStr("page1"); 
          }}
          className="bg-zinc-700 rounded-xl border-2 border-zinc-200 px-4 py-2"
        >
          Page 1
        </button>
        <button
          onClick={() => {
            setStr("page2"); 
          }}
          className="bg-zinc-700 rounded-xl border-2 border-zinc-200 px-4 py-2"
        >
          Page 2
        </button>
      </div>
      <div>{msg}</div>
    </div>
  );
}
