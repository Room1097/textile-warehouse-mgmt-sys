import React from "react";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type supply = {
  rid: number;
  sid: number;
  wt: number;
};

type rawMaterial = {
  r_name: string;
  r_color: string;
  denier: number;
  filament: number;
};

const supplySchema = z.object({
  rid: z.number(),
  sid: z.number(),
  wt: z.number().nonnegative(),
});

const rawMaterialSchema = z.object({
  r_name: z.string().min(2).max(30),
  r_color: z.string().min(3).max(10),
  denier: z.number().nonnegative(),
  filament: z.number().nonnegative(),
});

const RawMaterialForm = () => {
  const { register, reset, handleSubmit } = useForm<rawMaterial>({
    resolver: zodResolver(rawMaterialSchema),
  });

  const submitData = (data: rawMaterial) => {
    fetch("http://localhost:3001/api/raw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        r_name: data.r_name,
        r_color: data.r_color,
        denier: data.denier,
        filament: data.filament,
      }),
    }).then((res) => {
      res.json();
    });
    reset();
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(submitData)}
        className="flex w-full flex-col gap-8 border-2 border-zinc-950 rounded-lg px-8 py-4"
      >
        <div className="flex flex-col gap-4 justify-center items-start">
          <Label htmlFor="text">Material Name</Label>
          <Input
            className="w-[20vw]"
            type="text"
            placeholder="Cotton, Silk, Acrylic, etc."
          />
          <Label htmlFor="text">Color</Label>
          <Input
            className="w-[20vw]"
            type="text"
            placeholder="Blue, White, Black, etc."
          />
          <Label htmlFor="text">Deniers</Label>
          <Input className="w-[20vw]" type="text" placeholder="75, 150, etc." />
          <Label htmlFor="text">Number of Filaments</Label>
          <Input
            className="w-[20vw]"
            type="text"
            placeholder="12, 24, 36, etc."
          />
          <Button className="bg-zinc-200 text-black hover:bg-zinc-100">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RawMaterialForm;
