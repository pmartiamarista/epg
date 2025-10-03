import { createRouter } from "@tanstack/react-router";

import ErrorPage from "@/pages/ErrorPage";
import LoadingPage from "@/pages/LoadingPage";
import NotFoundPage from "@/pages/NotFoundPage";

import { queryClient } from "../query-client/query-client";
import { routeTree } from "../../routeTree.gen";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient,
  },
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorPage,
  defaultPendingComponent: LoadingPage,
});
