"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Dialog,
} from "@/components/ui/dialog";
import { FieldGroup, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { EMPTY_ACTION_STATE } from "@/lib/to-action-state";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import addLoan from "../actions/add-loan";

type AddLoanDialogProps = {
  funds: { id: string; name: string }[];
};

const AddLoanDialog = ({ funds }: AddLoanDialogProps) => {
  const [open, setOpen] = useState(false);
  const [fundId, setFundId] = useState("");
  const [duration, setDuration] = useState("");
  const [actionState, action, isPending] = useActionState(
    addLoan,
    EMPTY_ACTION_STATE,
  );

  useEffect(() => {
    if (actionState?.status === "SUCCESS") {
      toast.success(actionState.message);
      setOpen(false);
    } else if (actionState?.status === "ERROR") {
      toast.error(actionState.message);
    }
  }, [actionState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add loan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>New loan</DialogTitle>
            <DialogDescription>
              Create a new loan from a sinking fund.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="fundId">Fund</Label>
              <input type="hidden" name="fundId" value={fundId} />
              <Select onValueChange={setFundId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fund" />
                </SelectTrigger>
                <SelectContent>
                  {funds.map((fund) => (
                    <SelectItem key={fund.id} value={fund.id}>
                      {fund.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {actionState.fieldErrors?.fundId && (
                <p className="text-xs text-red-500">
                  {actionState.fieldErrors.fundId[0]}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="borrower">Borrower name</Label>
              <Input
                id="borrower"
                name="borrower"
                placeholder="Juan dela Cruz"
                defaultValue={
                  (actionState.payload?.get("borrower") as string) ?? ""
                }
              />
              {actionState.fieldErrors?.borrower && (
                <p className="text-xs text-red-500">
                  {actionState.fieldErrors.borrower[0]}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="amount">Amount (₱)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="5000"
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
            <Field>
              <Label htmlFor="duration">Duration</Label>
              <input type="hidden" name="duration" value={duration} />
              <Select onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 month (10%)</SelectItem>
                  <SelectItem value="1.5">1.5 months (15%)</SelectItem>
                  <SelectItem value="2">2 months (20%)</SelectItem>
                </SelectContent>
              </Select>
              {actionState.fieldErrors?.duration && (
                <p className="text-xs text-red-500">
                  {actionState.fieldErrors.duration[0]}
                </p>
              )}
            </Field>
            <Field>
              <div className="flex items-center gap-2">
                <Checkbox id="isGuarantor" name="isGuarantor" value="true" />
                <Label htmlFor="isGuarantor">Guarantor loan (+5%)</Label>
              </div>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create loan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLoanDialog;
