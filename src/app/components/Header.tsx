import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-[#8E2157] text-white">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/businesses" className="hover:underline">
              Businesses
            </Link>
          </li>
          <li>
            <Link href="/add-business" className="hover:underline">
              Add Business
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
