import { redirect } from "next/navigation";

export default function AdminLoginRedirectPage() {
  // Redirect-only shell. No auth/session logic permitted.
  redirect("/");
}
