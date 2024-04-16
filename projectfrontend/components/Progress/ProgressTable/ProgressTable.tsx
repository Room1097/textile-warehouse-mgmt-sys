"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatNumber } from "@/lib/formatters";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

type ProcessType = {
  Rid: string;
  Raw_material_name: string;
  Used_weight: number;
  Product_name: string;
  machine_no: number;
  is_complete: number;
  Pro_id: number;
};

import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
z;

const submitProcessSchema = z.object({
  weight: z.coerce.number(),
  id: z.coerce.number(),
});

const ProgressTable = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Control reached handleSubmit"); // Log message to verify if control reaches here

    const formData = new FormData(event.currentTarget);
    const result = submitProcessSchema.safeParse({
      weight: formData.get("weight"),
      id: formData.get("id"),
    });

    if (!result.success) {
      console.error(result.error);
      return;
    }

    console.log(result)

    try {
      const response = await fetch(
        `http://localhost:3001/api/progress/${result.data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Produced_weight: result.data.weight,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // Optionally, you may want to update the data after submission
      // Example: fetchData();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const [data, setData] = useState<ProcessType[]>([]);

  async function getData(): Promise<ProcessType[]> {
    try {
      const response = await fetch("http://localhost:3001/api/progress");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching supplier data:", error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getData();
      setData(fetchedData);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Process Table</CardTitle>
          <CardDescription>
            View and Manage Ongoing or Complete Processes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Raw Material</TableHead>
                <TableHead>Quantity Used(KG.)</TableHead>
                <TableHead>Processed Good</TableHead>
                <TableHead>Machine Number</TableHead>

                <TableHead className="w-0">
                  <span className="sr-only">Complete Process</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data
                .filter((item) => item.is_complete === 0)
                .map((item) => (
                  <TableRow>
                    <TableCell className="capitalize">
                      {item.Raw_material_name}
                    </TableCell>
                    <TableCell className="">
                      {formatNumber(item.Used_weight)}
                    </TableCell>
                    <TableCell className="">{item.Product_name}</TableCell>
                    <TableCell className="">
                      {formatNumber(item.machine_no)}
                    </TableCell>

                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Complete Process</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Complete Process</DialogTitle>
                            <DialogDescription>
                              Add the Weight of Produced Good.
                            </DialogDescription>
                          </DialogHeader>
                          <form
                            className="flex flex-col gap-6"
                            onSubmit={handleSubmit}
                          >
                            <div className="grid grid-cols-4 gap-6">
                              <Label htmlFor="id" className="text-right">
                                Process ID
                              </Label>
                              <Input
                                id="id"
                                value={item.Pro_id}
                                className="col-span-3"
                                disabled
                              />
                            </div>
                            <div className="grid grid-cols-4 gap-6">
                              <Label htmlFor="weight" className="text-right">
                                Produced Weight
                              </Label>
                              <Input
                                id="weight"
                                placeholder="Enter in Kilograms"
                                className="col-span-3"
                              />
                            </div>

                            <div className="flex justify-end">
                              <Button
                                className="w-[5vw] active:scale-95"
                                type="submit"
                              >
                                Submit
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTable;
