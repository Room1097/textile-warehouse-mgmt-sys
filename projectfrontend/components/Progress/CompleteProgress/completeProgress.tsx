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
import { Button } from "@/components/ui/button";

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
};

const CompleteProgress = () => {
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
          <CardTitle>Goods Table</CardTitle>
          <CardDescription>
            View and Manage Ongoing or Complete Processes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-0">
                  <span className="sr-only">Progress Table</span>
                </TableHead>
                <TableHead>Raw Material</TableHead>
                <TableHead>Raw Material Quantity Used</TableHead>
                <TableHead>Processed Good</TableHead>
                <TableHead>Machine Number</TableHead>
                <TableHead>Progress Status</TableHead>
                <TableHead className="w-0">
                  <span className="sr-only">Progress</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.filter((item)=>item.is_complete === 1).map((item) => (
                <TableRow>
                  <TableCell>{item.Rid}</TableCell>
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
                  <TableCell className="">
                    {item.is_complete === 1 ? (
                      <h1>Completed</h1>
                    ) : (
                      <h1>In Progress</h1>
                    )}
                  </TableCell>
                  <TableCell>
                    {!item.is_complete && (
                      <Button variant="ghost">
                        <Check />
                      </Button>
                    )}
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

export default CompleteProgress;
