import StartProgress from "@/components/Progress/StartProgress/startProgress";
import CompleteProgress from "@/components/Progress/CompleteProgress/completeProgress";
import ProgressTable from "@/components/Progress/ProgressTable/ProgressTable";
export default function Process() {
  return (
    <div className="flex flex-col gap-20">
      <StartProgress />
      <ProgressTable />
      <CompleteProgress />
    </div>
  );
}
