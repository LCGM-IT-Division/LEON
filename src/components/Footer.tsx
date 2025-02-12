import Image from "next/image"
import { Github, Twitter, Linkedin } from "lucide-react"

const developers = [
  {
    name: "Alice Johnson",
    avatar: "/placeholder.svg",
    github: "https://github.com/alice",
    twitter: "https://twitter.com/alice",
    linkedin: "https://linkedin.com/in/alice",
  },
  {
    name: "Bob Smith",
    avatar: "/placeholder.svg",
    github: "https://github.com/bob",
    twitter: "https://twitter.com/bob",
    linkedin: "https://linkedin.com/in/bob",
  },
  {
    name: "Charlie Brown",
    avatar: "/placeholder.svg",
    github: "https://github.com/charlie",
    twitter: "https://twitter.com/charlie",
    linkedin: "https://linkedin.com/in/charlie",
  },
]

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-[#8E2157] mb-2">Project Developers</h2>
          <div className="flex justify-center space-x-8">
            {developers.map((dev) => (
              <div key={dev.name} className="flex flex-col items-center">
                <Image
                  src={dev.avatar || "/placeholder.svg"}
                  alt={dev.name}
                  width={60}
                  height={60}
                  className="rounded-full mb-2"
                />
                <p className="text-sm font-medium">{dev.name}</p>
                <div className="flex space-x-2 mt-1">
                  <a href={dev.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                  <a href={dev.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2023 Business Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

