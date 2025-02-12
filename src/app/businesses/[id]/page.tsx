"use client"

import { useState } from "react"
import { notFound, usePathname } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Globe, Star, Facebook, Instagram, Linkedin, Twitter, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AddReviewForm } from "@/components/AddReviewForm"
import { BUSINESS_LIST } from "../config"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

type Business = {
  id: number
  name: string
  tagline: string
  category: string
  description: string
  address: string
  phone: string
  website?: string
  facebookLink?: string
  instagramLink?: string
  linkedinLink?: string
  twitterLink?: string
  coverImage: string
  images: string[]
  rating: number
  ratingCounts: { [key: number]: number }
  leoName: string
  leoPhoto: string
  offers?: string
  yearsInOperation: number
}

export default function BusinessDetails() {
  const pathname = usePathname()
  const id = Number(pathname.split("/").pop())

  // Check if business exists before setting state
  const foundBusiness = BUSINESS_LIST.find((b) => Number(b.id) === id) as unknown as Business

  if (!foundBusiness) {
    notFound()
  }

  const [business, setBusiness] = useState<Business>(foundBusiness)

  const handleAddReview = (rating: number) => {
    const newRatingCounts = { ...business.ratingCounts }
    newRatingCounts[rating] = (newRatingCounts[rating] || 0) + 1

    const totalReviews = Object.values(newRatingCounts).reduce((a, b) => a + b, 0)
    const totalRating = Object.entries(newRatingCounts).reduce(
      (sum, [rating, count]) => sum + Number(rating) * count,
      0,
    )
    const newAverageRating = totalRating / totalReviews

    setBusiness({
      ...business,
      ratingCounts: newRatingCounts,
      rating: newAverageRating,
    })
  }

  const totalReviews = Object.values(business.ratingCounts).reduce((a, b) => a + b, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-[#8E2157]">{business.name}</h1>
      <p className="text-xl mb-6 text-gray-600">{business.tagline}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <CardContent className="p-6">
                  <p className="mb-4">
                    <strong>Category:</strong> {business.category}
                  </p>
                  <p className="mb-4">{business.description}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{business.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{business.phone}</span>
                    </div>
                    {business.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a
                          href={business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8E2157] hover:underline"
                        >
                          {business.website}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{business.yearsInOperation} years in operation</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    {business.facebookLink && (
                      <a
                        href={business.facebookLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-6 w-6" />
                      </a>
                    )}
                    {business.instagramLink && (
                      <a
                        href={business.instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>
                    )}
                    {business.linkedinLink && (
                      <a
                        href={business.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-800"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                    )}
                    {business.twitterLink && (
                      <a
                        href={business.twitterLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                  {business.offers && (
                    <div className="mt-4 p-4 bg-[#8E2157] bg-opacity-10 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2 text-[#8E2157]">Special Offer</h3>
                      <p>{business.offers}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="gallery">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {business.images.map((image, index) => (
                      <>
                        <Dialog key={index}>
                        <DialogTrigger>
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${business.name} image ${index + 1}`}
                            width={300}
                            height={200}
                            className="object-cover rounded-lg cursor-pointer" />
                        </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <VisuallyHidden>
        <DialogTitle>My Dialog Title</DialogTitle>
      </VisuallyHidden>
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${business.name} image ${index + 1}`}
                            width={1200}
                            height={800}
                            className="object-contain max-h-96" />
                        </DialogContent>
                      </Dialog>
                      </>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Rating Summary</h3>
                  <div className="space-y-2 mb-6">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center">
                        <div className="w-16 flex items-center">
                          <Star className="w-4 h-4 fill-[#8E2157] text-[#8E2157]" />
                          <span className="ml-1">{star}</span>
                        </div>
                        <Progress
                          value={(business.ratingCounts[star] / totalReviews) * 100}
                          className="h-2 w-full mx-2"
                        />
                        <div className="w-16 text-right">{business.ratingCounts[star]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4">Add Your Review</h4>
                    <AddReviewForm onSubmit={handleAddReview} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card>
            <CardContent className="p-6">
              <Image
                src={business.coverImage || "/placeholder.svg"}
                alt={`${business.name} cover image`}
                width={600}
                height={300}
                className="object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-4">Business Rating</h2>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-[#8E2157] mr-2">{business.rating.toFixed(1)}</span>
                <div className="flex text-[#8E2157]">
                  {"★".repeat(Math.floor(business.rating))}
                  {"☆".repeat(5 - Math.floor(business.rating))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Based on {totalReviews} reviews</p>
              <h3 className="text-lg font-semibold mb-2">Entrepreneur</h3>
              <div className="flex items-center mb-4">
                <Image
                  src={business.leoPhoto || "/placeholder.svg"}
                  alt={business.leoName}
                  width={50}
                  height={50}
                  className="rounded-full mr-4 "
                />
                <span>{business.leoName}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

