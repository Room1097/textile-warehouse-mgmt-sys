import { ColumnDef } from "@tanstack/react-table";

export type RawMaterialType = {
  id: number;
  name: string;
  color: string;
  denier: number;
  filament: number;
  wt: number;
};

export const columns: ColumnDef<RawMaterialType>[] = [
  {
    accessorKey: "Raw_Material_Name",
    header: "Raw Material Name",
  },
  {
    accessorKey: "Supplier_Name",
    header: "Supplier Name",
  },
  {
    accessorKey: "Supply_Weight",
    header: "Weight(KG)",
  },

];
