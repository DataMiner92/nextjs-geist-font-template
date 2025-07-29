"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import ExportReport from "@/components/ExportReport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ReportData {
  hubs: any[];
  users: any[];
  assets: any[];
  impact: any[];
}

const ReportsPage = () => {
  const [reportData, setReportData] = useState<ReportData>({
    hubs: [],
    users: [],
    assets: [],
    impact: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedReportType, setSelectedReportType] = useState("summary");
  const [generatedReports, setGeneratedReports] = useState<any[]>([]);

  useEffect(() => {
    fetchAllData();
    fetchGeneratedReports();
  }, []);

  const fetchAllData = async () => {
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

      setReportData({
        hubs,
        users,
        assets,
        impact: impact.metrics || [],
      });
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGeneratedReports = async () => {
    // This would typically fetch from a reports API endpoint
    // For now, we'll simulate some generated reports
    setGeneratedReports([
      {
        id: 1,
        title: "Monthly Hub Summary",
        type: "hub_summary",
        format: "pdf",
        generatedBy: "Admin",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Impact Assessment Q4",
        type: "impact_report",
        format: "excel",
        generatedBy: "Manager",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ]);
  };

  const generateCustomReport = () => {
    const reportTitle = `${selectedReportType.charAt(0).toUpperCase() + selectedReportType.slice(1)} Report`;
    
    // Add to generated reports list
    const newReport = {
      id: generatedReports.length + 1,
      title: reportTitle,
      type: selectedReportType,
      format: "multiple",
      generatedBy: "Current User",
      createdAt: new Date().toISOString(),
    };
    
    setGeneratedReports([newReport, ...generatedReports]);
  };

  const getReportData = () => {
    switch (selectedReportType) {
      case "hubs":
        return reportData.hubs;
      case "users":
        return reportData.users;
      case "assets":
        return reportData.assets;
      case "impact":
        return reportData.impact;
      case "summary":
      default:
        return [
          {
            category: "Digital Hubs",
            total: reportData.hubs.length,
            active: reportData.hubs.filter(h => h.status === "active").length,
            details: `${reportData.hubs.length} total hubs across various locations`,
          },
          {
            category: "Users",
            total: reportData.users.length,
            active: reportData.users.filter(u => u.role !== "viewer").length,
            details: `${reportData.users.filter(u => u.role === "admin").length} admins, ${reportData.users.filter(u => u.role === "manager").length} managers`,
          },
          {
            category: "Assets",
            total: reportData.assets.length,
            active: reportData.assets.filter(a => a.status === "active").length,
            details: `${reportData.assets.filter(a => a.status === "maintenance").length} in maintenance, ${reportData.assets.filter(a => a.status === "broken").length} broken`,
          },
          {
            category: "Impact Metrics",
            total: reportData.impact.length,
            active: reportData.impact.reduce((sum, i) => sum + i.youthsTrained, 0),
            details: `${reportData.impact.reduce((sum, i) => sum + i.youthsEarning, 0)} youth started earning`,
          },
        ];
    }
  };

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case "hub_summary":
        return "Hub Summary";
      case "impact_report":
        return "Impact Report";
      case "asset_report":
        return "Asset Report";
      case "user_report":
        return "User Report";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const getFormatBadgeColor = (format: string) => {
    switch (format) {
      case "pdf":
        return "bg-red-100 text-red-800";
      case "excel":
        return "bg-green-100 text-green-800";
      case "word":
        return "bg-blue-100 text-blue-800";
      case "multiple":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading reports...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            Generate and export comprehensive reports in various formats
          </p>
        </div>

        {/* Report Generation */}
        <Card>
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Report Type</label>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">System Summary</SelectItem>
                    <SelectItem value="hubs">Digital Hubs</SelectItem>
                    <SelectItem value="users">Users</SelectItem>
                    <SelectItem value="assets">Assets</SelectItem>
                    <SelectItem value="impact">Impact Metrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={generateCustomReport}>
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <ExportReport 
          data={getReportData()} 
          title={`${selectedReportType.charAt(0).toUpperCase() + selectedReportType.slice(1)} Report`}
          type={selectedReportType as any}
        />

        {/* Report Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Report Preview - {selectedReportType.charAt(0).toUpperCase() + selectedReportType.slice(1)}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedReportType === "summary" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getReportData().map((item: any, index: number) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{item.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="font-semibold">{item.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active:</span>
                          <span className="font-semibold">{item.active}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.details}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="max-h-96 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {selectedReportType === "hubs" && (
                        <>
                          <TableHead>Name</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Manager</TableHead>
                          <TableHead>Assets</TableHead>
                        </>
                      )}
                      {selectedReportType === "users" && (
                        <>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Managed Hubs</TableHead>
                        </>
                      )}
                      {selectedReportType === "assets" && (
                        <>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Hub</TableHead>
                          <TableHead>Status</TableHead>
                        </>
                      )}
                      {selectedReportType === "impact" && (
                        <>
                          <TableHead>Date</TableHead>
                          <TableHead>Youth Trained</TableHead>
                          <TableHead>Started Earning</TableHead>
                          <TableHead>Impact Stories</TableHead>
                          <TableHead>Period</TableHead>
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getReportData().slice(0, 10).map((item: any, index: number) => (
                      <TableRow key={index}>
                        {selectedReportType === "hubs" && (
                          <>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>
                              <Badge className={item.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{item.manager?.name || "Unassigned"}</TableCell>
                            <TableCell>{item.assets?.length || 0}</TableCell>
                          </>
                        )}
                        {selectedReportType === "users" && (
                          <>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                              <Badge>{item.role}</Badge>
                            </TableCell>
                            <TableCell>{item.managedHubs?.length || 0}</TableCell>
                          </>
                        )}
                        {selectedReportType === "assets" && (
                          <>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="capitalize">{item.type}</TableCell>
                            <TableCell>{item.hub?.name}</TableCell>
                            <TableCell>
                              <Badge className={item.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                {item.status}
                              </Badge>
                            </TableCell>
                          </>
                        )}
                        {selectedReportType === "impact" && (
                          <>
                            <TableCell>{new Date(item.recordedAt).toLocaleDateString()}</TableCell>
                            <TableCell>{item.youthsTrained}</TableCell>
                            <TableCell>{item.youthsEarning}</TableCell>
                            <TableCell>{item.impactStories}</TableCell>
                            <TableCell className="capitalize">{item.period}</TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {getReportData().length > 10 && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Showing first 10 of {getReportData().length} records
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Reports History */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Reports History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Generated By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generatedReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{getReportTypeLabel(report.type)}</TableCell>
                    <TableCell>
                      <Badge className={getFormatBadgeColor(report.format)}>
                        {report.format.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.generatedBy}</TableCell>
                    <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <span className="text-2xl">📊</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{generatedReports.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <span className="text-2xl">📅</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {generatedReports.filter(r => 
                  new Date(r.createdAt).getMonth() === new Date().getMonth()
                ).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
              <span className="text-2xl">⭐</span>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Impact Reports</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Formats Used</CardTitle>
              <span className="text-2xl">📄</span>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <div>PDF: {generatedReports.filter(r => r.format === "pdf").length}</div>
                <div>Excel: {generatedReports.filter(r => r.format === "excel").length}</div>
                <div>Multiple: {generatedReports.filter(r => r.format === "multiple").length}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
