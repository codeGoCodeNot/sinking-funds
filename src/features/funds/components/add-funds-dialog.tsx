"use client";

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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useState } from "react";
import addFunds from "../actions/add-funds";
import { toast } from "sonner";

type AddFundsDialogProps = {
  title: string;
};

const AddFundsDialog = ({ title }: AddFundsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [actionState, action] = useActionState(addFunds, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (actionState?.success) {
      toast.success(actionState.message);
      setOpen(false);
    }
  }, [actionState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>New sinking fund</DialogTitle>
            <DialogDescription>
              Create a new fund to start saving toward your goal.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name">Fund name</Label>
              <Input id="name" name="name" placeholder="Emergency Fund" />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="3 months of living expenses"
              />
            </Field>
            <Field>
              <Label htmlFor="monthlyAmount">Monthly amount (₱)</Label>
              <Input
                id="monthlyAmount"
                name="monthlyAmount"
                type="number"
                placeholder="4000"
              />
            </Field>
            <Field>
              <Label htmlFor="months">Duration (months)</Label>
              <Input
                id="months"
                name="months"
                type="number"
                placeholder="12"
                defaultValue={12}
                min={12}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create fund</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundsDialog;
