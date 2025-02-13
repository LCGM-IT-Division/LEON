"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import LOGO from "./leon-hero-image.svg"
import LIONS_LOGO from "./lions-logo.png"
import LEO_LOGO from "./leo-logo.png"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/businesses", label: "View all Businesses" },
    { href: "/add-business", label: "Add Business" },
    { href: "/sponsorships", label: "Sponsorships" },
    { href: "/about", label: "About Us" },
  ]

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="mr-6">
          <Image src={LOGO || "/placeholder.svg"} alt="Logo" width={70} height={70} />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 mx-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#8E2157]",
                pathname === item.href && "text-[#8E2157] font-semibold",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Image src={LIONS_LOGO || "/placeholder.svg"} alt="Logo" width={50} height={50} />
          <Image src={LEO_LOGO || "/placeholder.svg"} alt="Logo" width={50} height={50} />
        </div>
        <div className="md:hidden ml-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-[#8E2157]",
                      pathname === item.href && "text-[#8E2157] font-semibold",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

