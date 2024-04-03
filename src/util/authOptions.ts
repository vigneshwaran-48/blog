import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getServerBase } from "./ResourceServer";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 3600
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/sigin"
    },
    callbacks: {
        async signIn({ user, account, profile }) {

            console.log("Hello from callback ...");

            const id = profile?.sub;

            const userResponse = await fetch(`${getServerBase()}/api/v1/app/user/${id}`, {
                headers: {
                    "Authorization": `Bearer ${account?.id_token}`
                }
            });
            if (userResponse.ok) {
                return true;
            }

            let image = profile?.image;
            if (account?.provider === "google") {
                image = Object.create(profile as object).picture;
            }

            const userData = {
                id: profile?.sub,
                name: profile?.name,
                email: profile?.email,
                image
            }

            const response = await fetch(`${getServerBase()}/api/v1/app/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${account?.id_token}`
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                console.log("User created");
                return true;
            }

            return false;
        },
        async jwt({ token, account }) {
            if (account) {
                token.access_token = account.id_token;
            }
            return token;
        },
        async session({ session, token, user }) {
            session = Object.assign({}, session, { access_token: token?.access_token })
            return session;
        }
    }
}