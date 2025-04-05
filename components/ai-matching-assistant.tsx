"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSpring, animated } from "react-spring"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bot, Sparkles, X, ChevronRight, ThumbsUp, ThumbsDown, Send, Search } from "lucide-react"
import Link from "next/link"

// Types for better type safety
type Opportunity = {
  id: number
  title: string
  organization: string
  match?: number
  skills: string[]
  location: string
  commitment: string
  distance?: number
  date?: string
  time?: string
  category?: string
  image?: string
}

// Mock data with proper typing
const mockOpportunities: Opportunity[] = [
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


export default function AiMatchingAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Opportunity[]>([])
  const [skills, setSkills] = useState<string[]>(["Community Garden Helper", "After-School Tutor", "Food Bank Assistant", "Animal Shelter Helper"])
  const [locationPreference, setLocationPreference] = useState<number[]>([25])
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [step, setStep] = useState(0)

  const pulseAnimation = useSpring({
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.05)" },
    config: { duration: 1000 },
    loop: { reverse: true },
  })

  const filterOpportunities = (query: string): Opportunity[] => {
    if (!query.trim()) return mockOpportunities
    
    const queryLower = query.toLowerCase()
    return mockOpportunities.filter(opportunity => {
      const fieldsToSearch = [
        opportunity.title,
        opportunity.organization,
        ...opportunity.skills,
        opportunity.category || ""
      ]
      
      return fieldsToSearch.some(field => 
        field.toLowerCase().includes(queryLower)
      )
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      const filteredResults = searchQuery 
        ? filterOpportunities(searchQuery) 
        : mockOpportunities
          .filter(opp => !remoteOnly || opp.location.toLowerCase() === "remote")
          .filter(opp => opp.distance ? opp.distance <= locationPreference[0] : true)
          .filter(opp => skills.some(skill => opp.skills.includes(skill)))
      
      setResults(filteredResults)
      setIsLoading(false)
      setStep(2)
    }, 800)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setStep(0)
      setSearchQuery("")
      setResults([])
    }, 500)
  }

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill)) {
      setSkills([...skills, skill])
    }
  }

  return (
    <>
      <animated.div style={pulseAnimation} className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90"
          aria-label="Open volunteer matching assistant"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </animated.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-full max-w-md z-50"
          >
            <Card className="shadow-xl border-primary/20">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Opportunity Matcher</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Find volunteer opportunities that match your skills</CardDescription>
              </CardHeader>

              <CardContent className="p-4 max-h-[60vh] overflow-y-auto">
                {step === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search opportunities..."
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Your skills</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="px-2 py-1">
                              {skill}
                              <button
                                className="ml-1 text-muted-foreground hover:text-foreground"
                                onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                                aria-label={`Remove ${skill}`}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {/* <input
                            type="text"
                            placeholder="Add a skill"
                            className="flex-1 px-3 py-2 border rounded-md text-sm"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                addSkill(e.currentTarget.value.trim())
                                e.currentTarget.value = ''
                              }
                            }}
                          />
                          <Button 
                            variant="outline"
                            onClick={() => {
                              const input = document.querySelector('input[placeholder="Add a skill"]') as HTMLInputElement
                              if (input?.value.trim()) {
                                addSkill(input.value.trim())
                                input.value = ''
                              }
                            }}
                          >
                            Add
                          </Button> */}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Maximum distance: {locationPreference[0]} miles</Label>
                        <Slider
                          value={locationPreference}
                          min={5}
                          max={100}
                          step={5}
                          onValueChange={setLocationPreference}
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>5 miles</span>
                          <span>100 miles</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="remote-only" 
                          checked={remoteOnly} 
                          onCheckedChange={setRemoteOnly} 
                        />
                        <Label htmlFor="remote-only">Remote opportunities only</Label>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6" 
                      onClick={() => setStep(1)}
                      disabled={skills.length === 0}
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h3 className="font-medium mb-2">Refine your search</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Textarea
                        placeholder="Tell us more about what you're looking for (e.g., preferred causes, availability)"
                        className="resize-none min-h-[120px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="animate-pulse">Finding matches...</span>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Find Matches
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">
                        {results.length} {results.length === 1 ? 'match' : 'matches'} found
                      </h3>
                      <button 
                        onClick={() => setStep(0)}
                        className="text-sm text-primary hover:underline"
                      >
                        Modify search
                      </button>
                    </div>

                    {results.length > 0 ? (
                      <div className="space-y-3">
                        {results.map((opportunity) => (
                          <OpportunityCard 
                            key={`${opportunity.id}-${opportunity.title}`} 
                            opportunity={opportunity} 
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No matches found</p>
                        <Button 
                          variant="outline" 
                          onClick={() => setStep(0)}
                        >
                          Try different criteria
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Extracted Opportunity Card component for better readability
const OpportunityCard = ({ opportunity }: { opportunity: Opportunity }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow">
    <div 
      className="bg-gradient-to-r from-primary to-secondary h-1.5"
      style={{ width: `${opportunity.match || 85}%` }}
    />
    <CardContent className="p-4">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-semibold leading-tight">{opportunity.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{opportunity.organization}</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 border-primary/20">
          {opportunity.match || 85}% Match
        </Badge>
      </div>

      <div className="flex flex-wrap gap-1.5 my-3">
        {opportunity.skills.map((skill, i) => (
          <Badge key={i} variant="secondary" className="text-xs font-normal">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>{opportunity.location}</span>
        <span>{opportunity.commitment}</span>
      </div>

      <div className="flex justify-between mt-4 pt-3 border-t">
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ThumbsUp className="h-4 w-4 mr-1" />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ThumbsDown className="h-4 w-4 mr-1" />
            Pass
          </Button>
        </div>
        <Link href={`/opportunities/${opportunity.id}`} passHref>
          <Button size="sm" className="h-8">
            Details
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
)