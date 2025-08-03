import { useState } from "react";
import { BarChart3, TrendingUp, Download, Filter, Calendar, Users, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import StatsChart from "@/components/dashboard/StatsChart";

// Mock data - will be replaced with API calls
const membershipReports = {
  totalMembers: 350,
  newMembersThisMonth: 12,
  activeMembers: 320,
  inactiveMembers: 30,
  membershipGrowth: [
    { month: 'Jan', members: 320 },
    { month: 'Feb', members: 325 },
    { month: 'Mar', members: 332 },
    { month: 'Apr', members: 340 },
    { month: 'May', members: 350 },
  ]
};

const attendanceReports = {
  avgAttendance: 85,
  totalEvents: 45,
  highestAttendance: 95,
  lowestAttendance: 65,
  attendanceTrend: [
    { week: 'Week 1', attendance: 82 },
    { week: 'Week 2', attendance: 85 },
    { week: 'Week 3', attendance: 88 },
    { week: 'Week 4', attendance: 85 },
  ]
};

const financialReports = {
  totalTithes: 25000,
  totalOfferings: 8500,
  expenses: 15000,
  monthlyTrend: [
    { month: 'Jan', tithes: 22000, offerings: 7500 },
    { month: 'Feb', tithes: 23500, offerings: 8000 },
    { month: 'Mar', tithes: 24000, offerings: 8200 },
    { month: 'Apr', tithes: 24500, offerings: 8300 },
    { month: 'May', tithes: 25000, offerings: 8500 },
  ]
};

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedReport, setSelectedReport] = useState("overview");

  const handleExportReport = (reportType: string) => {
    // This will be connected to backend export functionality
    console.log(`Exporting ${reportType} report...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{membershipReports.totalMembers}</div>
                <p className="text-xs text-muted-foreground">
                  +{membershipReports.newMembersThisMonth} this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{attendanceReports.avgAttendance}%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tithes</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${financialReports.totalTithes.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{attendanceReports.totalEvents}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Membership Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsChart
                  data={membershipReports.membershipGrowth}
                  dataKey="members"
                  nameKey="month"
                  color="hsl(var(--primary))"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsChart
                  data={attendanceReports.attendanceTrend}
                  dataKey="attendance"
                  nameKey="week"
                  color="hsl(var(--secondary))"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="membership" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Membership Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Active Members</span>
                  <Badge variant="default">{membershipReports.activeMembers}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Inactive Members</span>
                  <Badge variant="secondary">{membershipReports.inactiveMembers}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>New This Month</span>
                  <Badge variant="outline">{membershipReports.newMembersThisMonth}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Membership Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsChart
                  data={membershipReports.membershipGrowth}
                  dataKey="members"
                  nameKey="month"
                  color="hsl(var(--primary))"
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Detailed Membership Report</CardTitle>
              <Button 
                variant="outline" 
                onClick={() => handleExportReport('membership')}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed membership analytics including demographics, joining dates, 
                department participation, and member lifecycle reports.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average Attendance</span>
                  <Badge variant="default">{attendanceReports.avgAttendance}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Highest Attendance</span>
                  <Badge variant="default">{attendanceReports.highestAttendance}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Lowest Attendance</span>
                  <Badge variant="secondary">{attendanceReports.lowestAttendance}%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Attendance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsChart
                  data={attendanceReports.attendanceTrend}
                  dataKey="attendance"
                  nameKey="week"
                  color="hsl(var(--secondary))"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Tithes</span>
                  <Badge variant="default">${financialReports.totalTithes.toLocaleString()}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Offerings</span>
                  <Badge variant="default">${financialReports.totalOfferings.toLocaleString()}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Expenses</span>
                  <Badge variant="destructive">${financialReports.expenses.toLocaleString()}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Financial Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsChart
                  data={financialReports.monthlyTrend}
                  dataKey="tithes"
                  nameKey="month"
                  color="hsl(var(--primary))"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}