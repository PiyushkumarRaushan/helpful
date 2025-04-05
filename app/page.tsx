
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import VolunteerOpportunities from "@/components/volunteer-opportunities"
import HeroSection from "@/components/hero-section"
import CategoryFilter from "@/components/category-filter"
import Header from "@/components/header"
import AiMatchingAssistant from "@/components/ai-matching-assistant"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <section className="container py-16">
          <h2 className="text-3xl font-bold text-center mb-10">Find Opportunities By Category</h2>
          <CategoryFilter />
        </section>

        <section className="container py-16 bg-slate-50">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Featured Opportunities</h2>
            <Link href="/search">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <VolunteerOpportunities />
        </section>

        {/* About Section */}
        <section className="container py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">About Helping Hand</h2>
              <p className="text-muted-foreground text-lg">
                Helping Hand is a platform dedicated to connecting compassionate individuals with organizations in need.
                Whether you're looking to make a difference in your local community or contribute to global causes,
                we make it easy to find meaningful volunteer opportunities tailored to your passions and skills.
              </p>
            </div>
            <div  >
              <img
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b"
                alt="Volunteers helping community"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </section>

        <section className="container py-16">
          <div className="flex flex-col md:flex-row gap-14 items-stretch">
          <Card className="overflow-hidden h-full">
              <CardContent className="p-0">
                <img
                  src="https://www.gsb.stanford.edu/sites/default/files/styles/1630x_variable/public/2022-07/pfeffer-singer-volunteering-1630.jpeg.webp?itok=XDhq91zh"
                  alt="Volunteers working together"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
            {/* <div className="md:col-span-2 right-10 ">
              <h2 className="text-2xl font-bold mb-3">For Organizations</h2>
              <p className="text-muted-foreground mb-4">
                Are you a nonprofit or community organization looking for volunteers? Post your opportunities and
                connect with dedicated volunteers.
              </p>
              <Link href="/signup">
                <Button>Register Your Organization</Button>
              </Link>
            </div>
            */}
        <div className="md:col-span-2 flex flex-col items-end text-right space-y-4 ml-auto max-w-md">
  <h2 className="text-3xl font-bold text-gray-900 font-sans">
    For Organizations
  </h2>
  <p className="text-lg text-gray-600 leading-relaxed ">
    Are you a nonprofit or community organization looking for volunteers? 
    Post your opportunities and connect with dedicated volunteers.
  </p>
  <Link href="/orgregistration">
    <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-lg font-medium rounded-lg transition-colors duration-200">
      Register Your Organization
    </Button>
  </Link>
</div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-slate-900 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Helping Hand</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-slate-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-300 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-slate-300 hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">For Volunteers</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/search" className="text-slate-300 hover:text-white">
                    Find Opportunities
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-slate-300 hover:text-white">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-slate-300 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">For Organizations</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/signup" className="text-slate-300 hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/organizations/resources" className="text-slate-300 hover:text-white">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/organizations/success-stories" className="text-slate-300 hover:text-white">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-slate-300 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-slate-300 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-slate-300 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-300">
            <p>© {new Date().getFullYear()} Helping Hand. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Matching Assistant */}
      <AiMatchingAssistant />
    </div>
  )
}
