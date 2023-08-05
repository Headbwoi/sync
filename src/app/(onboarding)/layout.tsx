export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}

      <div>This is the root layout fr the onboarding pages</div>
    </section>
  )
}
