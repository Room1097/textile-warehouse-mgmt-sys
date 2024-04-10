"use client";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const progressSchema = z.object({
  rID: z.string({
    required_error: "Please provide a Raw Material",
  }),
  pID: z.string({
    required_error: "Please provide the Produced Material",
  }),
  WT: z.string({
    required_error: "Please provide the Used Raw Material Weight",
  }),
  machineID: z.string({
    required_error: "Please provide the Machine No. for Machine Used",
  }),
});

const StartProgress = () => {
  const form = useForm<z.infer<typeof progressSchema>>({
    resolver: zodResolver(progressSchema),
    defaultValues: {
      rID: "",
      pID: "",
      WT: "",
      machineID: "",
    },
  });

  function onSubmit(values: z.infer<typeof progressSchema>) {
    console.log(values);
  }
  const [rawMaterialData, setRawMaterialData] = useState<any[]>([]);
  const [productMaterialData, setProductMaterialData] = useState<any[]>([]);
  useEffect(() => {
    async function fetchRawData() {
      try {
        const response = await fetch("http://localhost:3001/api/raw");
        if (!response.ok) {
          throw new Error("Failed to fetch raw material data");
        }
        const jsonData = await response.json();
        setRawMaterialData(jsonData);
      } catch (error) {
        console.error("Error fetching raw material data:", error);
      }
    }
    fetchRawData();
  }, []);
  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch("http://localhost:3001/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch product material data");
        }
        const jsonData = await response.json();
        setProductMaterialData(jsonData);
      } catch (error) {
        console.error("Error fetching product material data:", error);
      }
    }
    fetchProductData();
  }, []);

  return (
    <div className="flex mt-10 w-[70vw] flex-col gap-12 border-2 border-zinc-900 p-5 rounded-xl">
      <h1 className="font-bold text-3xl">Create Progress</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-11/12 space-y-8"
        >
          <div className="flex justify-between">
            <div className="w-5/12">
              <FormField
                control={form.control}
                name="rID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raw Material</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Raw Material" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {rawMaterialData.map((item: any, index: number) => (
                            <SelectItem key={index} value={String(item.Rid)}>
                              <div className="flex gap-8 capitalize">
                                {item.R_name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-5/12">
              <FormField
                control={form.control}
                name="pID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Material</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Product Material" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productMaterialData.map(
                            (item: any, index: number) => (
                              <SelectItem key={index} value={String(item.Pid)}>
                                <div className="flex gap-8 capitalize">
                                  {item.P_name}
                                </div>
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-5/12">
              <FormField
                control={form.control}
                name="WT"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Used Weight</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter weight of used Raw Material in KG."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-5/12">
              <FormField
                control={form.control}
                name="WT"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Machine ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Machine ID used in the Process."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default StartProgress;
