"use client";

import { Bot, Settings, SquareTerminal } from "lucide-react";
import * as React from "react";

import Logo from "@/assets/svgs/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { protectedRoutes } from "@/constants";
import { useUser } from "@/context/UserContext";
import { logoutUser } from "@/services/AuthServices";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Shop",
      url: "/user/shop/all-products",
      icon: Bot,
      items: [
        {
          title: "Manage Products",
          url: "/user/shop/all-products",
        },
        {
          title: "Manage Categories",
          url: "/user/shop/category",
        },
        {
          title: "Manage Brands",
          url: "/user/shop/brand",
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setIsLoading, isLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser();
    setIsLoading(!isLoading);
    if (protectedRoutes.some((route) => route.match(pathname))) {
      router.push("/");
    }
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Logo width={80} height={30}></Logo>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">NextMart</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name,
            email: user?.email,
            avatar: "/avatars/shadcn.jpg",
          }}
          handleLogout={handleLogout}
        ></NavUser>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
