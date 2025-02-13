import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Facebook } from "lucide-react"
import NIMASHA from "./nimasha.jpeg"
import KAVEESH from "./kaveesh.jpeg" 


const teamMembers = [
  {
    name: "Nimasha Jayakody",
    role: "Vision & Strategy Lead",
    image: NIMASHA,
    bio: "The visionary behind LEON, shaping its purpose, strategy, and long-term impact for Leo & Lions entrepreneurs.",
    linkedin: "https://www.linkedin.com/in/nimasha-jayakody-89a0ba243 ",
    facebook: 'https://www.facebook.com/nimasha.jayakody',
    email: "nimashajayakodyd@gmail.com"
  },
  {
    name: "Kaveesh Karunarathna",
    role: "Head of Development",
    image: KAVEESH,
    bio: "Driving the full-stack development of LEON, ensuring a high-quality, scalable, and future-ready platform for the community.",
    github: "https://github.com/kaveeshkarunarathna",
    linkedin: "https://www.linkedin.com/in/kaveesh-karunarathna",
    facebook: 'https://www.facebook.com/profile.php?id=100010818270217',
    email: "kaveeshbc@gmail.com"
  },
]

// const developers = [
//   {
//     name: "Alice Johnson",
//     role: "Full Stack Developer",
//     image: "/placeholder.svg",
//     github: "https://github.com/alice",
//     linkedin: "https://linkedin.com/in/alice",
//     email: "alice@example.com",
//   },
//   {
//     name: "Bob Smith",
//     role: "UI/UX Designer",
//     image: "/placeholder.svg",
//     github: "https://github.com/bob",
//     linkedin: "https://linkedin.com/in/bob",
//     email: "bob@example.com",
//   },
//   {
//     name: "Charlie Brown",
//     role: "Backend Developer",
//     image: "/placeholder.svg",
//     github: "https://github.com/charlie",
//     linkedin: "https://linkedin.com/in/charlie",
//     email: "charlie@example.com",
//   },
// ]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#8E2157]">About LEON</h1>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          LEON (Leo Entrepreneurs & Opportunities Network) is a platform dedicated to supporting and promoting
          businesses run by members of the Leo and Lion community. Initiated by the Leos of Leo Club of Gampaha Metro,
          our mission is to foster entrepreneurship, create opportunities, and build a strong network of young business
          leaders within our community.
        </p>
        <p className="text-lg mb-4">
          We believe in the power of connection and collaboration. By bringing together Leo and Lion entrepreneurs, we
          aim to create a supportive ecosystem where ideas flourish, businesses grow, and lasting partnerships are
          formed.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          {teamMembers.map((member) => (
            <Card key={member.name} className="flex gap-1 flex-col">
              <CardHeader>
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 object-cover h-[100px] w-[100px]"
                />
                <CardTitle className="text-center">Leo</CardTitle>
                <CardTitle className="text-center">{member.name}</CardTitle>
                <p className="text-center text-[#8E2157] font-semibold mb-2">{member.role}</p>
              </CardHeader>
              <CardContent className='flex flex-col gap-4'>
                <p className="text-center">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#8E2157]"
                  >
                    <Facebook size={24} />
                  </a>
                  {member.github && 
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#8E2157]"
                  >
                    <Github size={24} />
                  </a>}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#8E2157]"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-[#8E2157]">
                    <Mail size={24} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* <section>
        <h2 className="text-2xl font-semibold mb-8">Our Developers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {developers.map((dev) => (
            <Card key={dev.name}>
              <CardHeader>
                <Image
                  src={dev.image || "/placeholder.svg"}
                  alt={dev.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle className="text-center">{dev.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-[#8E2157] font-semibold mb-4">{dev.role}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#8E2157]"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#8E2157]"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a href={`mailto:${dev.email}`} className="text-gray-600 hover:text-[#8E2157]">
                    <Mail size={24} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}
    </div>
  )
}
