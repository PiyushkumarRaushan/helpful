import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock } from "lucide-react"

// In a real app, this would come from a database
const opportunities = [
  {
    id: 1,
    title: "Community Garden Helper",
    organization: "Green City Initiative",
    location: "Downtown Community Garden",
    distance: "1.2 miles away",
    date: "Every Saturday",
    time: "9:00 AM - 12:00 PM",
    category: "Environment",
    image: "https://cdn.shopify.com/s/files/1/0579/7924/0580/files/62b9e4e721_480x480.jpg?v=1705996755",
  },
  {
    id: 2,
    title: "After-School Tutor",
    organization: "Education For All",
    location: "Lincoln Elementary School",
    distance: "0.8 miles away",
    date: "Weekdays",
    time: "3:30 PM - 5:30 PM",
    category: "Education",
    image: "https://emergenttutoring.com/wp-content/uploads/2022/04/after-school-tutoring-1024x563.jpg",
  },
  {
    id: 3,
    title: "Food Bank Assistant",
    organization: "Community Food Network",
    location: "Main Street Food Bank",
    distance: "2.5 miles away",
    date: "Mondays and Thursdays",
    time: "1:00 PM - 4:00 PM",
    category: "Community",
    image: "https://www.bu.edu/bostonia/files/2015/11/h_bostonia_15-9287-BMCFOOD-190.jpg",
  },
  {
    id: 4,
    title: "Animal Shelter Helper",
    organization: "Paws & Claws Rescue",
    location: "Eastside Animal Shelter",
    distance: "3.7 miles away",
    date: "Flexible",
    time: "Various shifts available",
    category: "Animals",
    image: "https://media.istockphoto.com/id/1345007530/photo/young-woman-in-animal-shelter.jpg?s=612x612&w=0&k=20&c=4fkUStW8O3IKvkNw8OyOUsoB8Z-mDkUjR7QFLbuyDig=",
  },

]


export default function VolunteerOpportunities() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {opportunities.map((opportunity) => (
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
                <p className="text-xs text-muted-foreground">{opportunity.distance}</p>
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
  )
}

