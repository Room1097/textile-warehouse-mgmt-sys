import { z } from "zod";
import RawMaterialForm from "@/components/RawMaterial/RawMaterialItem/rawMaterialForm";


export default function Material() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl pt-4">Inventory</h1>
      <div>
        <h3>Add Material</h3>
        <RawMaterialForm />
      </div>
      <div>
        <h3>In Stock</h3>
      </div>
    </div>
  );
}
