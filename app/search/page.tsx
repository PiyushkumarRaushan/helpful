"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Clock, Filter, ArrowLeft, SearchIcon } from "lucide-react"

// In a real app, this would come from a database
const allOpportunities = [
  {
    id: 1,
    title: "Community Garden Helper",
    organization: "Green City Initiative",
    location: "Downtown Community Garden",
    distance: 1.2,
    date: "Every Saturday",
    time: "9:00 AM - 12:00 PM",
    category: "Environment",
    image: "https://media.istockphoto.com/id/1427848310/photo/multiracial-group-of-young-men-and-young-women-gather-as-volunteers-to-plant-vegetables-in.jpg?s=612x612&w=0&k=20&c=3dzwDaO5nrQBwlKW0iXAivhp9sarZma_Dp6hD40znAk=",
    skills: ["Gardening", "Physical Labor"],
    commitment: "Ongoing",
  },
  {
    id: 2,
    title: "After-School Tutor",
    organization: "Education For All",
    location: "Lincoln Elementary School",
    distance: 0.8,
    date: "Weekdays",
    time: "3:30 PM - 5:30 PM",
    category: "Education",
    image: "https://emergenttutoring.com/wp-content/uploads/2022/04/after-school-tutoring-1024x563.jpg",
    skills: ["Teaching", "Patience"],
    commitment: "Semester",
  },
  {
    id: 3,
    title: "Food Bank Assistant",
    organization: "Community Food Network",
    location: "Main Street Food Bank",
    distance: 2.5,
    date: "Mondays and Thursdays",
    time: "1:00 PM - 4:00 PM",
    category: "Community",
    image: "https://breadforthecity.org/wp-content/uploads/2023/12/49034103936_02c89897a0_c.jpg",
    skills: ["Organization", "Customer Service"],
    commitment: "Flexible",
  },
  {
    id: 4,
    title: "Animal Shelter Helper",
    organization: "Paws & Claws Rescue",
    location: "Eastside Animal Shelter",
    distance: 3.7,
    date: "Flexible",
    time: "Various shifts available",
    category: "Animals",
    image: "https://media.freemalaysiatoday.com/wp-content/uploads/2023/05/2169f788-helper.jpg",
    skills: ["Animal Care", "Cleaning"],
    commitment: "Flexible",
  },
  {
    id: 5,
    title: "Hospital Volunteer",
    organization: "City General Hospital",
    location: "City General Hospital",
    distance: 4.2,
    date: "Weekends",
    time: "10:00 AM - 2:00 PM",
    category: "Health",
    image: "https://www.imperial.nhs.uk/-/media/volunteer.jpg?rev=bbea636e878a4cb69496348489678454&bc=ffffff&w=624&h=364&as=1&la=en&hash=F4C91E8902B3738EB3703F97761035F3",
    skills: ["Compassion", "Communication"],
    commitment: "Ongoing",
  },
  {
    id: 6,
    title: "Museum Guide",
    organization: "City Art Museum",
    location: "Downtown Art District",
    distance: 1.9,
    date: "Weekends",
    time: "11:00 AM - 4:00 PM",
    category: "Arts",
    image: "https://content.yourcareer.gov.au/sites/default/files/2022-12/451411-galleryormuseumguide.jpg",
    skills: ["Art Knowledge", "Public Speaking"],
    commitment: "Ongoing",
  },
  {
    id: 7,
    title: "Youth Mentor",
    organization: "Big Brothers Big Sisters",
    location: "Various Locations",
    distance: 2.0,
    date: "Flexible",
    time: "Flexible",
    category: "Children",
    image: "https://s3.amazonaws.com/utep-uploads/wp-content/uploads/unr/2022/07/07060421/youth-mentoring-programs.jpg",
    skills: ["Mentoring", "Patience"],
    commitment: "Long-term",
  },
  {
    id: 8,
    title: "Beach Cleanup Volunteer",
    organization: "Ocean Conservancy",
    location: "City Beach",
    distance: 5.5,
    date: "First Saturday of each month",
    time: "8:00 AM - 11:00 AM",
    category: "Environment",
    image: "https://www.parksconservancy.org/sites/default/files/styles/hero/public/hero/20130713-A_OCBE_130713_MDu_77_hero.jpg?itok=8bmDDcA4&timestamp=1542497091",
    skills: ["Environmental Awareness", "Physical Labor"],
    commitment: "One-time",
  },
]


