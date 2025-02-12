import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import FeaturedBusinesses from "@/components/FeaturedBusinesses"
import COVER_IMAGE from './leon-hero-image.svg'

export default function Home() {
  return (
    <div>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-sm font-semibold tracking-wide text-[#8E2157] uppercase mb-6">
                LEO ENTREPRENEURS & OPPORTUNITIES NETWORK
              </h2>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Empowering Leo and Lion Entrepreneurs
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                LEON: A platform to support, promote, and connect businesses run by members of the Leo and Lion
                community.
              </p>
              <div className="flex gap-4">
                <Button asChild variant="outline" size="lg">
                  <Link href="/businesses">Explore Businesses</Link>
                </Button>
                <Button asChild size="lg" className="bg-[#8E2157] hover:bg-[#8E2157]/90">
                  <Link href="/add-business">Join LEON</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[500px]">
              <Image
                src={COVER_IMAGE}
                alt="LEON - Leo Entrepreneurs & Opportunities Network"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">About LEON</h2>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            LEON, initiated by the Leos of Leo Club of Gampaha Metro, is a platform dedicated to fostering
            entrepreneurship within the Leo and Lion community. We aim to create opportunities, provide support, and
            build a strong network of young business leaders.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Support</h3>
              <p>Providing resources, mentorship, and guidance to help Leo and Lion entrepreneurs thrive.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Promote</h3>
              <p>Showcasing and marketing businesses run by members of our community to a wider audience.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Connect</h3>
              <p>Facilitating networking and collaboration opportunities among Leo and Lion entrepreneurs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Leo & Lion Entrepreneurs</h2>
          <FeaturedBusinesses />
        </div>
      </section>

      <section className="py-20 bg-[#8E2157] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the LEON Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Are you a Leo or Lion entrepreneur? Become part of our growing network and take your business to new
            heights!
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-[#8E2157]"
          >
            <Link href="/add-business">Register Your Business</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
