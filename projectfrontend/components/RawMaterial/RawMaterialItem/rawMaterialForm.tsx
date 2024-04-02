"use client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { ZodType, z } from "zod";

type RawMaterial = {
  r_name: string;
  r_color: string;
  denier: number;
  filament: number;
};

const rawMaterialSchema: ZodType<RawMaterial> = z.object({
  r_name: z.string().min(2).max(30),
  r_color: z.string().min(3).max(10),
  denier: z.number().nonnegative(),
  filament: z.number().nonnegative(),
});

const RawMaterialForm = () => {
  const [formData, setFormData] = useState<RawMaterial>({
    r_name: "",
    r_color: "",
    denier: 0,
    filament: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value); 
    setFormData((prevData) => ({
      ...prevData,
      [name]: isNaN(numericValue) ? value : numericValue, 
    }));
  };

  const submitRawData = () => {
    const validationResult = rawMaterialSchema.safeParse(formData);
    if (validationResult.success) {
      fetch("http://localhost:3001/api/raw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          R_name: formData.r_name,
          R_color: formData.r_color,
          denier: formData.denier,
          no_of_filaments: formData.filament,
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log("Data submitted successfully");
          } else {
            console.error("Failed to submit data");
          }
        })
        .catch((error) => {
          console.error("Error occurred while submitting data:", error);
        });
    } else {
      console.error("Form validation failed:", validationResult.error);
    }
  };

  return (
    <div className="">
      <div className="flex w-full flex-col gap-8 border-2 border-zinc-950 rounded-lg px-8 py-4">
        <div className="flex flex-col gap-4 justify-center items-start">
          <Label htmlFor="r_name">Material Name</Label>
          <Input
            name="r_name"
            value={formData.r_name}
            onChange={handleChange}
            className="w-[20vw]"
            type="text"
            placeholder="Cotton, Silk, Acrylic, etc."
          />
          <Label htmlFor="r_color">Color</Label>
          <Input
            name="r_color"
            value={formData.r_color}
            onChange={handleChange}
            className="w-[20vw]"
            type="text"
            placeholder="Blue, White, Black, etc."
          />
          <Label htmlFor="denier">Deniers</Label>
          <Input
            name="denier"
            value={formData.denier}
            onChange={handleChange}
            className="w-[20vw]"
            type="number"
            placeholder="75, 150, etc."
          />
          <Label htmlFor="filament">Number of Filaments</Label>
          <Input
            name="filament"
            value={formData.filament}
            onChange={handleChange}
            className="w-[20vw]"
            type="number"
            placeholder="12, 24, 36, etc."
          />

          <Button
            onClick={submitRawData}
            className="bg-zinc-200 text-black hover:bg-zinc-100 active:scale-95"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RawMaterialForm;
