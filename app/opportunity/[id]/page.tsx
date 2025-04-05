"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  Building,
  Phone,
  Mail,
  Globe,
  Share2,
  Heart,
  CheckCircle,
} from "lucide-react"

// In a real app, this would come from a database
const opportunities = [
  {
    id: "1",
    title: "Community Garden Helper",
    organization: "Green City Initiative",
    organizationDescription:
      "Green City Initiative is a non-profit organization dedicated to creating sustainable urban environments through community gardens, tree planting, and environmental education.",
    location: "Downtown Community Garden",
    address: "chandigarh, India",
    distance: "1.2 miles away",
    date: "Every Saturday",
    time: "9:00 AM - 12:00 PM",
    category: "Environment",
    image: "https://media.istockphoto.com/id/1427848310/photo/multiracial-group-of-young-men-and-young-women-gather-as-volunteers-to-plant-vegetables-in.jpg?s=612x612&w=0&k=20&c=3dzwDaO5nrQBwlKW0iXAivhp9sarZma_Dp6hD40znAk=",
    description:
      "Join us at the Downtown Community Garden to help maintain this beautiful green space in the heart of our city. Volunteers will assist with planting, weeding, watering, and harvesting seasonal produce that is donated to local food banks. No experience necessary - we'll teach you everything you need to know!",
    requirements: [
      "Must be 16 years or older",
      "Wear comfortable clothes that can get dirty",
      "Bring water bottle and sunscreen",
      "Garden tools provided, but feel free to bring your own gloves",
    ],
    skills: ["Gardening", "Physical Labor"],
    commitment: "Ongoing",
    contactName: "Arun Gupta",
    contactPhone: "+91 7018537731",
    contactEmail: "arungupta51@gmail.com",
    website: "www.greencityinitiative.org",
  },
]

const opportunities1 = [
{
  id: "2",
  title: "After-School Tutor",
  organization: "Local Education Foundation",
  organizationDescription:
    "The Local Education Foundation supports educational programs and initiatives in our community, providing resources and opportunities for students to succeed.",
  location: "Government High School",
  address: "Sector-23,Chandigarh, India",
  distance: "1.2 miles away",
  date: "Every Saturday",
  time: "9:00 AM - 12:00 PM",
  category: "Education",
  image: "https://emergenttutoring.com/wp-content/uploads/2022/04/after-school-tutoring-1024x563.jpg",
   description:
    "Join us to help students in grades 6-12 improve their academic skills and confidence. Volunteers will work one-on-one or in small groups to provide tutoring in subjects such as math, science, and English. No teaching experience required - just a passion for helping students succeed!",
  requirements: [
    "Must be 18 years or older",
    "Background check required",
    "Commit to at least 2 hours per week for a minimum of 3 months",
    "Tutoring materials provided, but feel free to bring your own resources",
  ],
  skills: ["Teaching", "Mentoring", "Communication"],
  commitment: "Ongoing",
  contactName: "Arun Gupta",
  contactPhone: "+917018537731",
  contactEmail: "Arungupta21@gmail.com",
  website: "www.localeducationfoundation.org",
},
]

