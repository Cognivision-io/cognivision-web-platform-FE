"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Network, Database, Rocket, BarChart3, HelpCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useLogoutMutation } from "@/features/auth/mutations/auth.mutation";
import CustomToast from "../ui/sonner";

const mainItems = [
  { title: "Use Case", url: "/dashboard", icon: Network },
  { title: "Projects", url: "/dashboard/dataset", icon: Database },
  { title: "Monitoring", url: "/dashboard/monitoring", icon: BarChart3 },
];

const bottomItems = [{ title: "Help & Docs", url: "/help", icon: HelpCircle }];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { mutateAsync: triggerLogout, isPending: isLoggingOut } =
    useLogoutMutation();

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      await triggerLogout();
      logout();
      CustomToast.success("Signed out successfully");
      router.replace("/login");
    } catch (error) {
      console.error("Failed to sign out", error);
      CustomToast.error("Failed to sign out. Please try again.");
    }
  };

  const isActiveRoute = (pathname: string, href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"; // keep dashboard strict
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent className="pt-6">
        {/* Logo and Header */}
        <div className={cn("mb-8", collapsed ? "px-2" : "px-6")}>
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="CogniVision"
              className="h-10 w-auto drop-shadow-sm"
            />
            <span className="font-heading text-[24px] font-semibold text-black">
              CogniVision
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => {
                const isActive = isActiveRoute(pathname, item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "mb-1 h-10",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        isActive
                          ? "active:bg-primary/10 active:text-primary"
                          : "active:bg-accent active:text-accent-foreground",
                      )}
                    >
                      <Link
                        href={item.url}
                        className="flex flex-1 items-center gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && (
                          <span className="flex-1">{item.title}</span>
                        )}
                        <span
                          className={cn(
                            "ml-auto hidden h-full w-1 rounded bg-primary md:inline-block",
                            isActive ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="text-muted-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground"
                    >
                      <Link
                        href={item.url}
                        className="flex flex-1 items-center gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      {/* User Profile */}
      <SidebarFooter className={`mb-4 ${collapsed ? "px-2" : "px-4"}`}>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="h-12">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.firstName?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div className="flex flex-col items-start flex-1">
                      <span className="text-sm font-medium">
                        {user?.firstName} {user?.lastName || ""}
                      </span>
                    </div>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings/login-security">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Signing out..." : "Sign out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
