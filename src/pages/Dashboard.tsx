import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MetricCard from "@/components/dashboard/MetricCard";
import { Users, DollarSign, TrendingUp, Eye } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Jan", visitors: 1200, leads: 80 },
  { name: "Feb", visitors: 1800, leads: 120 },
  { name: "Mar", visitors: 2400, leads: 180 },
  { name: "Apr", visitors: 2100, leads: 160 },
  { name: "May", visitors: 3200, leads: 240 },
  { name: "Jun", visitors: 3800, leads: 310 },
];

const recentActivity = [
  { action: "New lead captured", detail: "john@example.com", time: "2 min ago" },
  { action: "Website updated", detail: "Homepage redesign deployed", time: "1 hr ago" },
  { action: "Payment received", detail: "$129.00 — Growth Plan", time: "3 hrs ago" },
  { action: "Support ticket resolved", detail: "Ticket #1042", time: "5 hrs ago" },
];

const Dashboard = () => {
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard icon={Eye} title="Visitors" value="3,842" change="+12.5% this month" changeType="positive" />
            <MetricCard icon={Users} title="Leads" value="312" change="+8.2% this month" changeType="positive" />
            <MetricCard icon={DollarSign} title="Revenue" value="$12,430" change="+22% this month" changeType="positive" />
            <MetricCard icon={TrendingUp} title="Conversion" value="8.1%" change="-0.3% this month" changeType="negative" />
          </div>

          <div className="glass rounded-xl p-6 mb-8">
            <h2 className="font-display text-lg font-semibold mb-4">Growth Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(222, 47%, 9%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
                <Area type="monotone" dataKey="visitors" stroke="hsl(217, 91%, 60%)" fill="url(#colorVisitors)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4">Recent Activity</h2>
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
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
