import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Get client ID and secret from environment variables
    const clientId = process.env.EXTERNAL_API_CLIENT_ID
    const clientSecret = process.env.EXTERNAL_API_CLIENT_SECRET

    // Ensure credentials exist
    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "API credentials not configured" }, { status: 500 })
    }

    // Get request body (if any additional parameters are needed)
    const body = await request.json().catch(() => ({}))

    // Prepare authentication request to the external API
    const authResponse = await fetch("https://api.openai.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        ...body, // Include any additional parameters from the request
      }),
    })

    if (!authResponse.ok) {
      const errorData = await authResponse.json().catch(() => ({}))
      console.error("External API authentication failed:", errorData)
      return NextResponse.json({ error: "Failed to authenticate with external API" }, { status: authResponse.status })
    }

    // Get the token response
    const tokenData = await authResponse.json()

    // Return the access token (and any other relevant data)
    // Note: We're not returning the client secret back to the client
    return NextResponse.json({
      access_token: tokenData.access_token,
      expires_in: tokenData.expires_in,
      token_type: tokenData.token_type,
    })
  } catch (error) {
    console.error("Error in external API authentication:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

