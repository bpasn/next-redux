import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
// import { useSession } from 'next-auth/react';
// import { verifyJwt } from './utils/jwt';
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// const middleware = (req: NextRequest) => {
//     const {data:session} = useSession()
//     let token = session?.user
//     if (!token && req.nextUrl.pathname.startsWith('/login')) {
//         return
//     }

//     if (req.url.includes('/')) {
//         console.log('root path')
//         if(!token){
//         console.log('token')

//             return NextResponse.redirect(new URL('/login', req.nextUrl));
//         }
//         return NextResponse.next()
//     }

// }
// export const config = {
//     matcher: '//:path*',
//   }
// export default middleware

import { withAuth } from 'next-auth/middleware'
import { signOut } from 'next-auth/react';
export const config = { matcher: ['/','/admin'] }
export default withAuth(
    function middleware(req: NextRequest) {
        return NextResponse.rewrite(new URL("/", req.url))
    },
    {
        callbacks: {
            authorized(token) {
                return token.token ? true : false
            }
        }
    }
)