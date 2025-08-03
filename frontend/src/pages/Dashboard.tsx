import { useState, useEffect, useContext } from 'react';
import { Users, UserCheck, Calendar, TrendingUp } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { AttendanceChart, AgeDistributionChart, MembershipGrowthChart } from "@/components/dashboard/StatsChart";
import { MemberContext } from "@/context/MemberContext";
import { EventContext } from "@/context/EventContext";

interface KPIData {
  value: string | number;
  trend?: { value: number; isPositive: boolean };
}

interface RecentActivity {
  type: string;
  description: string;
  timestamp: string;
}

export default function Dashboard() {
  const memberContext = useContext(MemberContext);
  const eventContext = useContext(EventContext);
  if (!memberContext || !eventContext) {
    throw new Error("Dashboard must be used within MemberProvider and EventProvider");
  }
  const { members, loading: membersLoading } = memberContext;
  const { events, loading: eventsLoading } = eventContext;

  const [avgAttendance, setAvgAttendance] = useState<KPIData>({ value: '0%' });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    // Fetch Average Attendance
    fetch('/api/avg-attendance')
      .then(res => res.json())
      .then(data => setAvgAttendance(data))
      .catch(err => console.error('Avg attendance fetch error:', err));

    // Fetch Recent Activity
    fetch('/api/recent-activity')
      .then(res => res.json())
      .then(data => setRecentActivities(data))
      .catch(err => console.error('Recent activity fetch error:', err));
  }, []);

  // Derive KPIs from contexts
  const totalMembers = {
    value: members.length,
    trend: { value: members.length, isPositive: members.length > 0 }
  };
  const pendingApprovals = {
    value: members.filter(m => m.status === "Pending").length
  };
  const upcomingEvents = {
    value: events.length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Members"
          value={membersLoading ? 'Loading...' : totalMembers.value}
          description="Active church members"
          icon={Users}
          trend={totalMembers.trend}
        />
        <DashboardCard
          title="Pending Approvals"
          value={membersLoading ? 'Loading...' : pendingApprovals.value}
          description="New member requests"
          icon={UserCheck}
        />
        <DashboardCard
          title="Upcoming Events"
          value={eventsLoading ? 'Loading...' : upcomingEvents.value}
          description="This week"
          icon={Calendar}
        />
        <DashboardCard
          title="Avg. Attendance"
          value={avgAttendance.value}
          description="Last month"
          icon={TrendingUp}
          trend={avgAttendance.trend}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <MembershipGrowthChart />
        <AttendanceChart />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <AgeDistributionChart />
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'member' ? 'bg-primary' :
                    activity.type === 'event' ? 'bg-success' : 'bg-warning'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {activity.type === 'member' ? 'New member registration' :
                       activity.type === 'event' ? 'Event created' : 'Attendance recorded'}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}