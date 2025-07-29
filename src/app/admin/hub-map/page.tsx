"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface DigitalHub {
  id: number;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  status: string;
  description?: string;
  manager?: {
    name: string;
    email: string;
  };
  assets: any[];
}

const HubMapPage = () => {
  const [hubs, setHubs] = useState<DigitalHub[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHub, setSelectedHub] = useState<DigitalHub | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([6.5244, 3.3792]); // Lagos, Nigeria

  useEffect(() => {
    fetchHubs();
  }, []);

  const fetchHubs = async () => {
    try {
      const response = await fetch("/api/hubs");
      const data = await response.json();
      setHubs(data);
      
      // Set map center to the first hub with coordinates, or use default
      const hubWithCoords = data.find((hub: DigitalHub) => hub.latitude && hub.longitude);
      if (hubWithCoords) {
        setMapCenter([hubWithCoords.latitude!, hubWithCoords.longitude!]);
      }
    } catch (error) {
      console.error("Error fetching hubs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const hubsWithCoordinates = hubs.filter(hub => hub.latitude && hub.longitude);
  const hubsWithoutCoordinates = hubs.filter(hub => !hub.latitude || !hub.longitude);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading hub map...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Hub Map</h1>
          <p className="text-muted-foreground">
            Geographic visualization of digital hubs and their locations
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hubs</CardTitle>
              <span className="text-2xl">🏢</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hubs.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mapped Hubs</CardTitle>
              <span className="text-2xl">📍</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hubsWithCoordinates.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Hubs</CardTitle>
              <span className="text-2xl">✅</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hubs.filter(hub => hub.status === "active").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <span className="text-2xl">💻</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hubs.reduce((total, hub) => total + hub.assets.length, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Hub Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full rounded-lg overflow-hidden">
                {typeof window !== "undefined" && (
                  <MapContainer
                    center={mapCenter}
                    zoom={10}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {hubsWithCoordinates.map((hub) => (
                      <Marker
                        key={hub.id}
                        position={[hub.latitude!, hub.longitude!]}
                        eventHandlers={{
                          click: () => setSelectedHub(hub),
                        }}
                      >
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-semibold">{hub.name}</h3>
                            <p className="text-sm text-gray-600">{hub.location}</p>
                            <div className="mt-2">
                              <Badge className={getStatusColor(hub.status)}>
                                {hub.status}
                              </Badge>
                            </div>
                            {hub.manager && (
                              <p className="text-sm mt-1">
                                Manager: {hub.manager.name}
                              </p>
                            )}
                            <p className="text-sm">Assets: {hub.assets.length}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Hub Details */}
          <Card>
            <CardHeader>
              <CardTitle>Hub Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedHub ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedHub.name}</h3>
                    <p className="text-muted-foreground">{selectedHub.location}</p>
                  </div>
                  
                  <div>
                    <Badge className={getStatusColor(selectedHub.status)}>
                      {selectedHub.status}
                    </Badge>
                  </div>

                  {selectedHub.description && (
                    <div>
                      <h4 className="font-medium">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedHub.description}
                      </p>
                    </div>
                  )}

                  {selectedHub.manager && (
                    <div>
                      <h4 className="font-medium">Manager</h4>
                      <p className="text-sm">{selectedHub.manager.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedHub.manager.email}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium">Assets</h4>
                    <p className="text-sm">{selectedHub.assets.length} assets</p>
                  </div>

                  {selectedHub.latitude && selectedHub.longitude && (
                    <div>
                      <h4 className="font-medium">Coordinates</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedHub.latitude.toFixed(6)}, {selectedHub.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Click on a hub marker to view details
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Hubs without coordinates */}
        {hubsWithoutCoordinates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Hubs Without Coordinates</CardTitle>
              <p className="text-sm text-muted-foreground">
                These hubs need location coordinates to appear on the map
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hubsWithoutCoordinates.map((hub) => (
                  <div key={hub.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{hub.name}</h3>
                    <p className="text-sm text-muted-foreground">{hub.location}</p>
                    <div className="mt-2">
                      <Badge className={getStatusColor(hub.status)}>
                        {hub.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default HubMapPage;
