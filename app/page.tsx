import { redirect } from "next/navigation"

// Visiting localhost:3000 takes you straight to the blog
export default function Home() {
  redirect("/blog")
}
