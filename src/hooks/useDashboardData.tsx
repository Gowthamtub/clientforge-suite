import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const useLeads = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["leads", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useConversions = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["conversions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversions")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useRevenue = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["revenue", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("revenue")
        .select("*")
        .order("recognized_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useCampaigns = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["campaigns", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};
