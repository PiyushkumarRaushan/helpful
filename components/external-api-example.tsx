"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { callExternalApi } from "@/lib/api-auth"

export default function ExternalApiExample() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Call the external API using our utility function
      const result = await callExternalApi("/some-endpoint", {
        method: "GET",
      })

      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>External API Data</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-md mb-4">Error: {error}</div>}

        <Button onClick={fetchData} disabled={loading}>
          {loading ? "Loading..." : "Fetch Data"}
        </Button>

        {data && (
          <div className="mt-4">
            <pre className="bg-slate-100 p-4 rounded-md overflow-auto">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

