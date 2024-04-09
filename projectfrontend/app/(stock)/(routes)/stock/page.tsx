import StockForm from "@/components/Stock/StockItem/StockForm";
import StockTable from "@/components/Stock/stockTable/StockTable";

export default function Stock() {
    return(
        <div className="flex flex-col gap-8">
      <h1 className="text-3xl pt-4">Product Inventory</h1>

      <div>
        <h3>Add Material</h3>
        <StockForm/>
      </div>
      <div>
        <h3>In Stock</h3>
        <StockTable />
      </div>
    </div>
    )
}