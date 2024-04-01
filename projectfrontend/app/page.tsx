"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Home() {
  const [msg,setMsg]=useState("Loading..");
useEffect(()=>{
fetch("http://localhost:3001/")
.then((res)=>
  res.json()
).then(({msg})=>{
  console.log(msg);
  
  setMsg(msg)
})
},[]);
  return (
    <>
    <div>{msg}</div>
    </>
  );
}
