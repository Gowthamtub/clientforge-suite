import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

export type ProfileWithRole = Tables<"profiles"> & {
  role: "admin" | "client";
};

export const useAdminUsers = (search: string, roleFilter: string, statusFilter: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["admin-users", user?.id, search, roleFilter, statusFilter],
    queryFn: async () => {
      // Fetch profiles
      let profileQuery = supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (search) {
        profileQuery = profileQuery.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
      }
      if (statusFilter === "active") {
        profileQuery = profileQuery.eq("is_active", true);
      } else if (statusFilter === "inactive") {
        profileQuery = profileQuery.eq("is_active", false);
      }
      const { data: profiles, error: pErr } = await profileQuery;
      if (pErr) throw pErr;

      // Fetch roles
      const { data: roles, error: rErr } = await supabase.from("user_roles").select("*");
      if (rErr) throw rErr;

      const roleMap = new Map<string, "admin" | "client">();
      roles?.forEach((r) => {
        if (r.role === "admin") roleMap.set(r.user_id, "admin");
        else if (!roleMap.has(r.user_id)) roleMap.set(r.user_id, "client");
      });

      const users: ProfileWithRole[] = (profiles ?? []).map((p) => ({
        ...p,
        role: roleMap.get(p.user_id) ?? "client",
      }));

      if (roleFilter && roleFilter !== "all") {
        return users.filter((u) => u.role === roleFilter);
      }
      return users;
    },
    enabled: !!user,
  });
};

export const useToggleUserStatus = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ userId, isActive }: { userId: string; isActive: boolean }) => {
      const { error } = await supabase.from("profiles").update({ is_active: !isActive }).eq("user_id", userId);
      if (error) throw error;
      // Log action
      await supabase.from("admin_logs").insert({
        admin_id: user?.id,
        action: isActive ? "deactivate_user" : "activate_user",
        target_id: userId,
        target_table: "profiles",
        details: { new_status: !isActive },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "User status updated" });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useChangeUserRole = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: "admin" | "client" }) => {
      // Delete existing roles then insert new
      const { error: delErr } = await supabase.from("user_roles").delete().eq("user_id", userId);
      if (delErr) throw delErr;
      const { error: insErr } = await supabase.from("user_roles").insert({ user_id: userId, role: newRole });
      if (insErr) throw insErr;
      // Log
      await supabase.from("admin_logs").insert({
        admin_id: user?.id,
        action: "change_role",
        target_id: userId,
        target_table: "user_roles",
        details: { new_role: newRole },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-users"] });
      toast({ title: "User role updated" });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useAuditLogs = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["audit-logs", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};
