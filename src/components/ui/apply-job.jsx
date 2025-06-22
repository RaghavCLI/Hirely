import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Form } from "react-hook-form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

function ApplyJobDrawer({ user, job, applied = false, fetchJob }) {
  return (
    <div>
      <Drawer open={applied ? false : undefined}>
        <DrawerTrigger asChild>
          <Button
            size="lg"
            variant={job?.isOpen && !applied ? "blue" : "destructive"}
            disabled={!job?.isOpen || applied}
            className="w-full"
          >
            {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              Apply for {job?.title} at {job?.company?.name}
            </DrawerTitle>
            <DrawerDescription>Fill the form below to apply</DrawerDescription>
          </DrawerHeader>

          <form className="flex flex-col gap-4 p-4 pb-0">
            <Input
              type="number"
              placeholder="Years of Experience"
              className="flex-1"
            />
            <Input
              type="text"
              placeholder="Skills (Comma separated)"
              className="flex-1"
            />
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Intermediate" id="Intermediate" />
                <Label htmlFor="intermediate">Intermediate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Graduate" id="Graduate" />
                <Label htmlFor="graduate">Graduate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Post Graduate" id="Post Graduate" />
                <Label htmlFor="Post-graduate">Post Graduate</Label>
              </div>
            </RadioGroup>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              className="flex-1 file:text-gray-500"
            />
            <Button type="submit" size="lg" variant="blue">
              Apply
            </Button>
          </form>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default ApplyJobDrawer;
