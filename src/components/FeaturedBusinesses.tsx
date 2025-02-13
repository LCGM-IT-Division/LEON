"use client"

import Link from "next/link"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"

const businesses = [
  // ... (your existing businesses array)
]

export default function FeaturedBusinesses() {

  if (businesses.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Featured Businesses</h2>
        <p className="mb-6">There are no featured businesses at the moment.</p>
        <div className="bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Want to be featured here?</h3>
          <p className="mb-4">
            Join our community of sponsors and get your business featured on our platform. Increase your visibility and
            support our mission at the same time!
          </p>
          <Link href="/sponsorships">
            <Button className="bg-[#8E2157] hover:bg-[#6D1A42] text-white">Learn About Sponsorship</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Businesses</h2>
        <Link href="/sponsorships">
          <Button variant="outline">Become a Sponsor</Button>
        </Link>
      </div>
      {/* <Slider ref={sliderRef} {...settings}>
        {businesses.map((business) => (
          <div key={business.id} className="px-2">
            <Link href={`/businesses/${business.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <div>
                    <h3 className="font-semibold text-lg">{business.name}</h3>
                    <p className="text-sm text-gray-500">{business.category}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-[#8E2157] font-medium">{business.rating}</span>
                      <div className="flex ml-1">
                        {"★".repeat(Math.floor(business.rating))}
                        {"☆".repeat(5 - Math.floor(business.rating))}
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </div>
        ))}
      </Slider> */}
      {/* <div className="flex justify-center mt-4 gap-4">
        <Button variant="outline" size="icon" onClick={() => sliderRef.current?.slickPrev()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => sliderRef.current?.slickNext()}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div> */}
      <div className="mt-8 text-center">
        <p className="mb-2">Want your business featured here?</p>
        <Link href="/sponsorships">
          <Button className="bg-[#8E2157] hover:bg-[#6D1A42] text-white">Learn About Sponsorship</Button>
        </Link>
      </div>
    </div>
  )
}

