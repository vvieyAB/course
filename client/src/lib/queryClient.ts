import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

type FetchOptions = {
  on401?: "returnNull" | "throw";
};

type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Utility function for API requests
export async function apiRequest(
  method: ApiRequestMethod,
  endpoint: string,
  body?: any
): Promise<Response> {
  // Handle relative URLs
  const url = endpoint.startsWith("/") ? `${endpoint}` : `/${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies in the request
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  try {
    return await fetch(url, options);
  } catch (error) {
    console.error(`API request failed (${method} ${url}):`, error);
    throw error;
  }
}

// Reusable query function for TanStack Query
export function getQueryFn(options: FetchOptions = {}) {
  return async function queryFn({ queryKey }: { queryKey: (string | number)[] }) {
    // Ensure queryKey is always treated as an array to prevent 'never' type issues
    const key = Array.isArray(queryKey) ? queryKey : [queryKey];
    const url = key.join("/");
    
    try {
      const response = await apiRequest("GET", url);
      
      if (!response.ok) {
        if (response.status === 401 && options.on401 === "returnNull") {
          return null;
        }
        
        let errorMessage = `API request failed with status ${response.status}`;
        
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // If we can't parse JSON, just use the status text
          errorMessage = response.statusText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Query failed (${url}):`, error);
      throw error;
    }
  };
}