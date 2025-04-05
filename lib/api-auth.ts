/**
 * Fetches an access token for the external API
 * @param additionalParams Any additional parameters needed for the token request
 * @returns The access token response
 */
export async function getExternalApiToken(additionalParams = {}) {
  try {
    const response = await fetch("/api/auth/external-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(additionalParams),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Failed to get API token")
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting API token:", error)
    throw error
  }
}

/**
 * Makes an authenticated request to the external API
 * @param endpoint The API endpoint to call
 * @param options Fetch options
 * @returns The API response
 */
export async function callExternalApi(endpoint: string, options: RequestInit = {}) {
  try {
    // Get the token
    const { access_token, token_type } = await getExternalApiToken()

    // Prepare headers
    const headers = new Headers(options.headers || {})
    headers.set("Authorization", `${token_type} ${access_token}`)

    // Make the authenticated request
    const response = await fetch(` https://api.openai.com/v1/models${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error calling external API:", error)
    throw error
  }
}

