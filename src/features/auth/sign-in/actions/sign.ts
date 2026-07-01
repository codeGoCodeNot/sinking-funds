import { signIn } from "@/lib/auth-client";
import { homePagePath } from "@/path";

const signInAction = async (email: string, password: string) => {
    const { error } = await signIn.email({
        email,
        password,
        callbackURL: homePagePath(),
    });

    return { error };
};

export default signInAction;