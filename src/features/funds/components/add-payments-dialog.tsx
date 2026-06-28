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
import addPayment from "../actions/add-payment";
import { EMPTY_ACTION_STATE } from "@/lib/to-action-state";
import { toast } from "sonner";

type AddPaymentsDialogProps = {
  fundId: string;
};

const AddPaymentsDialog = ({ fundId }: AddPaymentsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionState, action, isPending] = useActionState(
    addPayment.bind(null, fundId),
    EMPTY_ACTION_STATE,
  );

  useEffect(() => {
    if (actionState?.status === "SUCCESS") {
      toast.success(actionState.message);
      setIsOpen(false);
    }
  }, [actionState]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add payment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Add payment</DialogTitle>
            <DialogDescription>
              Enter the amount you deposited this month.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="amount">Amount (₱)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="Enter amount"
                defaultValue={
                  (actionState.payload?.get("amount") as string) ?? ""
                }
              />
              {actionState.fieldErrors?.amount && (
                <p className="text-xs text-red-500">
                  {actionState.fieldErrors.amount[0]}
                </p>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Add payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentsDialog;
