import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MetricCard from "@/components/dashboard/MetricCard";
import { Users, DollarSign, TrendingUp, Eye, Megaphone } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useLeads, useConversions, useRevenue, useCampaigns } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { format, parseISO, startOfMonth } from "date-fns";

const Dashboard = () => {
  const { data: leads, isLoading: leadsLoading } = useLeads();
  const { data: conversions, isLoading: convsLoading } = useConversions();
  const { data: revenue, isLoading: revLoading } = useRevenue();
  const { data: campaigns, isLoading: campLoading } = useCampaigns();

  const isLoading = leadsLoading || convsLoading || revLoading || campLoading;

  const totalLeads = leads?.length ?? 0;
  const totalConversions = conversions?.length ?? 0;
  const conversionRate = totalLeads > 0 ? ((totalConversions / totalLeads) * 100).toFixed(1) : "0";
  const totalRevenue = revenue?.reduce((sum, r) => sum + Number(r.amount), 0) ?? 0;
  const activeCampaigns = campaigns?.filter((c) => c.status === "active").length ?? 0;

  const leadsOverTime = useMemo(() => {
    if (!leads?.length) return [];
    const grouped = new Map<string, number>();
    leads.forEach((l) => {
      const month = format(startOfMonth(parseISO(l.created_at)), "MMM yyyy");
      grouped.set(month, (grouped.get(month) ?? 0) + 1);
    });
    return Array.from(grouped, ([name, count]) => ({ name, leads: count }));
  }, [leads]);

  const revenueOverTime = useMemo(() => {
    if (!revenue?.length) return [];
    const grouped = new Map<string, number>();
    revenue.forEach((r) => {
      const month = format(startOfMonth(parseISO(r.recognized_at)), "MMM yyyy");
      grouped.set(month, (grouped.get(month) ?? 0) + Number(r.amount));
    });
    return Array.from(grouped, ([name, amount]) => ({ name, revenue: amount }));
  }, [revenue]);

  const recentActivity = useMemo(() => {
    const items: { action: string; detail: string; time: string }[] = [];
    leads?.slice(-3).reverse().forEach((l) => {
      items.push({ action: "New lead captured", detail: l.email ?? l.name, time: format(parseISO(l.created_at), "MMM d, h:mm a") });
    });
    conversions?.slice(-2).reverse().forEach((c) => {
      items.push({ action: "Conversion recorded", detail: `$${Number(c.value).toFixed(2)}`, time: format(parseISO(c.created_at), "MMM d, h:mm a") });
    });
    return items.slice(0, 5);
  }, [leads, conversions]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="flex items-center gap-4 mb-8">
            <SidebarTrigger className="md:hidden" />
            <div>
              <h1 className="font-display text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground text-sm">Welcome back — here's your overview.</p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard icon={Users} title="Total Leads" value={totalLeads.toLocaleString()} change={`${totalLeads} captured`} changeType="neutral" />
              <MetricCard icon={TrendingUp} title="Conversion Rate" value={`${conversionRate}%`} change={`${totalConversions} conversions`} changeType={Number(conversionRate) > 5 ? "positive" : "neutral"} />
              <MetricCard icon={DollarSign} title="Revenue" value={`$${totalRevenue.toLocaleString()}`} change="Total recognized" changeType="positive" />
              <MetricCard icon={Megaphone} title="Active Campaigns" value={activeCampaigns.toString()} change={`${campaigns?.length ?? 0} total`} changeType="neutral" />
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="glass rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Leads Over Time</h2>
              {leadsOverTime.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={leadsOverTime}>
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                    <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                    <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(222, 47%, 9%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
                    <Area type="monotone" dataKey="leads" stroke="hsl(217, 91%, 60%)" fill="url(#colorLeads)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-muted-foreground py-12 text-center">No lead data yet. Leads will appear here once captured.</p>
              )}
            </div>

            <div className="glass rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Revenue Growth</h2>
              {revenueOverTime.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={revenueOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                    <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                    <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(222, 47%, 9%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
                    <Bar dataKey="revenue" fill="hsl(142, 76%, 46%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-muted-foreground py-12 text-center">No revenue data yet.</p>
              )}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4">Recent Activity</h2>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <div className="text-sm font-medium">{a.action}</div>
                      <div className="text-xs text-muted-foreground">{a.detail}</div>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No recent activity yet.</p>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
