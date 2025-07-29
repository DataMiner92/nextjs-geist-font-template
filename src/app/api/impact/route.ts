import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period');
    const hubId = searchParams.get('hubId');
    
    const whereClause: any = {};
    
    if (period) {
      whereClause.period = period;
    }
    
    if (hubId) {
      whereClause.hubId = parseInt(hubId);
    }
    
    const metrics = await prisma.impactMetric.findMany({
      where: whereClause,
      orderBy: {
        recordedAt: 'desc',
      },
    });
    
    // Calculate totals
    const totals = await prisma.impactMetric.aggregate({
      where: whereClause,
      _sum: {
        youthsTrained: true,
        youthsEarning: true,
        impactStories: true,
      },
    });
    
    return NextResponse.json({
      metrics,
      totals: {
        youthsTrained: totals._sum.youthsTrained || 0,
        youthsEarning: totals._sum.youthsEarning || 0,
        impactStories: totals._sum.impactStories || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching impact metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch impact metrics" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const newMetric = await prisma.impactMetric.create({
      data: {
        hubId: data.hubId ? parseInt(data.hubId) : null,
        youthsTrained: parseInt(data.youthsTrained) || 0,
        youthsEarning: parseInt(data.youthsEarning) || 0,
        impactStories: parseInt(data.impactStories) || 0,
        skillsOffered: data.skillsOffered,
        ageGroup: data.ageGroup,
        gender: data.gender,
        period: data.period || "monthly",
      },
    });
    
    return NextResponse.json(newMetric, { status: 201 });
  } catch (error) {
    console.error("Error creating impact metric:", error);
    return NextResponse.json(
      { error: "Failed to create impact metric" },
      { status: 500 }
    );
  }
}
