import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";
const authRoutes = ["/login", "/register"];
export const middleware = async (request: NextRequest) => {
  const user = await getCurrentUser();

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
};

export const config = {
  matcher: ["/create-shop", "/login", "/register"],
};
