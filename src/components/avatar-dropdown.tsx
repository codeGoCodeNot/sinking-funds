"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User } from "better-auth/types";
import Link from "next/link";

import { LucideDollarSign, LucideLock, LucideUser } from "lucide-react";
import UserAvatar from "./user-avatar";
import SignOutItem from "@/features/auth/sign-out/components/sign-out-item";


type AccountDropdownProps = {
    user: User;
};

const AccountDropdown = ({ user }: AccountDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <div className="rounded-full border-2 border-[#3C3489] p-0.5">
                    <UserAvatar name={user.name} image={user.image} className="size-8" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                sideOffset={8}
                collisionPadding={12}
                className="w-56 rounded-xl border border-border shadow-lg shadow-[#3C3489]/10"
            >
                <DropdownMenuLabel className="font-normal py-3">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full border-2 border-[#3C3489] p-0.5 shrink-0">
                            <UserAvatar name={user.name} image={user.image} className="size-8" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <SignOutItem />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AccountDropdown;