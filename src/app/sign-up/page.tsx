import SignUpForm from "@/features/auth/sign-up/components/sign-up-form"
import SplitAuthLayout from "@/features/auth/utils/split-auth-layout"

const SignUpPage = () => {
    return <SplitAuthLayout>
        <SignUpForm />
    </SplitAuthLayout>
}

export default SignUpPage