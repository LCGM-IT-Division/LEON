import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, UserCircle } from "lucide-react"
import { BUSINESS_LIST } from "@/app/businesses/config"

export default function BusinessList({ businesses = BUSINESS_LIST }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {businesses.map((business) => (
        <Link key={business.id} href={`/businesses/${business.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <div className="grid md:grid-cols-[200px,1fr]">
              <CardContent className="p-0">
                <div className="relative min-h-full">
                  <Image
                    src={business.coverImage || "/placeholder.svg"}
                    alt={business.name}
                    fill
                    className="object-cover  rounded-l-lg"
                  />
                </div>
              </CardContent>
              <CardContent className="p-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{business.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{business.category}</p>
                  <div className="flex items-center mb-4">
                    <span className="text-[#8E2157] font-medium mr-1">{business.rating}</span>
                    <div className="flex text-[#8E2157]">
                      {"★".repeat(Math.floor(business.rating))}
                      {"☆".repeat(5 - Math.floor(business.rating))}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{business.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4" />
                      <span>{business.leoName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{business.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

