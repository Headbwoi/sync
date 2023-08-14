"use client"
import PageHeader from "@/components/layouts/page-header"
import { TaskContextProvider } from "@/context/task-context"

export default function Home() {
  return (
    <div className="relative min-w-screen w-full">
      <TaskContextProvider>
        <PageHeader />

        <main className=""></main>
      </TaskContextProvider>
    </div>
  )
}
