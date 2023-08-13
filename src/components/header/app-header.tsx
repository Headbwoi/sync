"use client"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import SideNav from "../layouts/side-nav"
import MobileNav from "../layouts/mobile-nav"

function AppHeader() {
  const matches = useMediaQuery("(min-width: 768px)")

  return <>{matches ? <SideNav /> : <MobileNav />}</>
}

export default AppHeader
