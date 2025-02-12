"use client"

interface Business {
  name: string;
  description: string;
  category: string;
}

import { useState, useEffect } from "react"
import BusinessList from "@/components/BusinessList"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BUSINESS_LIST } from "./config"

export default function BusinessesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredBusinesses, setFilteredBusinesses] = useState(BUSINESS_LIST)

  useEffect(() => {
    const filtered = BUSINESS_LIST.filter((business: Business) => {
      const matchesSearch =
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || business.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    setFilteredBusinesses(filtered)
  }, [searchTerm, selectedCategory])

  const handleSearch = () => {
    // The useEffect will handle the filtering
  }

  const categories = Array.from(new Set(BUSINESS_LIST.map((business) => business.category)))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#8E2157]">All Businesses</h1>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid gap-4 md:grid-cols-[1fr,auto,auto]">
            <div className="relative">
              <Input
                placeholder="Search businesses..."
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-[#8E2157] hover:bg-[#8E2157]/90" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>

        <BusinessList businesses={filteredBusinesses} />
      </div>
    </div>
  )
}

