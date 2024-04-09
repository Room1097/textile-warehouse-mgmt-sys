"use client";
import React, { useState, useEffect } from "react";

import { RawMaterialType, columns } from "./columns";
import { DataTable } from "./data-table";

const RawMaterialTable = () => {
  const [data, setData] = useState<RawMaterialType[]>([]);

  async function getData(): Promise<RawMaterialType[]> {
    try {
      const response = await fetch("http://localhost:3001/api/raw");
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
      console.log(data)
    }
    fetchData();
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default RawMaterialTable;
