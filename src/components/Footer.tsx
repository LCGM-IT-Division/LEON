import Image from "next/image"
import { Github, Linkedin, Mail, Facebook } from "lucide-react"
import NIMASHA from "./nimasha.jpeg"
import KAVEESH from "./kaveesh.jpeg"

const teamMembers = [
  {
    name: "Leo Nimasha Jayakody",
    role: "Vision & Strategy Lead",
    image: NIMASHA,
    bio: "The visionary behind LEON, shaping its purpose, strategy, and long-term impact for Leo & Lions entrepreneurs.",
    linkedin: "https://www.linkedin.com/in/nimasha-jayakody-89a0ba243 ",
    facebook: "https://www.facebook.com/nimasha.jayakody",
    email: "nimashajayakodyd@gmail.com",
  },
  {
    name: "Leo Kaveesh Karunarathna",
    role: "Head of Development",
    image: KAVEESH,
    bio: "Leads the development of the platform, ensuring LEON remains high-quality and future-ready for the community.",
    github: "https://github.com/kaveeshkarunarathna",
    linkedin: "https://www.linkedin.com/in/kaveesh-karunarathna",
    facebook: "https://www.facebook.com/profile.php?id=100010818270217",
    email: "kaveeshbc@gmail.com",
  },
]

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
          <div className="lg:w-1/2">
            <h2 className="text-xl font-semibold text-[#8E2157] mb-4">Our Mission</h2>
            <p className="text-sm text-gray-600 mb-4">
              LEON (Leo Entrepreneurs & Opportunities Network) is a platform dedicated to supporting and promoting
              businesses run by members of the Leo and Lion community. Initiated by the Leos of Leo Club of Gampaha
              Metro, our mission is to foster entrepreneurship, create opportunities, and build a strong network of
              young business leaders within our community.
            </p>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-xl font-semibold text-[#8E2157] mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex items-center">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4 object-cover w-[60px] h-[60px]"
                  />
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <div className="flex space-x-2 mt-1">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#8E2157]"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-[#8E2157]">
                        <Mail className="h-4 w-4" />
                      </a>
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#8E2157]"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {member.facebook && (
                        <a
                          href={member.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#8E2157]"
                        >
                          <Facebook className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 border-t border-gray-300 pt-4">
          <p>
            &copy; {new Date().getFullYear()} LEON - Leo Entrepreneurs & Opportunities Network. All rights reserved.
          </p>
          <p>Initiated by the Leos of Leo Club of Gampaha Metro IT Division</p>
        </div>
      </div>
    </footer>
  )
}

