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
    accessorKey: "Rid",
    header: "Raw Material ID",
  },
  {
    accessorKey: "R_name",
    header: "Raw Material Name",
  },
  {
    accessorKey: "R_color",
    header: "Raw Material Color Name",
  },
  {
    accessorKey: "R_weight",
    header: "Weight(KG)",
  },
  {
    accessorKey: "denier",
    header: "Deniers",
  },
  {
    accessorKey: "no_of_filaments",
    header: "Number of Filaments",
  },

];
