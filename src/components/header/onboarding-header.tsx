import { ModeToggle } from "../mode-toggle"

function OnboardingHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-foreground">
      <ModeToggle />
    </header>
  )
}

export default OnboardingHeader
