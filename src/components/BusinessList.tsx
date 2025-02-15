import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, UserCircle } from "lucide-react"
import { BUSINESS_LIST } from "@/app/businesses/config"
import { Button } from "./ui/button"

export default function BusinessList({ businesses = BUSINESS_LIST }) {
  console.log(businesses)

  if (!(businesses.length > 0)) {
    return (
      <div className="bg-gray-100 text-center p-6 rounded-lg max-w-2xl mx-auto">
        <p className="mb-6">There are no businesses registered under this category at the moment.</p>
        <h3 className="text-xl font-semibold mb-4">Do you have a business that fits under this category?</h3>
        <Link href="/add-business">
          <Button className="bg-[#8E2157] hover:bg-[#6D1A42] text-white">Add your business</Button>
        </Link>
              </div>
          )
        }

        return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {businesses.map((business) => (
            <Link key={business.id} href={`/businesses/${business.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full h-48 md:w-[200px] md:h-[250px] flex-shrink-0">
                    <Image
                      src={business.coverImage || "/placeholder.svg"}
                      alt={business.name}
                      fill
                      className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none" />
                  </div>
                  <CardContent className="flex-grow p-4 overflow-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{business.name}</h3>
                        <p className="text-sm text-gray-500">{business.category}</p>
                      </div>

                      <div className="flex items-center">
                        <span className="text-[#8E2157] font-medium mr-1">{business.rating}</span>
                        <div className="flex text-[#8E2157]">
                          {"★".repeat(Math.floor(business.rating))}
                          {"☆".repeat(5 - Math.floor(business.rating))}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="line-clamp-2">{business.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCircle className="h-4 w-4 flex-shrink-0" />
                          <span className="line-clamp-1">{business.leoName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 flex-shrink-0" />
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
