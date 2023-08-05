import { redirect } from "next/navigation"
import Image from "next/image"

export default function Home() {
  redirect("/login")
  return <main>Hello, welcome to sync</main>
}
