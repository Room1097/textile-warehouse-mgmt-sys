"use client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { ZodType, z } from "zod";

type Stock = {
  P_name: string;
  P_color: string;
  gsm: number;
  meter_per_KG: number;
};

const stockSchema: ZodType<Stock> = z.object({
  P_name: z.string().min(2).max(30),
  P_color: z.string().min(3).max(10),
  gsm: z.number().nonnegative(),
  meter_per_KG: z.number().nonnegative(),
});

const StockForm = () => {
  const [formData, setFormData] = useState<Stock>({
    P_name: "",
    P_color: "",
    gsm: 0,
    meter_per_KG: 0,
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
    const validationResult = stockSchema.safeParse(formData);
    if (validationResult.success) {
      fetch("http://localhost:3001/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          P_name: formData.P_name,
          P_color: formData.P_color,
          gsm: formData.gsm,
          meter_per_KG: formData.meter_per_KG,
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
          <div className="flex gap-8 items-center">
            <Label htmlFor="P_name">Material Name</Label>
            <Input
              name="P_name"
              value={formData.P_name}
              onChange={handleChange}
              className="w-[20vw]"
              type="text"
              placeholder="Cotton, Silk, Acrylic, etc."
            />
            <Label htmlFor="P_color">Color</Label>
            <Input
              name="P_color"
              value={formData.P_color}
              onChange={handleChange}
              className="w-[20vw]"
              type="text"
              placeholder="Blue, White, Black, etc."
            />
          </div>
          <div className="flex gap-8 items-center">
            <Label htmlFor="gsm">GSM</Label>
            <Input
              name="gsm"
              value={formData.gsm}
              onChange={handleChange}
              className="w-[20vw]"
              type="number"
              placeholder="75, 150, etc."
            />
            <Label htmlFor="meter_per_KG">Meter Per KG</Label>
            <Input
              name="meter_per_KG"
              value={formData.meter_per_KG}
              onChange={handleChange}
              className="w-[20vw]"
              type="number"
              placeholder="12, 24, 36, etc."
            />
          </div>
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

export default StockForm;
