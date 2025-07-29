import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hubs = await prisma.digitalHub.findMany({
      include: {
        assets: true,
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(hubs);
  } catch (error) {
    console.error("Error fetching hubs:", error);
    return NextResponse.json(
      { error: "Failed to fetch hubs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const newHub = await prisma.digitalHub.create({
      data: {
        name: data.name,
        location: data.location,
        latitude: data.latitude ? parseFloat(data.latitude) : null,
        longitude: data.longitude ? parseFloat(data.longitude) : null,
        managerId: data.managerId ? parseInt(data.managerId) : null,
        status: data.status || "active",
        description: data.description,
      },
      include: {
        assets: true,
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    return NextResponse.json(newHub, { status: 201 });
  } catch (error) {
    console.error("Error creating hub:", error);
    return NextResponse.json(
      { error: "Failed to create hub" },
      { status: 500 }
    );
  }
}
