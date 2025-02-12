import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const sponsors = [
  { id: 1, name: "TechCorp", logo: "/placeholder.svg", description: "Leading technology solutions provider" },
  { id: 2, name: "GreenEnergy", logo: "/placeholder.svg", description: "Sustainable energy company" },
  { id: 3, name: "HealthPlus", logo: "/placeholder.svg", description: "Innovative healthcare services" },
  { id: 4, name: "EduTech", logo: "/placeholder.svg", description: "Advancing education through technology" },
  { id: 5, name: "FinanceHub", logo: "/placeholder.svg", description: "Cutting-edge financial services" },
  { id: 6, name: "FoodInnovate", logo: "/placeholder.svg", description: "Revolutionizing the food industry" },
]

export default function SponsorshipsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#8E2157]">Our Sponsors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <Card key={sponsor.id}>
            <CardHeader>
              <CardTitle>{sponsor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Image
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={`${sponsor.name} logo`}
                  width={200}
                  height={100}
                  className="mb-4"
                />
                <p className="text-center">{sponsor.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
