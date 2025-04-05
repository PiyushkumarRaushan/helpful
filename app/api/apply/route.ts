import { NextResponse } from "next/server"
import { applyForOpportunity } from "@/lib/database"

export async function POST(request: Request) {
  try {
    const { opportunityId, volunteerId, message } = await request.json()

    if (!opportunityId || !volunteerId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const success = await applyForOpportunity(opportunityId, volunteerId, message)

    if (!success) {
      return NextResponse.json({ error: "Failed to apply for opportunity" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in apply API:", error)
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 })
  }
}

