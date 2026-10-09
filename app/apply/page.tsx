import { redirect } from "next/navigation";

// The qualifier form was removed; old /apply links go straight to booking.
export default function ApplyPage() {
  redirect("/book-a-call");
}
