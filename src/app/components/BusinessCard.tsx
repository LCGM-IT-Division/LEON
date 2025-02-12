import Link from "next/link"

interface Business {
  id: number
  name: string
  category: string
  description: string
}

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{business.name}</h2>
      <p className="text-sm text-gray-600 mb-2">{business.category}</p>
      <p className="mb-4">{business.description}</p>
      <Link href={`/businesses/${business.id}`} className="text-[#8E2157] hover:underline">
        View Details
      </Link>
    </div>
  )
}
