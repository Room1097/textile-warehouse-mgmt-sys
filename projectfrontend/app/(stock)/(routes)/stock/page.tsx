import StockForm from "@/components/Stock/StockItem/StockForm";

export default function Stock() {
    return(
        <div className="flex flex-col gap-8">
      <h1 className="text-3xl pt-4">Inventory</h1>

      <div>
        <h3>Add Material</h3>
        <StockForm/>
      </div>
    </div>
    )
}