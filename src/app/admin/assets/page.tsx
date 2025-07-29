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
import { Badge } from "@/components/ui/badge";

interface Asset {
  id: number;
  name: string;
  type: string;
  model?: string;
  serialNumber?: string;
  status: string;
  hubId: number;
  hub: {
    id: number;
    name: string;
    location: string;
  };
  purchaseDate?: string;
  warrantyExpiry?: string;
  createdAt: string;
}

interface DigitalHub {
  id: number;
  name: string;
  location: string;
}

const AssetsPage = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [hubs, setHubs] = useState<DigitalHub[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hubFilter, setHubFilter] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    type: "computer",
    model: "",
    serialNumber: "",
    status: "active",
    hubId: "",
    purchaseDate: "",
    warrantyExpiry: "",
  });

  const assetTypes = [
    "computer", "laptop", "router", "printer", "projector", 
    "tablet", "smartphone", "server", "switch", "modem", "other"
  ];

  useEffect(() => {
    fetchAssets();
    fetchHubs();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await fetch("/api/assets");
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error("Error fetching assets:", error);
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
      const url = editingAsset ? `/api/assets/${editingAsset.id}` : "/api/assets";
      const method = editingAsset ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchAssets();
        setIsDialogOpen(false);
        resetForm();
      } else {
        console.error("Error saving asset");
      }
    } catch (error) {
      console.error("Error saving asset:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this asset?")) {
      try {
        const response = await fetch(`/api/assets/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await fetchAssets();
        } else {
          console.error("Error deleting asset");
        }
      } catch (error) {
        console.error("Error deleting asset:", error);
      }
    }
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setFormData({
      name: asset.name,
      type: asset.type,
      model: asset.model || "",
      serialNumber: asset.serialNumber || "",
      status: asset.status,
      hubId: asset.hubId.toString(),
      purchaseDate: asset.purchaseDate ? asset.purchaseDate.split('T')[0] : "",
      warrantyExpiry: asset.warrantyExpiry ? asset.warrantyExpiry.split('T')[0] : "",
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "computer",
      model: "",
      serialNumber: "",
      status: "active",
      hubId: "",
      purchaseDate: "",
      warrantyExpiry: "",
    });
    setEditingAsset(null);
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.hub.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || asset.type === typeFilter;
    const matchesStatus = statusFilter === "all" || asset.status === statusFilter;
    const matchesHub = hubFilter === "all" || asset.hubId.toString() === hubFilter;
    return matchesSearch && matchesType && matchesStatus && matchesHub;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "broken":
        return "bg-red-100 text-red-800";
      case "retired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "computer":
      case "laptop":
        return "💻";
      case "router":
      case "switch":
      case "modem":
        return "🌐";
      case "printer":
        return "🖨️";
      case "projector":
        return "📽️";
      case "tablet":
        return "📱";
      case "smartphone":
        return "📱";
      case "server":
        return "🖥️";
      default:
        return "⚙️";
    }
  };

  // Statistics
  const totalAssets = assets.length;
  const activeAssets = assets.filter(a => a.status === "active").length;
  const maintenanceAssets = assets.filter(a => a.status === "maintenance").length;
  const brokenAssets = assets.filter(a => a.status === "broken").length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading assets...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Asset Management</h1>
            <p className="text-muted-foreground">
              Manage digital hub assets including computers, routers, and equipment
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>Add New Asset</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingAsset ? "Edit Asset" : "Add New Asset"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Asset Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {assetTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {getTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="hubId">Hub</Label>
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
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input
                    id="serialNumber"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="broken">Broken</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="warrantyExpiry">Warranty Expiry</Label>
                  <Input
                    id="warrantyExpiry"
                    type="date"
                    value={formData.warrantyExpiry}
                    onChange={(e) => setFormData({ ...formData, warrantyExpiry: e.target.value })}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingAsset ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <span className="text-2xl">📦</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAssets}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <span className="text-2xl">✅</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeAssets}</div>
              <p className="text-xs text-muted-foreground">
                {totalAssets > 0 ? ((activeAssets / totalAssets) * 100).toFixed(1) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
              <span className="text-2xl">🔧</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{maintenanceAssets}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Broken</CardTitle>
              <span className="text-2xl">❌</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brokenAssets}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="type-filter">Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {assetTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status-filter">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="broken">Broken</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hub-filter">Hub</Label>
                <Select value={hubFilter} onValueChange={setHubFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Hubs</SelectItem>
                    {hubs.map((hub) => (
                      <SelectItem key={hub.id} value={hub.id.toString()}>
                        {hub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Report */}
        <ExportReport data={filteredAssets} title="Assets Report" type="assets" />

        {/* Assets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Assets ({filteredAssets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Hub</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Warranty</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getTypeIcon(asset.type)}</span>
                        <span>{asset.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{asset.type}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{asset.hub.name}</div>
                        <div className="text-sm text-muted-foreground">{asset.hub.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(asset.status)}>
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{asset.model || "N/A"}</TableCell>
                    <TableCell>{asset.serialNumber || "N/A"}</TableCell>
                    <TableCell>
                      {asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString() : "N/A"}
                    </TableCell>
                    <TableCell>
                      {asset.warrantyExpiry ? (
                        <div>
                          {new Date(asset.warrantyExpiry).toLocaleDateString()}
                          {new Date(asset.warrantyExpiry) < new Date() && (
                            <div className="text-xs text-red-600">Expired</div>
                          )}
                        </div>
                      ) : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(asset)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(asset.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
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

export default AssetsPage;
