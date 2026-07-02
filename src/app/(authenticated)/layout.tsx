import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect"

const AuthenticatedLayout = async ({ children }: { children: React.ReactNode }) => {

    await getAuthOrRedirect()

    return (
        <>
            {children}
        </>
    )
}

export default AuthenticatedLayout