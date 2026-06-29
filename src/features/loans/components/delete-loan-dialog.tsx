"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { EMPTY_ACTION_STATE } from "@/lib/to-action-state";
import deleteLoans from "../actions/delete-loans";

type DeleteLoansDialogProps = {
  loanId: string;
};

const DeleteLoansDialog = ({ loanId }: DeleteLoansDialogProps) => {
  const [_actionState, action, isPending] = useActionState(
    deleteLoans.bind(null, loanId),
    EMPTY_ACTION_STATE,
  );
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={action}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete loan</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this loan and all its payments. This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? "Deleting..." : "Delete loan"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLoansDialog;
