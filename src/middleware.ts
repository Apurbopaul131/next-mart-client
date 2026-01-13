import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";
import { IUser } from "./types";
const authRoutes = ["/login", "/register"];
const roleBasedPrivateRoutes = {
  user: ["/^/user/", "/^/create-shop/", "/user/dashboard"],
  admin: ["/^/admin/"],
};
export const middleware = async (request: NextRequest) => {
  //extract user
  const user = (await getCurrentUser()) as IUser;

  //extract pathname
  const { pathname } = request.nextUrl;
  if (!user) {
    if (authRoutes.includes(pathname)) {
      //if user want to go "/login" and "/register" route
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }
  if (user?.role && roleBasedPrivateRoutes[user?.role]) {
    const permittedRoutes = roleBasedPrivateRoutes[user?.role];
    if (permittedRoutes.some((route) => route.match(pathname))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/create-shop",
    "/login",
    "/register",
    "/user",
    "/user/:page",
    "/admin",
    "/admin/:page",
  ],
};
