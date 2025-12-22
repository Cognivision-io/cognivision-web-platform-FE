"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Network,
  Database,
  Rocket,
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
} from "lucide-react";
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
  { title: "Dataset", url: "/dashboard/dataset", icon: Database },
  { title: "Deployments", url: "/dashboard/deployments", icon: Rocket },
  { title: "Monitoring", url: "/dashboard/monitoring", icon: BarChart3 },
  { title: "Setting", url: "/dashboard/settings", icon: Settings },
];

const bottomItems = [
  { title: "Help & Docs", url: "/help", icon: HelpCircle },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

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

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent className="pt-6">
        {/* Logo and Header */}
        <div className={cn("mb-8", collapsed ? "px-2" : "px-6")}>
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80">
              <span className="text-lg font-bold text-white">V</span>
            </div>
            {!collapsed && (
              <span className="text-xl font-semibold">Visionkit.ai</span>
            )}
          </div>

          {!collapsed && (
            <div className="space-y-1">
              <p className="font-medium">{user?.firstName || "User"}</p>
              <p className="text-xs text-muted-foreground">• 1 Member</p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "mb-1 h-10",
                      pathname === item.url
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
                          pathname === item.url ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
                      className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
      <SidebarFooter style={{ padding: 0 }}>
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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
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
