import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function Summary() {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        // Replace with the correct URL of your backend
        const response = await axios.get("http://localhost:3000/summary");
        setSummary(response.data.summary);
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Failed to fetch summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Conversation Summary</h2>
      <Card className="mt-4">
        <CardContent>
          {loading ? (
            <p>Loading summary...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : summary ? (
            <>
              <p>
                <strong>Summary:</strong>
              </p>
              <p>{summary}</p>
            </>
          ) : (
            <p>No summary available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
