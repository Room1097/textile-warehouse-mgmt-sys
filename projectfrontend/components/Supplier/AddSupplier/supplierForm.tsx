"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type supplierData = {
  name: string;
};

const supplierSchema: ZodType<supplierData> = z.object({
  name: z.string().min(2).max(50),
});

const SupplierForm = () => {
  const { register, reset, handleSubmit } = useForm<supplierData>({
    resolver: zodResolver(supplierSchema),
  });

  const submitData = (data: supplierData) => {
    fetch("http://localhost:3001/api/supplier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        S_name: data.name,
      }),
    }).then((res) => {
      res.json();
    });
    window.location.reload()

  };

  return (
    <div className="flex w-[80vw] pb-4">
      <form action="" onSubmit={handleSubmit(submitData)} className="w-full">
        <div className="flex w-full gap-4 pt-4 justify-center items-center">
          <Label className="w-[12vw]" htmlFor="text">
            Supplier Name
          </Label>
          <Input type="text" placeholder="John Doe" {...register("name")} />
        </div>
        <Button className="bg-zinc-200 text-black hover:bg-zinc-100">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SupplierForm;
