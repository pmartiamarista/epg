import { createRouter } from "@tanstack/react-router";

import { queryClient } from "../query-client/query-client";
import { routeTree } from "../../routeTree.gen";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient,
  },
});
