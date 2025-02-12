import BusinessCard from "./BusinessCard"

// This is a mock data array. In a real application, you would fetch this data from an API or database.
const businesses = [
  { id: 1, name: "Acme Corp", category: "Technology", description: "Leading tech solutions" },
  { id: 2, name: "Joe's Cafe", category: "Food & Beverage", description: "Cozy coffee shop" },
  { id: 3, name: "Greenthumb Nursery", category: "Retail", description: "Plants and gardening supplies" },
]

export default function BusinessList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  )
}
