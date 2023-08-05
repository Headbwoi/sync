import OnboardingHeader from "@/components/header/onboarding-header"

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <OnboardingHeader />
      <main className="min-h-screen bg-background">
        <div className="container">{children}</div>
      </main>
    </>
  )
}
