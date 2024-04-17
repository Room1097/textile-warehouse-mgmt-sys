"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

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

const FormSchema = z.object({
  rid: z.string({
    required_error: "Please select a Material.",
  }),
  sid: z.string({
    required_error: "Please select a Supplier.",
  }),
  wt: z.string({
    required_error: "Please enter a Weight.",
  }),
});

export default function LogForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const rID = parseInt(data.rid);
    const sID = parseInt(data.sid);
    const WT = parseInt(data.wt);

    fetch("http://localhost:3001/api/supply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Sid: sID,
        Rid: rID,
        S_weight: WT,
      }),
    }).then((res) => {
      res.json();
    });
    window.location.reload()
  }

  const [rawMaterialData, setRawMaterialData] = useState<any[]>([]);
  const [supplierData, setSupplierData] = useState<any[]>([]);

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
    async function fetchSupplierData() {
      try {
        const response = await fetch("http://localhost:3001/api/supplier");
        if (!response.ok) {
          throw new Error("Failed to fetch supplier data");
        }
        const jsonData = await response.json();
        setSupplierData(jsonData);
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    }
    fetchSupplierData();
  }, []);

  return (
    <div className="mt-10 flex flex-col gap-4 w-[60vw] border-2 border-zinc-900 rounded-xl p-5">
      <h1 className="text-3xl font-bold"> Create Supply Logs</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-11/12 space-y-6"
        >
          <div>
            <FormField
              control={form.control}
              name="rid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raw Material Details</FormLabel>

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
                            <div>Material: {item.R_name}</div>
                            <div>Color: {item.R_color}</div>
                            <div>Deniers: {item.denier}</div>
                            <div>
                              Number of Filaments: {item.no_of_filaments}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between">
            <div className="w-7/12">
              <FormField
                control={form.control}
                name="sid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Details</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Supplier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {supplierData.map((item: any, index: number) => (
                          <SelectItem key={index} value={String(item.Sid)}>
                            <div className="flex gap-4 capitalize">
                              <div>Name: {item.S_name}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="wt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter in Kg"
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
      <div className="text-zinc-500 text-sm flex justify-between mt-5 gap-">
        <Button variant="link">
          <Link href="/inventory">Don't See Your Raw Material? Add Here!</Link>
        </Button>
        <Button variant="link">
          <Link href="/supplier">Don't See Your Supplier? Add Here!</Link>
        </Button>
      </div>
    </div>
  );
}
