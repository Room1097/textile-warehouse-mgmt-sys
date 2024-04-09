import { ColumnDef } from "@tanstack/react-table";

export type ProductType = {
  id: number;
  name: string;
  color: string;
  gsm: number;
  meter_per_kg: number;
  wt: number;
};

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "Pid",
    header: "Product ID",
  },
  {
    accessorKey: "P_name",
    header: "Product Name",
  },
  {
    accessorKey: "P_color",
    header: "Product Color Name",
  },
  {
    accessorKey: "P_weight",
    header: "Weight(KG)",
  },
  {
    accessorKey: "gsm",
    header: "GSM",
  },
  {
    accessorKey: "meter_per_KG",
    header: "Meter Per KG",
  },

];
