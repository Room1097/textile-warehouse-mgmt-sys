"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


export default function Home() {
  const [msg, setMsg] = useState("Loading..");
  const [str, setStr] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/${str}`)
      .then((res) => res.json())
      .then(({ val }) => {
        console.log(val);
        setMsg(val);
      });
  }, [str]);

  return (
    <div className="p-5">
      <div className="mb-4 flex w-[20vw] gap-20">
        <Button
          onClick={() => {
            setStr("page1"); 
          }}
          className=""
        >
          Page 1
        </Button>
        <Button
          onClick={() => {
            setStr("page2"); 
          }}
          className=""
        >
          Page 2
        </Button>
      </div>
      <div>{msg}</div>
    </div>
  );
}
