
import getSessionAuth from "@/lib/get-session-auth";
import { cache } from "react";

export const getAuth = cache(async () => {
    const session = await getSessionAuth();

    return session?.user || null;
});