import { BarChart3, Globe, Users, TrendingUp, CreditCard, Headphones, LayoutDashboard, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Website Performance", url: "/dashboard/website", icon: Globe },
  { title: "Leads & Conversions", url: "/dashboard/leads", icon: Users },
  { title: "Marketing Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Subscription", url: "/dashboard/subscription", icon: CreditCard },
  { title: "Support", url: "/dashboard/support", icon: Headphones },
];

const DashboardSidebar = () => {
  const { signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <Sidebar className="border-r border-border">
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <Zap className="h-5 w-5 text-primary" />
          ClientForge
        </Link>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-muted/50" activeClassName="bg-primary/10 text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin" className="hover:bg-muted/50" activeClassName="bg-primary/10 text-primary font-medium">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
