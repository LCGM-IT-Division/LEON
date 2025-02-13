
// const sponsors;/  = [
//   // { id: 1, name: "TechCorp", logo: "/placeholder.svg", description: "Leading technology solutions provider" },
//   // { id: 2, name: "GreenEnergy", logo: "/placeholder.svg", description: "Sustainable energy company" },
//   // { id: 3, name: "HealthPlus", logo: "/placeholder.svg", description: "Innovative healthcare services" },
//   // { id: 4, name: "EduTech", logo: "/placeholder.svg", description: "Advancing education through technology" },
//   // { id: 5, name: "FinanceHub", logo: "/placeholder.svg", description: "Cutting-edge financial services" },
//   // { id: 6, name: "FoodInnovate", logo: "/placeholder.svg", description: "Revolutionizing the food industry" },
// ]

export default function SponsorshipsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#8E2157]">Sponsorships</h1>

      <div className="bg-gray-100 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4 text-[#8E2157]">Become a Sponsor</h2>
        <p className="mb-4">
          Join our community of sponsors and make a difference! By becoming a sponsor, you&apos;ll support our mission and
          gain visibility among our members and the wider community. We offer various sponsorship levels to suit
          different budgets and goals.
        </p>
        <p className="mb-4">
          To learn more about our sponsorship opportunities, please contact our Sponsorship Coordinator:
        </p>
        <div className="mb-6 flex flex-col gap-3">
          <p>
            <strong>Name:</strong> Leo Abhishek Dewthilina
          </p>
          <p>
            <strong>Email:</strong> voiceofleos.lcgm@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +94 70 534 7457
          </p>
        </div>
      </div>

      {/* <h2 className="text-2xl font-bold mb-6 text-[#8E2157]">Our Current Sponsors</h2>
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
      </div> */}
    </div>
  )
}
