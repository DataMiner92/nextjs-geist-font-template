"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import ExportReport from "@/components/ExportReport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ImpactMetric {
  id: number;
  hubId?: number;
  youthsTrained: number;
  youthsEarning: number;
  impactStories: number;
  skillsOffered?: string;
  ageGroup?: string;
  gender?: string;
  period: string;
  recordedAt: string;
}

interface ImpactTotals {
  youthsTrained: number;
  youthsEarning: number;
  impactStories: number;
}

const ImpactTrackingPage = () => {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [totals, setTotals] = useState<ImpactTotals>({
    youthsTrained: 0,
    youthsEarning: 0,
    impactStories: 0,
  });
  const [hubs, setHubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [periodFilter, setPeriodFilter] = useState("all");
  const [ageGroupFilter, setAgeGroupFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");

  const [formData, setFormData] = useState({
    hubId: "",
    youthsTrained: "",
    youthsEarning: "",
    impactStories: "",
    skillsOffered: "",
    ageGroup: "18-25",
    gender: "mixed",
    period: "monthly",
  });

  useEffect(() => {
    fetchMetrics();
    fetchHubs();
  }, [periodFilter]);

  const fetchMetrics = async () => {
    try {
      const params = new URLSearchParams();
      if (periodFilter !== "all") {
        params.append("period", periodFilter);
      }
      
      const response = await fetch(`/api/impact?${params}`);
      const data = await response.json();
      setMetrics(data.metrics || []);
      setTotals(data.totals || { youthsTrained: 0, youthsEarning: 0, impactStories: 0 });
    } catch (error) {
      console.error("Error fetching impact metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHubs = async () => {
    try {
      const response = await fetch("/api/hubs");
      const data = await response.json();
      setHubs(data);
    } catch (error) {
      console.error("Error fetching hubs:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/impact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchMetrics();
        setIsDialogOpen(false);
        resetForm();
      } else {
        console.error("Error saving impact metric");
      }
    } catch (error) {
      console.error("Error saving impact metric:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      hubId: "",
      youthsTrained: "",
      youthsEarning: "",
      impactStories: "",
      skillsOffered: "",
      ageGroup: "18-25",
      gender: "mixed",
      period: "monthly",
    });
  };

  const filteredMetrics = metrics.filter((metric) => {
    const matchesAgeGroup = ageGroupFilter === "all" || metric.ageGroup === ageGroupFilter;
    const matchesGender = genderFilter === "all" || metric.gender === genderFilter;
    return matchesAgeGroup && matchesGender;
  });

  // Chart data
  const monthlyTrends = metrics
    .filter(m => m.period === "monthly")
    .slice(-6)
    .map(m => ({
      month: new Date(m.recordedAt).toLocaleDateString('en-US', { month: 'short' }),
      trained: m.youthsTrained,
      earning: m.youthsEarning,
      stories: m.impactStories,
    }));

  const ageGroupData = [
    { name: "18-25", value: metrics.filter(m => m.ageGroup === "18-25").reduce((sum, m) => sum + m.youthsTrained, 0) },
    { name: "26-35", value: metrics.filter(m => m.ageGroup === "26-35").reduce((sum, m) => sum + m.youthsTrained, 0) },
    { name: "36+", value: metrics.filter(m => m.ageGroup === "36+").reduce((sum, m) => sum + m.youthsTrained, 0) },
  ];

  const genderData = [
    { name: "Male", value: metrics.filter(m => m.gender === "male").reduce((sum, m) => sum + m.youthsTrained, 0), color: "#3b82f6" },
    { name: "Female", value: metrics.filter(m => m.gender === "female").reduce((sum, m) => sum + m.youthsTrained, 0), color: "#ec4899" },
    { name: "Mixed", value: metrics.filter(m => m.gender === "mixed").reduce((sum, m) => sum + m.youthsTrained, 0), color: "#10b981" },
  ];

  const successRate = totals.youthsTrained > 0 ? (totals.youthsEarning / totals.youthsTrained) * 100 : 0;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading impact metrics...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Impact Tracking</h1>
            <p className="text-muted-foreground">
              Monitor KPIs, youth training outcomes, and success stories
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>Add Impact Record</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Impact Record</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="hubId">Hub (Optional)</Label>
                  <Select value={formData.hubId} onValueChange={(value) => setFormData({ ...formData, hubId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a hub" />
                    </SelectTrigger>
                    <SelectContent>
                      {hubs.map((hub) => (
                        <SelectItem key={hub.id} value={hub.id.toString()}>
                          {hub.name} - {hub.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="youthsTrained">Youth Trained</Label>
                  <Input
                    id="youthsTrained"
                    type="number"
                    value={formData.youthsTrained}
                    onChange={(e) => setFormData({ ...formData, youthsTrained: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="youthsEarning">Youth Started Earning</Label>
                  <Input
                    id="youthsEarning"
                    type="number"
                    value={formData.youthsEarning}
                    onChange={(e) => setFormData({ ...formData, youthsEarning: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="impactStories">Impact Stories</Label>
                  <Input
                    id="impactStories"
                    type="number"
                    value={formData.impactStories}
                    onChange={(e) => setFormData({ ...formData, impactStories: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="ageGroup">Age Group</Label>
                  <Select value={formData.ageGroup} onValueChange={(value) => setFormData({ ...formData, ageGroup: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25 years</SelectItem>
                      <SelectItem value="26-35">26-35 years</SelectItem>
                      <SelectItem value="36+">36+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="period">Period</Label>
                  <Select value={formData.period} onValueChange={(value) => setFormData({ ...formData, period: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="skillsOffered">Skills Offered</Label>
                  <Input
                    id="skillsOffered"
                    value={formData.skillsOffered}
                    onChange={(e) => setFormData({ ...formData, skillsOffered: e.target.value })}
                    placeholder="e.g., Web Development, Digital Marketing"
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Record</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Youth Trained</CardTitle>
              <span className="text-2xl">👥</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totals.youthsTrained.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Ages 18-35 years</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Started Earning</CardTitle>
              <span className="text-2xl">💰</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totals.youthsEarning.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {successRate.toFixed(1)}% success rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impact Stories</CardTitle>
              <span className="text-2xl">📖</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totals.impactStories}</div>
              <p className="text-xs text-muted-foreground">Success stories documented</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <span className="text-2xl">📈</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Training to earning conversion</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Impact Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="trained" stroke="#3b82f6" strokeWidth={2} name="Trained" />
                  <Line type="monotone" dataKey="earning" stroke="#10b981" strokeWidth={2} name="Earning" />
                  <Line type="monotone" dataKey="stories" stroke="#f59e0b" strokeWidth={2} name="Stories" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gender Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Age Group Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Age Group Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageGroupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div>
                <Label htmlFor="period-filter">Period</Label>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Periods</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="age-filter">Age Group</Label>
                <Select value={ageGroupFilter} onValueChange={setAgeGroupFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="18-25">18-25 years</SelectItem>
                    <SelectItem value="26-35">26-35 years</SelectItem>
                    <SelectItem value="36+">36+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gender-filter">Gender</Label>
                <Select value={genderFilter} onValueChange={setGenderFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Report */}
        <ExportReport data={filteredMetrics} title="Impact Metrics Report" type="impact" />

        {/* Metrics Table */}
        <Card>
          <CardHeader>
            <CardTitle>Impact Records ({filteredMetrics.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Youth Trained</TableHead>
                  <TableHead>Started Earning</TableHead>
                  <TableHead>Impact Stories</TableHead>
                  <TableHead>Age Group</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Skills</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMetrics.map((metric) => (
                  <TableRow key={metric.id}>
                    <TableCell>
                      {new Date(metric.recordedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="capitalize">{metric.period}</TableCell>
                    <TableCell className="font-medium">{metric.youthsTrained}</TableCell>
                    <TableCell className="font-medium">{metric.youthsEarning}</TableCell>
                    <TableCell>{metric.impactStories}</TableCell>
                    <TableCell>{metric.ageGroup || "N/A"}</TableCell>
                    <TableCell className="capitalize">{metric.gender || "N/A"}</TableCell>
                    <TableCell>{metric.skillsOffered || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ImpactTrackingPage;
