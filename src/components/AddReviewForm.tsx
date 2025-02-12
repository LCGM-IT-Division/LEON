"use client"

import React, { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddReviewFormProps {
  onSubmit: (rating: number) => void
}

export function AddReviewForm({ onSubmit }: AddReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating > 0) {
      onSubmit(rating)
      setRating(0)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="mb-2 font-medium">Your Rating</p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating) ? "fill-[#8E2157] text-[#8E2157]" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <Button type="submit" disabled={rating === 0}>
        Submit Review
      </Button>
    </form>
  )
}
