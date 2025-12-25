
import { authOptions } from "@/auth"
import { FailedLoginResponseI, SuccessLoginResponseI } from "@/interfaces"
import { error } from "console"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }