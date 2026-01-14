import { redirect } from "next/navigation";

export default function CEOEntryPage() {
  // Canonical entry: /ceo -> /ceo/radix
  redirect("/ceo/radix");
}
