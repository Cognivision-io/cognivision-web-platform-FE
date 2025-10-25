import { NavLink } from "react-router-dom";
import { Network, Database, Rocket, BarChart3, Settings, HelpCircle, Bell } from "lucide-react";
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
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent className="pt-6">
        {/* Logo and Header */}
        <div className={`px-${!collapsed?6:2} mb-8`}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            {!collapsed && <span className="text-xl font-semibold">Visionkit.ai</span>}
          </div>
          
          {!collapsed && (
            <div className="space-y-1">
              <p className="font-medium">Hania</p>
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
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      end={item.url === "/dashboard"}
                      // className={({ isActive }) =>
                      //   isActive
                      //     ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                      //     : 
                      //     "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      // }
                      // className={'border-primary'}
                      style={{height:40,marginBottom:5}}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="flex-1">{item.title}</span>}
                      <div className="bg-primary" style={{
                        display: "inline-block",
                        width: "4px",
                        height: "100%",
                        borderRadius: "4px"
                      }}></div>
                    </NavLink>
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
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url}
                        className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      {/* User Profile */}
      <SidebarFooter style={{ padding:0}}>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="h-12">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">H</AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div className="flex flex-col items-start flex-1">
                      <span className="text-sm font-medium">Hania Hasan</span>
                    </div>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
