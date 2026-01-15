import { redirect } from "next/navigation";

export default function CeLoginRedirectPage() {
  // Redirect-only shell. No auth/session logic permitted.
  redirect("/");
}
