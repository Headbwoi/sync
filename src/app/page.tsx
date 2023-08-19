import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative w-full">
      <p>Welcome to Sync Kanban</p>

      <Button asChild>
        <Link href="/boards">Get Started</Link>
      </Button>
    </div>
  )
}
