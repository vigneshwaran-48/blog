import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {

            const id = profile?.sub;

            const userResponse = await fetch(`http://localhost:8082/api/v1/app/user/${id}`,{
                headers: {
                    "Authorization": `Bearer ${account?.id_token}`
                }
            });
            if(userResponse.ok) {
                console.log("User already exists");
                return true;
            }
            console.log("User not exists going to create");

            const userData = {
                id: profile?.sub,
                name: profile?.name,
                email: profile?.email,
                image: profile?.image
            }

            const response = await fetch("http://localhost:8082/api/v1/app/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${account?.id_token}`
                },
                body: JSON.stringify(userData)
            });

            if(response.ok) {
                console.log("User created");
                return true;
            }

            return false;
        },
        async jwt({ token, account }) {
            if(account) {
                token.access_token = account.id_token;
            }
            return token;
        },
        async session({ session, token, user }) {
            session = Object.assign({}, session, {access_token: token?.access_token})
            return session;
        }
    }
}