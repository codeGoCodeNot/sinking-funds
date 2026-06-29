"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useActionState } from "react";
import deleteFunds from "../actions/delete-funds";
import { EMPTY_ACTION_STATE } from "@/lib/to-action-state";
import { Button } from "@/components/ui/button";

type DeleteFundsDialogProps = {
  fundId: string;
};

const DeleteFundsDialog = ({ fundId }: DeleteFundsDialogProps) => {
  const [actionState, action, isPending] = useActionState(
    deleteFunds.bind(null, fundId),
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
            <AlertDialogTitle>Delete fund</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this fund and all its payments. This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? "Deleting..." : "Delete fund"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFundsDialog;
