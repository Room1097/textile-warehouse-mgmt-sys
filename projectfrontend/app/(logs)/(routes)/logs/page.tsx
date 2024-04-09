import LogForm from "@/components/Logs/LogForm/LogForm";
import LogTable from "@/components/Logs/LogTable/logTable";
export default function Logs() {
  return (
    <div className="flex flex-col gap-12">
      <LogForm />
      <LogTable />
    </div>
  );
}
