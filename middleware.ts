import { NextRequest, NextResponse } from "next/server";
import {jwtVerify} from 'jose'

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(request: NextRequest) {

  const token = request.cookies.get("auth");

  if (request.nextUrl.pathname === "/home") {
    if (token === undefined) {

      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const {payload} = await jwtVerify(token.value, new TextEncoder().encode(JWT_SECRET));
      return NextResponse.next();
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // return NextResponse.next();

}

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Also match /home and subdirectories of home
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     '/home(.*)',
//   ],
// }

export const config = {
  matcher: ["/home/:path*", "/api/:path*"],
}
