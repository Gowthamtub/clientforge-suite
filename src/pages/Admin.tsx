import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { Users, BarChart3, FileText, Shield, LogOut, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const adminNav = [
  { title: "User Management", url: "/admin", icon: Users },
  { title: "Revenue Analytics", url: "/admin/revenue", icon: BarChart3 },
  { title: "Audit Logs", url: "/admin/audit", icon: FileText },
];

const mockUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "user", status: "active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user", status: "active" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "admin", status: "active" },
  { id: 4, name: "Dave Brown", email: "dave@example.com", role: "user", status: "inactive" },
];

const Admin = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-border">
          <div className="p-4">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
              <Shield className="h-5 w-5 text-primary" />
              Admin Panel
            </Link>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.url} end className="hover:bg-muted/50" activeClassName="bg-primary/10 text-primary font-medium">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Zap className="h-4 w-4" /> Back to Dashboard
            </Link>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="flex items-center gap-4 mb-8">
            <SidebarTrigger className="md:hidden" />
            <div>
              <h1 className="font-display text-2xl font-bold">User Management</h1>
              <p className="text-muted-foreground text-sm">Manage all platform users.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Input placeholder="Search users..." className="max-w-sm bg-secondary/50 border-border" />
            <Button variant="outline">Filter</Button>
          </div>

          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Email</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 last:border-0">
                    <td className="p-4 text-sm font-medium">{u.name}</td>
                    <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{u.email}</td>
                    <td className="p-4">
                      <Badge variant={u.role === "admin" ? "default" : "secondary"} className="text-xs">{u.role}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={u.status === "active" ? "default" : "outline"} className={`text-xs ${u.status === "active" ? "bg-success/20 text-success border-success/30" : ""}`}>
                        {u.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
