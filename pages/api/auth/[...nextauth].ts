import { Session } from './../../../node_modules/next-auth/core/types.d';
import { Account, Profile, User } from 'next-auth/core/types.d';
import { JWT } from 'next-auth/jwt/types.d';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { CredentialsConfig } from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import { AdapterUser } from 'next-auth/adapters';
import axios, { AxiosError } from 'axios';

type option = {
    token: JWT;
    user?: User | AdapterUser | undefined | any;
    account?: Account | null | undefined;
    profile?: Profile | undefined;
    isNewUser?: boolean | undefined;
}
type optionSession = {
    session: Session | any;
    user: User | AdapterUser;
    token: JWT;
}

const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
    },
    jwt: {
        maxAge: 60 * 15
    },
    // callbacks: {
    //     async jwt({ token, user }: option) {
    //         console.log("JWT :",{ token, user })
    //         token?.accessToken = user?.accessToken;
    //         token?.refreshToken = user?.refreshToken;
    //         if (token?._id) token._id = user?._id;
    //         if (token.isAdmin) token.isAdmin = user?.isAdmin;
    //         return token
    //     },
    //     async session({ session, token }: optionSession) {
    //         console.log("SESSION :" , { session, token })
    //         session.user.accessToken = token?.accessToken;
    //         session.user.refreshToken = token?.refreshToken;
    //         if (token?._id) session.user._id = token._id
    //         if (token.isAdmin) session.isAdmin = token?.isAdmin;
    //         return session
    //     },
    // },
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            return true;
        },
        redirect: ({ url, baseUrl }) => {
            return baseUrl;
        },
        jwt: async ({ token, user, account }) => {

            if (account && user) {
                return {
                    // accessToken: account.accessToken,
                    accessTokenExpires: Date.now() + 60,
                    // refreshToken: account.refresh_token,
                    user,
                };
            }

            if (Date.now() < (token.accessTokenExpires as number)) {
                // Return previous token if the access token has not expired yet
                return token;
            }
            console.log(token)
            // Access token has expired, try to update it
            return token;
        },
        session: async ({ session, token }) => {
            session!.user = token.user as {};
            // session.accessToken = token.accessToken;
            // session.error = token.error;
            return {
                accessToken: token.accessToken,
                error: token.error,
                ...session
            };
        },
    },
    providers: [
        CredentialsProvider(<CredentialsConfig><unknown>{
            name: "Credentials",
            credentials: {
                accessToken: "",
                refreshToken: ""
            },
            async authorize(credential: any) {
                try {
                    const { data } = await axios.post('http://localhost:3001/api/session', {
                        email: credential.email,
                        password: credential.password
                    });
                    if (data) {
                        return data
                    }
                    return null
                } catch (error) {
                    if (error instanceof AxiosError) {
                        throw new Error(error.response && error.response.data ? error.response.data : error.message)
                    }
                    if (error instanceof Error) {
                        throw new Error(error.message)
                    }
                    throw new Error(JSON.stringify(error))
                }
            }
        }),
    ]
}

export default NextAuth(authOptions)