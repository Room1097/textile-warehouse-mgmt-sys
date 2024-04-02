import SupplierForm from "@/components/Supplier/AddSupplier/supplierForm";
import { Separator } from "@/components/ui/separator";
import SupplierInfo from "@/components/Supplier/SupplierInfo/SupplierInfo";

export default function Supplier() {
  return (
    <div className="pt-8">
      <h1 className="text-3xl pb-2">Supplier Information</h1>
      <Separator className="bg-zinc-900"/>
      <h1 className="text-xl pt-5">Add a Supplier</h1>
      <SupplierForm />
      <Separator className="bg-zinc-900"/>
      <h1 className="text-xl py-5">Existing Suppliers</h1>
      <SupplierInfo />
    </div>
  );
}