const categories = ["Education", "Environment", "Health", "Animals", "Community", "Arts", "Children", "International"]

const commitmentTypes = ["One-time", "Flexible", "Ongoing", "Long-term", "Semester"]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [maxDistance, setMaxDistance] = useState(10)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCommitments, setSelectedCommitments] = useState<string[]>([])
  const [filteredOpportunities, setFilteredOpportunities] = useState(allOpportunities)

  // Initialize filters from URL params
  useEffect(() => {
    const locationParam = searchParams.get("location")
    const categoryParam = searchParams.get("category")

    console.log("URL params:", { location: locationParam, category: categoryParam })

    if (locationParam) {
      setSearchTerm(locationParam)
    }

    if (categoryParam) {
      console.log("Setting category:", categoryParam)
      // Make sure we're not adding duplicates
      if (!selectedCategories.includes(categoryParam)) {
        setSelectedCategories([categoryParam])
      }
    }
  }, [searchParams])

  useEffect(() => {
    // Create a copy of allOpportunities to avoid modifying the original
    let results = [...allOpportunities]

    // Filter by search term (location or title)
    if (searchTerm) {
      results = results.filter(
        (opp) =>
          opp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by distance
    results = results.filter((opp) => opp.distance <= maxDistance)

    // Filter by categories
    if (selectedCategories.length > 0) {
      results = results.filter((opp) =>
        selectedCategories.some((cat) => opp.category.toLowerCase() === cat.toLowerCase()),
      )
    }

    // Filter by commitment type
    if (selectedCommitments.length > 0) {
      results = results.filter((opp) => selectedCommitments.includes(opp.commitment))
    }

    setFilteredOpportunities(results)
  }, [searchTerm, maxDistance, selectedCategories, selectedCommitments]) // Include all dependencies

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleCommitment = (commitment: string) => {
    setSelectedCommitments((prev) =>
      prev.includes(commitment) ? prev.filter((c) => c !== commitment) : [...prev, commitment],
    )
  }

  return (
    <div className="container py-8">
      <Link href="/" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Mobile Toggle */}
        <div className="md:hidden mb-4">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="h-4 w-4" />
            {filterOpen ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Filters Sidebar */}
        <div className={`${filterOpen ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}>
          <div className="sticky top-4 space-y-6">
            <div>
              <h2 className="font-semibold mb-4">Search</h2>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Location or keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-4">Distance</h2>
              <div className="space-y-4">
                <Slider
                  value={[maxDistance]}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={(value) => setMaxDistance(value[0])}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Max: {maxDistance} miles</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-4">Commitment</h2>
              <div className="space-y-2">
                {commitmentTypes.map((commitment) => (
                  <div key={commitment} className="flex items-center space-x-2">
                    <Checkbox
                      id={`commitment-${commitment}`}
                      checked={selectedCommitments.includes(commitment)}
                      onCheckedChange={() => toggleCommitment(commitment)}
                    />
                    <label
                      htmlFor={`commitment-${commitment}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {commitment}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSearchTerm("")
                setMaxDistance(10)
                setSelectedCategories([])
                setSelectedCommitments([])
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{filteredOpportunities.length} Volunteer Opportunities</h1>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredOpportunities.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setMaxDistance(10)
                  setSelectedCategories([])
                  setSelectedCommitments([])
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="overflow-hidden flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={opportunity.image || "/placeholder.svg"}
                      alt={opportunity.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3">{opportunity.category}</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <h3 className="font-bold text-lg">{opportunity.title}</h3>
                    <p className="text-sm text-muted-foreground">{opportunity.organization}</p>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm">{opportunity.location}</p>
                        <p className="text-xs text-muted-foreground">{opportunity.distance} miles away</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm">{opportunity.date}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm">{opportunity.time}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {opportunity.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/opportunity/${opportunity.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

