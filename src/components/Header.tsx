"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import LOGO from "./leon-hero-image.svg"
import LIONS_LOGO from "./lions-logo.png"
import LEO_LOGO from "./leo-logo.png"

export default function Header() {
  const pathname = usePathname()

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
          <Image src={LOGO} alt="Logo" width={70} height={70} />
        </Link>
        <nav className="flex items-center space-x-6 mx-6">
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
          <Image src={LIONS_LOGO} alt="Logo" width={50} height={50} />
          <Image src={LEO_LOGO} alt="Logo" width={50} height={50} />
        </div>
      </div>
    </div>
  )
}

