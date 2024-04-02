import { ColumnDef } from "@tanstack/react-table";

export type SupplierType = {
  id: number;
  name: string;
};

export const columns: ColumnDef<SupplierType>[] = [
  {
    accessorKey: "Sid",
    header: "Supplier ID",
  },
  {
    accessorKey: "S_name",
    header: "Supplier Name",
  },
];
