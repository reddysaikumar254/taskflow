import { QueryClient } from "@tanstack/react-query";

// Utility: Throw error if response is not OK
async function throwIfResNotOk(res) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Generic API request function
export async function apiRequest(method, url, data) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

/**
 * Create a React Query fetcher
 * Example use:
 * const queryFn = getQueryFn({ unauthorizedBehavior: "returnNull" });
 */
export function getQueryFn({ unauthorizedBehavior = "throw" } = {}) {
  return async ({ queryKey }) => {
    const url = queryKey.join("/");
    const res = await fetch(url, { credentials: "include" });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };
}

// Create a configured QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ unauthorizedBehavior: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});
