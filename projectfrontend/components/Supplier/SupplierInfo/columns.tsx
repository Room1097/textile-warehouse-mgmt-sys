import { ColumnDef } from "@tanstack/react-table";

export type SupplierType = {
  id: number;
  name: string;
};

export const columns: ColumnDef<SupplierType>[] = [
  {
    accessorKey: "id",
    header: "Supplier ID",
  },
  {
    accessorKey: "name",
    header: "Supplier Name",
  },
];
