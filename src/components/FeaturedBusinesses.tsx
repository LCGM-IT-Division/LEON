"use client"

import Image from "next/image"
import Link from "next/link"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react" // Import React

const businesses = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    category: "Technology",
    image: "/placeholder.svg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Green Cafe",
    category: "Food & Beverage",
    image: "/placeholder.svg",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Fitness Hub",
    category: "Health & Wellness",
    image: "/placeholder.svg",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Creative Studio",
    category: "Arts & Design",
    image: "/placeholder.svg",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Fresh Market",
    category: "Retail",
    image: "/placeholder.svg",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Professional Services Co",
    category: "Professional Services",
    image: "/placeholder.svg",
    rating: 4.8,
  },
  {
    id: 7,
    name: "Tech Innovators",
    category: "Technology",
    image: "/placeholder.svg",
    rating: 4.7,
  },
]

export default function FeaturedBusinesses() {
  const sliderRef = React.useRef<Slider>(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div>
      <Slider ref={sliderRef} {...settings}>
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
      </Slider>
      <div className="flex justify-center mt-4 gap-4">
        <Button variant="outline" size="icon" onClick={() => sliderRef.current?.slickPrev()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => sliderRef.current?.slickNext()}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

