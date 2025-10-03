import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";

import MainLayout from "@/components/layout/MainLayout";

import type { CustomRouterContext } from "@/constants/router/RouterContext";

export const Route = createRootRouteWithContext<CustomRouterContext>()({
  component: () => (
    <MainLayout>
      <HeadContent />
      <Outlet />
    </MainLayout>
  ),
});
