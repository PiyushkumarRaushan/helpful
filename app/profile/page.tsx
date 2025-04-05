"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MapPin, Award, Edit, Settings, Sparkles } from "lucide-react"
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default  function Profile() {
  const [user, setUser] = useState<{ name?: string; email?: string; photoURL?: string; bio?: string; phone?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming")
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data found.</p>;
    // In a real app, this would come from a database
    const upcomingOpportunities = [
      {
        id: 1,
        title: "Community Garden Helper",
        organization: "Green City Initiative",
        location: "Downtown Community Garden",
        date: "Saturday, Mar 20",
        time: "9:00 AM - 12:00 PM",
        image: "https://media.istockphoto.com/id/1427848310/photo/multiracial-group-of-young-men-and-young-women-gather-as-volunteers-to-plant-vegetables-in.jpg?s=612x612&w=0&k=20&c=3dzwDaO5nrQBwlKW0iXAivhp9sarZma_Dp6hD40znAk=",
      },
      {
        id: 2,
        title: "Food Bank Assistant",
        organization: "Community Food Network",
        location: "Main Street Food Bank",
        date: "Thursday, Mar 25",
        time: "1:00 PM - 4:00 PM",
        image: "https://www.bu.edu/bostonia/files/2015/11/h_bostonia_15-9287-BMCFOOD-190.jpg",
      },
    ]
  
    const pastOpportunities = [
      {
        id: 3,
        title: "Beach Cleanup",
        organization: "Ocean Conservancy",
        location: "City Beach",
        date: "February 15, 2023",
        hours: 3,
        image: "https://www.parksconservancy.org/sites/default/files/styles/hero/public/hero/20130713-A_OCBE_130713_MDu_77_hero.jpg?itok=8bmDDcA4&timestamp=1542497091",
      },
      {
        id: 4,
        title: "Animal Shelter Helper",
        organization: "Paws & Claws Rescue",
        location: "Eastside Animal Shelter",
        date: "January 22, 2023",
        hours: 4,
        image: "https://media.freemalaysiatoday.com/wp-content/uploads/2023/05/2169f788-helper.jpg",
      },
      {
        id: 5,
        title: "Homeless Shelter Meal Service",
        organization: "City Homeless Coalition",
        location: "Downtown Shelter",
        date: "December 24, 2022",
        hours: 5,
        image: "/placeholder.svg?height=100&width=100",
      },
    ]
  
    const savedOpportunities = [
      {
        id: 6,
        title: "Museum Guide",
        organization: "City Art Museum",
        location: "Downtown Art District",
        date: "Weekends",
        time: "11:00 AM - 4:00 PM",
        image: "https://content.yourcareer.gov.au/sites/default/files/2022-12/451411-galleryormuseumguide.jpg",
      },
      {
        id: 7,
        title: "Youth Mentor",
        organization: "Big Brothers Big Sisters",
        location: "Various Locations",
        date: "Flexible",
        time: "Flexible",
        image: "https://s3.amazonaws.com/utep-uploads/wp-content/uploads/unr/2022/07/07060421/youth-mentoring-programs.jpg?itok=8bmDDcA4&timestamp=1542497091",
      },
    ]
  
    const skills = [
      { name: "Communication", level: 85 },
      { name: "Leadership", level: 70 },
      { name: "Organization", level: 90 },
      { name: "Problem Solving", level: 75 },
    ]
  
    const interests = ["Environment", "Education", "Animals", "Community"]
  
    const totalHours = pastOpportunities.reduce((sum, opp) => sum + opp.hours, 0)
  
    // Recommended opportunities based on skills and interests
    const recommendedOpportunities = [
      {
        id: 8,
        title: "Team Leader for Community Cleanup",
        organization: "City Parks Department",
        match: 95,
        skills: ["Leadership", "Organization"],
        location: "Various City Parks",
        date: "April 15, 2023",
      },
      {
        id: 9,
        title: "Environmental Education Assistant",
        organization: "Nature Learning Center",
        match: 92,
        skills: ["Communication", "Education"],
        location: "Westside Nature Preserve",
        date: "Ongoing",
      },
    ]
  
    const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      },
    }

    return (
      <div className="container py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn}>
              <Card className="overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary to-secondary" />
                <CardContent className="pt-0 relative">
                  <div className="flex flex-col items-center -mt-12 text-center">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold mt-4">{user.displayName }</h1>
                    <p className="text-black-200">{user.email}</p>
                    <p className="text-muted-foreground mb-4">Sundar nagar Rajpura, Punjab</p>
                    <div className="flex gap-2 mb-4">
                      <Link href="/edit">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Edit className="h-4 w-4" />
                          Edit Profile
                        </Button>
                      </Link>
                      <Link href="/settings">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Settings className="h-4 w-4" />
                          Settings
                        </Button>
                      </Link>
                    </div>
                    <div className="w-full p-4 bg-primary/10 rounded-lg mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Total Volunteer Hours</span>
                        <span className="font-bold">{totalHours} hours</span>
                      </div>
                      <Progress value={Math.min((totalHours / 50) * 100, 100)} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        {50 - totalHours > 0 ? `${50 - totalHours} hours until next badge` : "Badge earned!"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        Environmental Champion
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        10+ Hours
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
  
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
  
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    Edit Interests
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
  
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle>Recommended For You</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {recommendedOpportunities.map((opportunity) => (
                      <div key={opportunity.id} className="border rounded-lg p-3 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{opportunity.title}</h3>
                          <Badge variant="outline" className="bg-primary/10 border-primary/20 text-xs">
                            {opportunity.match}% Match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{opportunity.organization}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {opportunity.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{opportunity.location}</span>
                          <span>{opportunity.date}</span>
                        </div>
                        <div className="mt-3">
                          <Link href={`/opportunity/${opportunity.id}`}>
                            <Button size="sm" variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
  
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
  
              <TabsContent value="upcoming" className="space-y-6">
                <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn}>
                  <h2 className="text-2xl font-bold mb-4">Upcoming Opportunities</h2>
                  {upcomingOpportunities.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground mb-4">You don't have any upcoming volunteer opportunities.</p>
                        <Link href="/search">
                          <Button>Find Opportunities</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ) : (
                    upcomingOpportunities.map((opportunity, index) => (
                      <motion.div
                        key={opportunity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Card className="overflow-hidden hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              <img
                                src={opportunity.image || "/placeholder.svg"}
                                alt={opportunity.title}
                                className="w-20 h-20 rounded-md object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-bold text-lg">{opportunity.title}</h3>
                                <p className="text-muted-foreground">{opportunity.organization}</p>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{opportunity.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{opportunity.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{opportunity.time}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Link href={`/opportunity/${opportunity.id}`}>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </Link>
                                <Button variant="ghost" size="sm">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </TabsContent>
  
              <TabsContent value="past" className="space-y-6">
                <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn}>
                  <h2 className="text-2xl font-bold mb-4">Past Opportunities</h2>
                  {pastOpportunities.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground">You don't have any past volunteer opportunities.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    pastOpportunities.map((opportunity, index) => (
                      <motion.div
                        key={opportunity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Card className="overflow-hidden hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              <img
                                src={opportunity.image || "/placeholder.svg"}
                                alt={opportunity.title}
                                className="w-20 h-20 rounded-md object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-bold text-lg">{opportunity.title}</h3>
                                <p className="text-muted-foreground">{opportunity.organization}</p>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{opportunity.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{opportunity.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{opportunity.hours} hours</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Link href={`/opportunity/${opportunity.id}`}>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </Link>
                                <Button variant="ghost" size="sm">
                                  Leave Review
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </TabsContent>
  
              <TabsContent value="saved" className="space-y-6">
                <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn}>
                  <h2 className="text-2xl font-bold mb-4">Saved Opportunities</h2>
                  {savedOpportunities.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground mb-4">You don't have any saved volunteer opportunities.</p>
                        <Link href="/search">
                          <Button>Find Opportunities</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ) : (
                    savedOpportunities.map((opportunity, index) => (
                      <motion.div
                        key={opportunity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Card className="overflow-hidden hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              <img
                                src={opportunity.image || "/placeholder.svg"}
                                alt={opportunity.title}
                                className="w-20 h-20 rounded-md object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-bold text-lg">{opportunity.title}</h3>
                                <p className="text-muted-foreground">{opportunity.organization}</p>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{opportunity.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{opportunity.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{opportunity.time}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Link href={`/opportunity/${opportunity.id}`}>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </Link>
                                <Button variant="ghost" size="sm">
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
}


export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // In a real app, this would come from a database
  const upcomingOpportunities = [
    {
      id: 1,
      title: "Community Garden Helper",
      organization: "Green City Initiative",
      location: "Downtown Community Garden",
      date: "Saturday, Mar 20",
      time: "9:00 AM - 12:00 PM",
      image: "https://media.istockphoto.com/id/1427848310/photo/multiracial-group-of-young-men-and-young-women-gather-as-volunteers-to-plant-vegetables-in.jpg?s=612x612&w=0&k=20&c=3dzwDaO5nrQBwlKW0iXAivhp9sarZma_Dp6hD40znAk=",
    },
    {
      id: 2,
      title: "Food Bank Assistant",
      organization: "Community Food Network",
      location: "Main Street Food Bank",
      date: "Thursday, Mar 25",
      time: "1:00 PM - 4:00 PM",
      image: "https://www.bu.edu/bostonia/files/2015/11/h_bostonia_15-9287-BMCFOOD-190.jpg",
    },
  ]

  const pastOpportunities = [
    {
      id: 3,
      title: "Beach Cleanup",
      organization: "Ocean Conservancy",
      location: "City Beach",
      date: "February 15, 2023",
      hours: 3,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      title: "Animal Shelter Helper",
      organization: "Paws & Claws Rescue",
      location: "Eastside Animal Shelter",
      date: "January 22, 2023",
      hours: 4,
      image: "https://media.freemalaysiatoday.com/wp-content/uploads/2023/05/2169f788-helper.jpg",
    },
    {
      id: 5,
      title: "Homeless Shelter Meal Service",
      organization: "City Homeless Coalition",
      location: "Downtown Shelter",
      date: "December 24, 2022",
      hours: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const savedOpportunities = [
    {
      id: 6,
      title: "Museum Guide",
      organization: "City Art Museum",
      location: "Downtown Art District",
      date: "Weekends",
      time: "11:00 AM - 4:00 PM",
      image: "https://content.yourcareer.gov.au/sites/default/files/2022-12/451411-galleryormuseumguide.jpg",
    },
    {
      id: 7,
      title: "Youth Mentor",
      organization: "Big Brothers Big Sisters",
      location: "Various Locations",
      date: "Flexible",
      time: "Flexible",
      image: "https://s3.amazonaws.com/utep-uploads/wp-content/uploads/unr/2022/07/07060421/youth-mentoring-programs.jpg?itok=8bmDDcA4&timestamp=1542497091",
    },
  ]

  const skills = [
    { name: "Communication", level: 85 },
    { name: "Leadership", level: 70 },
    { name: "Organization", level: 90 },
    { name: "Problem Solving", level: 75 },
  ]

  const interests = ["Environment", "Education", "Animals", "Community"]

  const totalHours = pastOpportunities.reduce((sum, opp) => sum + opp.hours, 0)

  // Recommended opportunities based on skills and interests
  const recommendedOpportunities = [
    {
      id: 8,
      title: "Team Leader for Community Cleanup",
      organization: "City Parks Department",
      match: 95,
      skills: ["Leadership", "Organization"],
      location: "Various City Parks",
      date: "April 15, 2023",
    },
    {
      id: 9,
      title: "Environmental Education Assistant",
      organization: "Nature Learning Center",
      match: 92,
      skills: ["Communication", "Education"],
      location: "Westside Nature Preserve",
      date: "Ongoing",
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn}>
            <Card className="overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-primary to-secondary" />
              <CardContent className="pt-0 relative">
                <div className="flex flex-col items-center -mt-12 text-center">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold mt-4">Jane Doe</h1>
                  <p className="text-muted-foreground mb-4">San Francisco, CA</p>
                  <div className="flex gap-2 mb-4">
                    <Link href="/profile/edit">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Link href="/settings">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Settings className="h-4 w-4" />
                        Settings
                      </Button>
                    </Link>
                  </div>
                  <div className="w-full p-4 bg-primary/10 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Total Volunteer Hours</span>
                      <span className="font-bold">{totalHours} hours</span>
                    </div>
                    <Progress value={Math.min((totalHours / 50) * 100, 100)} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {50 - totalHours > 0 ? `${50 - totalHours} hours until next badge` : "Badge earned!"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Environmental Champion
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      10+ Hours
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge key={interest} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  Edit Interests
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle>Recommended For You</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {recommendedOpportunities.map((opportunity) => (
                    <div key={opportunity.id} className="border rounded-lg p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{opportunity.title}</h3>
                        <Badge variant="outline" className="bg-primary/10 border-primary/20 text-xs">
                          {opportunity.match}% Match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{opportunity.organization}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {opportunity.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{opportunity.location}</span>
                        <span>{opportunity.date}</span>
                      </div>
                      <div className="mt-3">
                        <Link href={`/opportunity/${opportunity.id}`}>
                          <Button size="sm" variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn}>
                <h2 className="text-2xl font-bold mb-4">Upcoming Opportunities</h2>
                {upcomingOpportunities.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground mb-4">You don't have any upcoming volunteer opportunities.</p>
                      <Link href="/search">
                        <Button>Find Opportunities</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  upcomingOpportunities.map((opportunity, index) => (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <img
                              src={opportunity.image || "/placeholder.svg"}
                              alt={opportunity.title}
                              className="w-20 h-20 rounded-md object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-lg">{opportunity.title}</h3>
                              <p className="text-muted-foreground">{opportunity.organization}</p>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{opportunity.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{opportunity.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{opportunity.time}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Link href={`/opportunity/${opportunity.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                              <Button variant="ghost" size="sm">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn}>
                <h2 className="text-2xl font-bold mb-4">Past Opportunities</h2>
                {pastOpportunities.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">You don't have any past volunteer opportunities.</p>
                    </CardContent>
                  </Card>
                ) : (
                  pastOpportunities.map((opportunity, index) => (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <img
                              src={opportunity.image || "/placeholder.svg"}
                              alt={opportunity.title}
                              className="w-20 h-20 rounded-md object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-lg">{opportunity.title}</h3>
                              <p className="text-muted-foreground">{opportunity.organization}</p>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{opportunity.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{opportunity.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{opportunity.hours} hours</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Link href={`/opportunity/${opportunity.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                              <Button variant="ghost" size="sm">
                                Leave Review
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="saved" className="space-y-6">
              <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn}>
                <h2 className="text-2xl font-bold mb-4">Saved Opportunities</h2>
                {savedOpportunities.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground mb-4">You don't have any saved volunteer opportunities.</p>
                      <Link href="/search">
                        <Button>Find Opportunities</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  savedOpportunities.map((opportunity, index) => (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <img
                              src={opportunity.image || "/placeholder.svg"}
                              alt={opportunity.title}
                              className="w-20 h-20 rounded-md object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-lg">{opportunity.title}</h3>
                              <p className="text-muted-foreground">{opportunity.organization}</p>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{opportunity.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{opportunity.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{opportunity.time}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Link href={`/opportunity/${opportunity.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                              <Button variant="ghost" size="sm">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

