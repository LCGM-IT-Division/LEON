"use client"

import { useState } from "react"

export default function SearchAndFilter() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", search, "in category:", category)
  }

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search businesses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-grow"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Food & Beverage">Food & Beverage</option>
          <option value="Retail">Retail</option>
        </select>
        <button type="submit" className="bg-[#8E2157] text-white px-4 py-2 rounded hover:bg-[#6D1A42]">
          Search
        </button>
      </div>
    </form>
  )
}
