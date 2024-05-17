import { Outlet, createFileRoute } from "@tanstack/react-router";
import Header from "../components/header";

export const Route = createFileRoute("/_layout")({
  component: RootLayout,
});

export default function RootLayout() {
  return (
    <section className="bg-red-50 min-h-screen">
      <section className="container">
        <Header />
        <Outlet />
      </section>
    </section>
  );
}
