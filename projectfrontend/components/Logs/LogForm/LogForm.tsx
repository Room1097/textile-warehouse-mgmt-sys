"use client";
import React, { useState, useEffect } from "react";
import { RawMaterialType } from "@/components/RawMaterial/RawMaterialTable/columns";
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
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const logFormSchema = z.object({
  rawMaterial: z.string().min(2).max(30),
  rawColor: z.string().min(2).max(12),
  rawDenier: z.string(),
  rawFilament: z.string(),
});

const LogForm = () => {
  const form = useForm<z.infer<typeof logFormSchema>>({
    resolver: zodResolver(logFormSchema),
    defaultValues: {
      rawMaterial: "",
      rawColor: "",
      rawDenier: "",
      rawFilament: "",
    },
  });

  function onSubmit(values: z.infer<typeof logFormSchema>) {
    const denier = parseInt(values.rawDenier);
    const filament = parseInt(values.rawFilament);
    console.log(values);
    console.log(denier);
    console.log(filament);
  }

 
  const [data, setData] = useState<any>([]);
  

  async function getData() {
    try {
      const response = await fetch("http://localhost:3001/api/raw");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log(response);
      // setData(jsonData);
      return jsonData;

    } catch (error) {
      console.error("Error fetching supplier data:", error);
      return [];
    }
  }
useEffect( ()=>{
  async function fetchData() {
    const fetchedData = await getData();
    setData(fetchedData);
    console.log(fetchedData);
    
  }
  fetchData();
},[])

  // useEffect(() => {
  //   async function fetchData() {
  //     setData(getData())
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="w-full pt-8">
      <Card className="w-[60vw]">
        <CardHeader>
          <CardTitle>Create Log</CardTitle>
          <CardDescription>
            Insert the details of Raw Materials and Suppliers to create a Log.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex gap-16 justify-between">
                <FormField
                  control={form.control}
                  name="rawMaterial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raw Material Name</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>

                              {data.map((item : any, index : any) => (
                                <SelectItem key={index} value={item.R_color}>
                                  {item.R_color}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rawColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Blue, Black, White, etc."
                          {...field}
                          className="w-[25vw]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-16 justify-between">
                <FormField
                  control={form.control}
                  name="rawDenier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Deniers</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Number of Deniers"
                          {...field}
                          type="number"
                          className="w-[25vw]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rawFilament"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Filaments</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Number of Filaments"
                          {...field}
                          className="w-[25vw]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="active:scale-95">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogForm;
