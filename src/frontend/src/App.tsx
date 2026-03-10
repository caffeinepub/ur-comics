import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import Drawer from "./components/Drawer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Reader from "./pages/Reader";
import Upload from "./pages/Upload";

function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "var(--nebula-bg)" }}>
      <Header onDrawerOpen={() => setDrawerOpen(true)} />
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Outlet />
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute();

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: Home,
});

const uploadRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/upload",
  component: Upload,
});

const readerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reader/$id",
  component: Reader,
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([homeRoute, uploadRoute]),
  readerRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
