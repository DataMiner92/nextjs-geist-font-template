"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface DashboardStats {
  totalHubs: number;
  activeHubs: number;
  totalUsers: number;
  totalAssets: number;
  youthsTrained: number;
  youthsEarning: number;
  impactStories: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalHubs: 0,
    activeHubs: 0,
    totalUsers: 0,
    totalAssets: 0,
    youthsTrained: 0,
    youthsEarning: 0,
    impactStories: 0,
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [hubsRes, usersRes, assetsRes, impactRes] = await Promise.all([
          fetch("/api/hubs"),
          fetch("/api/users"),
          fetch("/api/assets"),
          fetch("/api/impact"),
        ]);

        const hubs = await hubsRes.json();
        const users = await usersRes.json();
        const assets = await assetsRes.json();
        const impact = await impactRes.json();

        setStats({
          totalHubs: hubs.length,
          activeHubs: hubs.filter((hub: any) => hub.status === "active").length,
          totalUsers: users.length,
          totalAssets: assets.length,
          youthsTrained: impact.totals?.youthsTrained || 0,
          youthsEarning: impact.totals?.youthsEarning || 0,
          impactStories: impact.totals?.impactStories || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Sample data for charts
  const monthlyData = [
    { month: "Jan", trained: 450, earning: 320, stories: 25 },
    { month: "Feb", trained: 520, earning: 380, stories: 32 },
    { month: "Mar", trained: 480, earning: 420, stories: 28 },
    { month: "Apr", trained: 600, earning: 480, stories: 35 },
    { month: "May", trained: 580, earning: 520, stories: 40 },
    { month: "Jun", trained: 650, earning: 580, stories: 45 },
  ];

  const hubStatusData = [
    { name: "Active", value: stats.activeHubs, color: "#22c55e" },
    { name: "Inactive", value: stats.totalHubs - stats.activeHubs, color: "#ef4444" },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of digital hub management system performance and impact
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hubs</CardTitle>
              <span className="text-2xl">🏢</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHubs}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeHubs} active hubs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Youth Trained</CardTitle>
              <span className="text-2xl">👥</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.youthsTrained.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Ages 18-35 years
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Started Earning</CardTitle>
              <span className="text-2xl">💰</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.youthsEarning.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.youthsEarning / stats.youthsTrained) * 100).toFixed(1)}% success rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impact Stories</CardTitle>
              <span className="text-2xl">📖</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.impactStories}</div>
              <p className="text-xs text-muted-foreground">
                Success stories documented
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Impact Trends</CardTitle>
              <CardDescription>
                Youth training and earning progression over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="trained" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Youth Trained"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earning" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Started Earning"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hub Status Distribution</CardTitle>
              <CardDescription>
                Current status of all digital hubs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={hubStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {hubStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance Overview</CardTitle>
            <CardDescription>
              Comprehensive view of training outcomes and impact stories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="trained" fill="#3b82f6" name="Youth Trained" />
                <Bar dataKey="earning" fill="#10b981" name="Started Earning" />
                <Bar dataKey="stories" fill="#f59e0b" name="Impact Stories" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-muted rounded">
                Add New Hub
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded">
                Register User
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded">
                Generate Report
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Database</span>
                  <span className="text-green-600">✓ Online</span>
                </div>
                <div className="flex justify-between">
                  <span>API Services</span>
                  <span className="text-green-600">✓ Running</span>
                </div>
                <div className="flex justify-between">
                  <span>Backup Status</span>
                  <span className="text-green-600">✓ Current</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>New hub registered in Lagos</div>
                <div>25 youth completed training</div>
                <div>Impact report generated</div>
                <div>Asset inventory updated</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
