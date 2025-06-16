/* eslint-disable @typescript-eslint/no-explicit-any */
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type FetchResult<T = any> = {
  ok: boolean;
  status: number;
  data: T | null;
  error?: string;
};

export class NixiosClient {
  constructor(
    private baseUrl: string,
    private defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    },
  ) {}

  private async baseFetch<T>(
    url: string,
    method: HTTPMethod,
    customHeaders?: HeadersInit,
    customBody?: Record<string, any> | null,
  ): Promise<FetchResult<T>> {
    try {
      const response = await fetch(this.baseUrl + url, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...customHeaders,
        },
        body: customBody ? JSON.stringify(customBody) : undefined,
        credentials:"include",
      });
      console.log("This is status ", response.status);
      // if (response.status === 401 && typeof window !== "undefined") {
      //   window.location.href = "/login";
      //   return {
      //     ok: false,
      //     status: 401,
      //     data: null,
      //     error: "Unauthorized. Redirecting to login.",
      //   };
      // }
      let data: T | null = null;
      if (response.status !== 204) {
        data = await response.json();
      }

      return {
        ok: response.ok,
        status: response.status,
        data,
      };
    } catch (error: any) {
      return {
        ok: false,
        status: 0,
        data: null,
        error: error.message || "Unknown error",
      };
    }
  }

  get<T = any>(url: string, headers?: HeadersInit) {
    return this.baseFetch<T>(url, "GET", headers, null);
  }

  post<T = any>(url: string, body: Record<string, any>, headers?: HeadersInit) {
    return this.baseFetch<T>(url, "POST", headers, body);
  }
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;
export const nixios = new NixiosClient(baseUrl);
