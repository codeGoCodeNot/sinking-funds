"use server";

import { setCookieByKey } from "@/actions/cookies";
import { auth } from "@/lib/auth";
import fromErrorToActionState, { ActionState } from "@/lib/to-action-state";
import { passwordSchema } from "@/lib/validation";
import { signInPagePath } from "@/path";
import { redirect } from "next/navigation";
import z from "zod";

const signUpSchema = z
    .object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z.email({ message: "Please enter a valid email" }),
        password: passwordSchema,
        confirmPassword: z.string().min(1, { message: "Please confirm password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const signUp = async (_actionState: ActionState, formData: FormData) => {
    let email;

    try {
        const data = signUpSchema.parse(Object.fromEntries(formData.entries()));
        const { name, password } = data;
        email = data.email;

        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        });

    } catch (error) {
        return fromErrorToActionState(error, formData);
    }

    await setCookieByKey("toast", "Account created successfully.");
    redirect(signInPagePath())
};

export default signUp;