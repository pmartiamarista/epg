import type { QueryClient } from "@tanstack/react-query";

import type { router } from "./router";

export interface CustomRouterContext {
  queryClient: QueryClient;
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
    context: CustomRouterContext;
  }
}
