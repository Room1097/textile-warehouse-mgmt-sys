import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Supplier() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Supplier Information</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Supplier</DialogTitle>
          <DialogDescription>Supplier Details</DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <div className="">
            Supplier Name : 
            </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
