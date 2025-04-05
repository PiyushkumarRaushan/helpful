import { NextResponse } from "next/server"
import { getOpportunities } from "@/lib/database"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Extract filter parameters
  const location = searchParams.get("location") || undefined
  const category = searchParams.get("category") || undefined
  const distance = searchParams.get("distance") ? Number.parseInt(searchParams.get("distance")!) : undefined
  const skills = searchParams.get("skills") ? searchParams.get("skills")!.split(",") : undefined
  const commitment = searchParams.get("commitment") || undefined

  try {
    const opportunities = await getOpportunities({
      location,
      category,
      distance,
      skills,
      commitment,
    })

    return NextResponse.json(opportunities)
  } catch (error) {
    console.error("Error in opportunities API:", error)
    return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: 500 })
  }
}