const opportunities2 = [
  {
    id: "3",
    title: "Food Bank Assistant",
    organization: "City Food Bank",
    organizationDescription:
      "City Food Bank is a nonprofit organization dedicated to alleviating hunger in our community by providing food assistance to those in need.",
    location: "City Food Bank Warehouse",
    address: "indianagar, Chandigarh, India",
    distance: "2.5 miles away",
    date: "Every Tuesday and Thursday",
    time: "1:00 PM - 4:00 PM",
    category: "Hunger Relief",
    image: "https://www.bu.edu/bostonia/files/2015/11/h_bostonia_15-9287-BMCFOOD-190.jpg",
    description:
      "Help us sort, package, and distribute food to families in need. Volunteers will work in our warehouse to organize food donations and prepare them for distribution. This is a great opportunity to make a direct impact in your community!",
    requirements: [
      "Must be 18 years or older",
      "Ability to lift up to 30 pounds",
      "Wear comfortable clothes and closed-toe shoes",
      "Food safety training provided on-site",
    ],
    skills: ["Teamwork", "Physical Labor"],
    commitment: "Ongoing",
    contactName: "Vishwas Dubey",
    contactPhone: "+919336190686", 
    contactEmail:"Arungupta21@gmail.com",
    website: "www.cityfoodbank.org",
  },
  ]

  const opportunities3 = [
    {
      id: "4",
      title: "Animal Shelter Helper",
      organization: "Paws & Claws Rescue",
      organizationDescription:
        "City Animal Shelter is dedicated to providing a safe haven for abandoned and stray animals, and finding them loving homes.",
      location: "City Animal Shelter",
      address: "456 Elm Street, Anytown, USA",
      distance: "2.5 miles away",
      date: "Every Sunday",
      time: "10:00 AM - 2:00 PM",
      category: "Animal Welfare", 
      image: "https://media.freemalaysiatoday.com/wp-content/uploads/2023/05/2169f788-helper.jpg",
      description:
        "Join us to help care for the animals at our shelter. Volunteers will assist with feeding, walking, and socializing the animals, as well as cleaning their living spaces. This is a great opportunity for animal lovers to make a difference!",
      requirements: [
        "Must be 16 years or older",
        "Background check required",
        "Commit to at least 4 hours per month for a minimum of 6 months",
        "Animal handling experience preferred, but not required",
      ],
      skills: ["Animal Care", "Compassion", "Teamwork"],
      commitment: "Ongoing",
      contactName: "Vishwas Dubey",
      contactPhone: "+919336190686",
      contactEmail:"Arungupta21@gmail.com",
      website: "www.cityanimalshelter.org",
    },
    ]

    const opportunities4 = [
      {
        id: "5",
        title: "Hospital Volunteer",
        organization: "City General Hospital",
        organizationDescription:
          "City General Hospital is a community hospital providing comprehensive healthcare services to residents of Anytown.",
        location: "City General Hospital",
        address: "chandigarh, India",
        distance: "3.0 miles away",
        date: "Every Monday and Wednesday",
        time: "9:00 AM - 1:00 PM",
        category: "Healthcare",
        image: "https://www.imperial.nhs.uk/-/media/volunteer.jpg?rev=bbea636e878a4cb69496348489678454&bc=ffffff&w=624&h=364&as=1&la=en&hash=F4C91E8902B3738EB3703F97761035F3",
        description:
          "Assist hospital staff with various tasks, including patient check-in, wayfinding, and administrative support. Volunteers will help create a welcoming environment for patients and visitors. This is a great opportunity to gain experience in a healthcare setting!",
        requirements: [
          "Must be 18 years or older",
          "Background check required",
          "Commit to at least 4 hours per week for a minimum of 3 months",
          "Healthcare experience preferred, but not required",
        ],
        skills: ["Communication", "Customer Service"],
        commitment: "Ongoing",
        contactName: "Vishwas Dubey",
        contactPhone: "+919336190686",
        contactEmail:"Arungupta21@gmail.com",
        website: "www.citygeneralhospital.org",
      },
      ]


      const opportunities5 = [
        {
          id: "6",
          title: "Museum Guide",
          organization: "City Museum",
          organizationDescription:
            "City Museum is dedicated to preserving and showcasing the history and culture of our community through exhibits, programs, and events.",
          location: "City Museum",
          address: "chandigarh, India",
          distance: "1.5 miles away",
          date: "Every Saturday",
          time: "10:00 AM - 4:00 PM",
          category: "Arts & Culture",
          image: "https://content.yourcareer.gov.au/sites/default/files/2022-12/451411-galleryormuseumguide.jpg",
          description:
            "Join us as a museum guide to help visitors learn about our exhibits and the history of our community. Volunteers will lead tours, answer questions, and assist with special events. This is a great opportunity for those interested in history and education!",
          requirements: [
            "Must be 18 years or older",
            "Background check required",
            "Commit to at least 4 hours per month for a minimum of 6 months",
            "Public speaking experience preferred, but not required",
          ],
          skills: ["Public Speaking", "Customer Service"],
          commitment: "Ongoing",
          contactName: "Vishwas Dubey",
          contactPhone: "+919336190686",
          contactEmail:"Arungupta21@gmail.com",
          website: "www.citymuseum.org",
        },
        ]


        const opportunities6 = [
          {
            id: "7",
            title: "Youth mentor",
            organization: "City Youth Center",
            organizationDescription:
              "City Youth Center is a nonprofit organization dedicated to empowering young people through mentorship, education, and community engagement.",
            location: "City Youth Center",
            address: "chandigarh,India",
            distance: "1.0 miles away",
            date: "Every Friday",
            time: "4:00 PM - 7:00 PM",
            category: "Youth Development",
            image: "https://s3.amazonaws.com/utep-uploads/wp-content/uploads/unr/2022/07/07060421/youth-mentoring-programs.jpg?itok=8bmDDcA4&timestamp=1542497091",
            description:  
              "Become a mentor to local youth and help them develop important life skills, set goals, and navigate challenges. Volunteers will work one-on-one with youth to provide guidance and support. This is a rewarding opportunity to make a positive impact in a young person's life!",
            requirements: [
              "Must be 21 years or older",
              "Background check required",
              "Commit to at least 2 hours per week for a minimum of 6 months",
              "Mentoring experience preferred, but not required",
            ],
            skills: ["Mentoring", "Communication"], 
            commitment: "Ongoing",
            contactName: "Vishwas Dubey",
            contactPhone: "+919336190686",
            contactEmail:"Arungupta21@gmail.com",
            website: "www.cityyouthcenter.org",
          },
          ]

          const opportunities7 = [
            {
              id: "8",
              title: "Beach Cleanup Volunteer",
              organization: "Clean Oceans Initiative",
              organizationDescription:
                "Clean Oceans Initiative is a nonprofit organization dedicated to protecting marine environments through beach cleanups, education, and advocacy.",
              location: "Anytown Beach",
              address: "goa, India",
              distance: "2.0 miles away",
              date: "Every Sunday",
              time: "8:00 AM - 11:00 AM",
              category: "Environmental Conservation",
              image: "https://www.parksconservancy.org/sites/default/files/styles/hero/public/hero/20130713-A_OCBE_130713_MDu_77_hero.jpg?itok=8bmDDcA4&timestamp=1542497091",
              description:
                "Join us for a beach cleanup to help keep our oceans clean and protect marine wildlife. Volunteers will work together to pick up trash and debris along the shoreline. This is a great opportunity to enjoy the outdoors while making a positive impact!",
              requirements: [
                "Must be 16 years or older",
                "Wear comfortable clothes and closed-toe shoes",
                "Bring water bottle and sunscreen",
                "Trash bags and gloves provided",
              ],
              skills: ["Teamwork", "Physical Labor"],
              commitment: "Ongoing",
              contactName: "Vishwas Dubey",
              contactPhone: "+9193361906866",
              contactEmail:"Arungupta21@gmail.com",
              website: " www.cleanoceansinitiative.org",
            },
            ]

