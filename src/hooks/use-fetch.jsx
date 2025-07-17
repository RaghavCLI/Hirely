import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { session } = useSession();
  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Session status:", {
        sessionExists: !!session,
        sessionId: session?.id,
        status: session?.status,
      });

      if (!session) {
        throw new Error(
          "No active session found - user may not be authenticated"
        );
      }

      console.log("Requesting Supabase token...");
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      console.log("Token received:", !!supabaseAccessToken);

      if (!supabaseAccessToken) {
        throw new Error(
          "Failed to get Supabase access token - check JWT template configuration"
        );
      }

      const response = await cb(supabaseAccessToken, options, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      console.error("useFetch error details:", {
        message: error.message,
        stack: error.stack,
        clerk_trace_id: error.clerk_trace_id,
      });
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
