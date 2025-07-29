import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hubId = parseInt(params.id);
    
    const hub = await prisma.digitalHub.findUnique({
      where: { id: hubId },
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
    
    if (!hub) {
      return NextResponse.json(
        { error: "Hub not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(hub);
  } catch (error) {
    console.error("Error fetching hub:", error);
    return NextResponse.json(
      { error: "Failed to fetch hub" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hubId = parseInt(params.id);
    const data = await request.json();
    
    const updatedHub = await prisma.digitalHub.update({
      where: { id: hubId },
      data: {
        name: data.name,
        location: data.location,
        latitude: data.latitude ? parseFloat(data.latitude) : null,
        longitude: data.longitude ? parseFloat(data.longitude) : null,
        managerId: data.managerId ? parseInt(data.managerId) : null,
        status: data.status,
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
    
    return NextResponse.json(updatedHub);
  } catch (error) {
    console.error("Error updating hub:", error);
    return NextResponse.json(
      { error: "Failed to update hub" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hubId = parseInt(params.id);
    
    await prisma.digitalHub.delete({
      where: { id: hubId },
    });
    
    return NextResponse.json({ message: "Hub deleted successfully" });
  } catch (error) {
    console.error("Error deleting hub:", error);
    return NextResponse.json(
      { error: "Failed to delete hub" },
      { status: 500 }
    );
  }
}
