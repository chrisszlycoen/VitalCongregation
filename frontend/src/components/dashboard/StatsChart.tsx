import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Attendance {
  month: string;
  attendance: number;
}

interface AgeDistribution {
  name: string;
  value: number;
  color: string;
}

interface Membership {
  month: string;
  members: number;
}

interface StatsChartProps {
  data: { [key: string]: any }[];
  dataKey: string;
  nameKey: string;
  color: string;
}

export function AttendanceChart() {
  const [data, setData] = useState<Attendance[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/attendance')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => console.error('Attendance fetch error:', err));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Attendance</CardTitle>
        <CardDescription>Average Sabbath service attendance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.length === 0 && <p className="text-sm text-muted-foreground">No attendance data available.</p>}
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 text-sm font-medium">{item.month}</div>
              <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(item.attendance, 100)}%` }}
                />
              </div>
              <div className="w-12 text-sm text-right">{item.attendance}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function AgeDistributionChart() {
  const [data, setData] = useState<AgeDistribution[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/age-distribution')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => console.error('Age distribution fetch error:', err));
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Distribution</CardTitle>
        <CardDescription>Member demographics by age group</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.length === 0 && <p className="text-sm text-muted-foreground">No age distribution data available.</p>}
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;

            return (
              <div key={index} className="flex items-center gap-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function MembershipGrowthChart() {
  const [data, setData] = useState<Membership[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/membership')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => console.error('Membership fetch error:', err));
  }, []);

  const maxMembers = Math.max(...data.map((item) => item.members), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership Growth</CardTitle>
        <CardDescription>Total active members over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.length === 0 && <p className="text-sm text-muted-foreground">No membership data available.</p>}
          {data.map((item, index) => {
            const height = (item.members / maxMembers) * 100;
            const prevValue =
              index > 0 ? data[index - 1].members : item.members;
            const growth = item.members - prevValue;
            const isPositive = growth >= 0;

            return (
              <div key={index} className="flex items-end gap-4">
                <div className="w-12 text-sm font-medium">{item.month}</div>
                <div className="flex-1 flex items-end">
                  <div className="bg-muted rounded-t h-20 w-full flex items-end">
                    <div
                      className="bg-primary rounded-t w-full transition-all duration-500"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right">
                  <div className="text-sm font-medium">{item.members}</div>
                  {index > 0 && (
                    <div
                      className={`text-xs ${
                        isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {growth}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function StatsChart({
  data,
  dataKey,
  nameKey,
  color,
}: StatsChartProps) {
  const maxValue = Math.max(...data.map((item) => item[dataKey]), 1);

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const height = (item[dataKey] / maxValue) * 100;

        return (
          <div key={index} className="flex items-end gap-4">
            <div className="w-16 text-sm font-medium">{item[nameKey]}</div>
            <div className="flex-1 flex items-end">
              <div className="bg-muted rounded-t h-16 w-full flex items-end">
                <div
                  className="rounded-t w-full transition-all duration-500"
                  style={{
                    height: `${height}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
            <div className="w-12 text-right text-sm font-medium">
              {item[dataKey]}
            </div>
          </div>
        );
      })}
    </div>
  );
}