import type { Metadata } from "next";
import { StatusPage } from "@/components/status-page";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="Not on this wall"
      body="That page is not in the roster. Head back and pick a channel."
      variant="white"
    />
  );
}
