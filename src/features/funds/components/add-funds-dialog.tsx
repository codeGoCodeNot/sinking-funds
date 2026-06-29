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
import { EMPTY_ACTION_STATE } from "@/lib/to-action-state";
import Heading from "@/components/heading";
import { loansPagePath } from "@/path";

type AddFundsDialogProps = {
  title: string;
};

const AddFundsDialog = ({ title }: AddFundsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [actionState, action, isPending] = useActionState(
    addFunds,
    EMPTY_ACTION_STATE,
  );

  useEffect(() => {
    if (actionState?.status === "SUCCESS") {
      toast.success(actionState.message);
      setOpen(false);
    }
  }, [actionState]);

  return (
    <div className="flex justify-between items-center mb-4">
      <Heading
        title="Your Savings"
        description="Manage your sinking funds. View your"
        descriptionHref={loansPagePath()}
        descriptionLinkLabel="loans"
      />
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
                <Input
                  id="name"
                  name="name"
                  placeholder="Emergency Fund"
                  defaultValue={
                    (actionState.payload?.get("name") as string) ?? ""
                  }
                />
                {actionState.fieldErrors?.name && (
                  <p className="text-xs text-red-500">
                    {actionState.fieldErrors.name[0]}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="12 months of living expenses"
                  defaultValue={
                    (actionState.payload?.get("description") as string) ?? ""
                  }
                />
                {actionState.fieldErrors?.description && (
                  <p className="text-xs text-red-500">
                    {actionState.fieldErrors.description[0]}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="monthlyAmount">Monthly amount (₱)</Label>
                <Input
                  id="monthlyAmount"
                  name="monthlyAmount"
                  type="number"
                  placeholder="4000"
                  defaultValue={
                    (actionState.payload?.get("monthlyAmount") as string) ?? ""
                  }
                />
                {actionState.fieldErrors?.monthlyAmount && (
                  <p className="text-xs text-red-500">
                    {actionState.fieldErrors.monthlyAmount[0]}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="months">Duration (months)</Label>
                <Input
                  id="months"
                  name="months"
                  type="number"
                  placeholder="12"
                  defaultValue={
                    (actionState.payload?.get("months") as string) ?? "12"
                  }
                  min={12}
                />
                {actionState.fieldErrors?.months && (
                  <p className="text-xs text-red-500">
                    {actionState.fieldErrors.months[0]}
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
                {isPending ? "Creating..." : "Create fund"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFundsDialog;
