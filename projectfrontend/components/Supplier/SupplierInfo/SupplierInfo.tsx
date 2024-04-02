'use client'
import React, { useState, useEffect } from "react";

interface Supplier {
  Sid: number;
  S_name: string;
}

import { SupplierType, columns } from "./columns";
import { DataTable } from "./data-table";

const SupplierInfo = () => {
  const [data, setData] = useState<SupplierType[]>([]);

  async function getData(): Promise<SupplierType[]> {
    try {
      const response = await fetch("http://localhost:3001/api/supplier");
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

  return <div>
    <DataTable columns={columns} data={data}/>
  </div>; 
};

export default SupplierInfo;
