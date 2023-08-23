import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen gap-8">
      <p>Welcome to Sync Kanban</p>

      <Button asChild>
        <Link href="/boards">Get Started</Link>
      </Button>
    </div>
  )
}