export default function OpportunityPage() {
  const params = useParams()
  const id = params.id as string

  // In a real app, we would fetch the opportunity data based on the ID
  const opportunity =
  opportunities.find((opp) => opp.id === id) ||
  opportunities1.find((opp) => opp.id === id) ||
  opportunities2.find((opp) => opp.id === id) ||
  opportunities3.find((opp) => opp.id === id) ||
  opportunities4.find((opp) => opp.id === id) ||
  opportunities5.find((opp) => opp.id === id) ||
  opportunities6.find((opp) => opp.id === id) ||
  opportunities7.find((opp) => opp.id === id) ||
  opportunities[0]


  const [applied, setApplied] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    setApplied(true)
  }

  return (
    <div className="container py-8">
      <Link href="/search" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Search Results
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={opportunity.image || "/placeholder.svg"}
              alt={opportunity.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge>{opportunity.category}</Badge>
              <Badge variant="outline" className="bg-white">
                {opportunity.commitment}
              </Badge>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{opportunity.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{opportunity.organization}</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                  <p className="text-sm text-muted-foreground">{opportunity.distance}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">{opportunity.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">{opportunity.time}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {opportunity.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <Tabs defaultValue="description">
              <TabsList className="mb-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="organization">Organization</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <p>{opportunity.description}</p>
              </TabsContent>
              <TabsContent value="requirements">
                <h3 className="font-medium mb-2">Requirements:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="organization">
                <div className="space-y-4">
                  <h3 className="font-medium">{opportunity.organization}</h3>
                  <p>{opportunity.organizationDescription}</p>
                  <Link href={`/organization/${opportunity.organization.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button variant="outline">View Organization Profile</Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-6">
          {applied ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for your interest in volunteering. The organization will contact you soon with next steps.
                </p>
                <Button variant="outline" className="w-full" onClick={() => setApplied(false)}>
                  Apply to Another Position
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Interested in this opportunity?</h3>
                <div className="space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Apply Now</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Apply to Volunteer</DialogTitle>
                        <DialogDescription>
                          Fill out this form to express your interest in this volunteer opportunity.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleApply} className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">
                              First Name
                            </label>
                            <Input id="firstName" required />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">
                              Last Name
                            </label>
                            <Input id="lastName" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone
                          </label>
                          <Input id="phone" type="tel" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Why are you interested?
                          </label>
                          <Textarea id="message" placeholder="Tell us why you're interested in this opportunity" />
                        </div>
                        <div className="flex items-start space-x-2 pt-2">
                          <Checkbox id="terms" required />
                          <label htmlFor="terms" className="text-sm text-muted-foreground">
                            I agree to be contacted about this volunteer opportunity
                          </label>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Submit Application</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => setSaved(!saved)}>
                    <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
                    {saved ? "Saved" : "Save for Later"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={() => {
                      navigator
                        .share({
                          title: opportunity.title,
                          text: `Check out this volunteer opportunity: ${opportunity.title}`,
                          url: window.location.href,
                        })
                        .catch(() => {
                          // Fallback if Web Share API is not supported
                          navigator.clipboard.writeText(window.location.href)
                          alert("Link copied to clipboard!")
                        })
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{opportunity.organization}</p>
                    <p className="text-sm text-muted-foreground">{opportunity.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <p>{opportunity.contactPhone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <p>{opportunity.contactEmail}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <p>{opportunity.website}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-bold mb-4">Location</h3>
            <div className="rounded-lg overflow-hidden border h-64 bg-slate-100 flex items-center justify-center">
              <p className="text-muted-foreground">Map would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

