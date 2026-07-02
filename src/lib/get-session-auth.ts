import { headers } from "next/headers"
import { auth } from "./auth"
import { cache } from "react"

const getSessionAuth = cache(async () => {
    return await auth.api.getSession({
        headers: await headers()
    })
})

export default getSessionAuth