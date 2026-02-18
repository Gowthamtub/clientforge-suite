import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { Users, FileText, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminUsers, useToggleUserStatus, useChangeUserRole, useAuditLogs, type ProfileWithRole } from "@/hooks/useAdminData";
import { format, parseISO } from "date-fns";

const adminNav = [
  { title: "User Management", url: "/admin", icon: Users },
  { title: "Audit Logs", url: "/admin/audit", icon: FileText },
];

const Admin = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"users" | "audit">("users");

  const { data: users, isLoading } = useAdminUsers(search, roleFilter, statusFilter);
  const toggleStatus = useToggleUserStatus();
  const changeRole = useChangeUserRole();
  const { data: auditLogs, isLoading: auditLoading } = useAuditLogs();

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
                        <button onClick={() => setView(item.url === "/admin" ? "users" : "audit")} className="flex items-center w-full hover:bg-muted/50 px-3 py-2 rounded-md text-sm">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </button>
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
              <h1 className="font-display text-2xl font-bold">{view === "users" ? "User Management" : "Audit Logs"}</h1>
              <p className="text-muted-foreground text-sm">{view === "users" ? "Manage all platform users." : "Track all admin actions."}</p>
            </div>
          </div>

          {view === "users" ? (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm bg-secondary/50 border-border" />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[140px] bg-secondary/50"><SelectValue placeholder="Role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] bg-secondary/50"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isLoading ? (
                <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)}</div>
              ) : (
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
                      {users?.length === 0 && (
                        <tr><td colSpan={5} className="p-8 text-center text-muted-foreground text-sm">No users found.</td></tr>
                      )}
                      {users?.map((u: ProfileWithRole) => (
                        <tr key={u.id} className="border-b border-border/50 last:border-0">
                          <td className="p-4 text-sm font-medium">{u.full_name || "—"}</td>
                          <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{u.email}</td>
                          <td className="p-4">
                            <Select value={u.role} onValueChange={(val) => changeRole.mutate({ userId: u.user_id, newRole: val as "admin" | "client" })}>
                              <SelectTrigger className="w-[100px] h-7 text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="client">Client</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-4">
                            <Badge variant={u.is_active ? "default" : "outline"} className={`text-xs ${u.is_active ? "bg-success/20 text-success border-success/30" : ""}`}>
                              {u.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="ghost" size="sm" onClick={() => toggleStatus.mutate({ userId: u.user_id, isActive: u.is_active })}>
                              {u.is_active ? "Deactivate" : "Activate"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <>
              {auditLoading ? (
                <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 rounded-lg" />)}</div>
              ) : (
                <div className="glass rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Target</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Details</th>
                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs?.length === 0 && (
                        <tr><td colSpan={4} className="p-8 text-center text-muted-foreground text-sm">No audit logs yet.</td></tr>
                      )}
                      {auditLogs?.map((log) => (
                        <tr key={log.id} className="border-b border-border/50 last:border-0">
                          <td className="p-4 text-sm font-medium capitalize">{log.action.replace(/_/g, " ")}</td>
                          <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{log.target_table ?? "—"}</td>
                          <td className="p-4 text-xs text-muted-foreground max-w-[200px] truncate">{log.details ? JSON.stringify(log.details) : "—"}</td>
                          <td className="p-4 text-xs text-muted-foreground text-right whitespace-nowrap">{format(parseISO(log.created_at), "MMM d, h:mm a")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
