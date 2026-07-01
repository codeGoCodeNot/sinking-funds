
import SignInForm from "@/features/auth/sign-in/components/sign-in-form";
import SplitAuthLayout from "@/features/auth/utils/split-auth-layout";


const SignInPage = () => {
    return (
        <SplitAuthLayout>
            <SignInForm />
        </SplitAuthLayout>
    );
};

export default SignInPage;