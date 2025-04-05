import { db } from "./firebase"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  serverTimestamp,
  limit,
  orderBy,
  startAfter,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore"

export type Volunteer = {
  id: string
  name: string
  email: string
  location: string
  skills: string[]
  interests: string[]
  availability: {
    weekdays: boolean
    weekends: boolean
    mornings: boolean
    afternoons: boolean
    evenings: boolean
  }
  totalHours: number
  badges: string[]
}

export type Organization = {
  id: string
  name: string
  description: string
  website: string
  email: string
  phone: string
  address: string
  logo: string
}

export type Opportunity = {
  id: string
  title: string
  organizationId: string
  description: string
  location: {
    address: string
    city: string
    state: string
    zip: string
    coordinates: {
      latitude: number
      longitude: number
    }
  }
  date: string
  time: string
  category: string
  skills: string[]
  requirements: string[]
  commitment: string
  image: string
}

// Opportunities
export async function getOpportunities(
  filters?: {
    location?: string
    category?: string
    distance?: number
    skills?: string[]
    commitment?: string
  },
  lastDoc?: QueryDocumentSnapshot<DocumentData>,
  itemsPerPage = 10,
) {
  try {
    const q = collection(db, "opportunities")
    const constraints = []

    if (filters?.category) {
      constraints.push(where("category", "==", filters.category))
    }

    if (filters?.commitment) {
      constraints.push(where("commitment", "==", filters.commitment))
    }

    if (filters?.skills && filters.skills.length > 0) {
      // Note: Firebase doesn't support array-contains-any with multiple array-contains
      // This is a limitation and would require a different data model or client-side filtering
      constraints.push(where("skills", "array-contains-any", filters.skills))
    }

    constraints.push(orderBy("createdAt", "desc"))

    if (lastDoc) {
      constraints.push(startAfter(lastDoc))
    }

    constraints.push(limit(itemsPerPage))

    const opportunitiesQuery = query(q, ...constraints)
    const querySnapshot = await getDocs(opportunitiesQuery)

    const opportunities = []
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]

    for (const doc of querySnapshot.docs) {
      const opportunity = { id: doc.id, ...doc.data() }

      // Get organization details
      const orgDoc = await getDoc(doc(db, "organizations", opportunity.organizationId))
      opportunity.organization = orgDoc.exists() ? { id: orgDoc.id, ...orgDoc.data() } : null

      opportunities.push(opportunity)
    }

    // Client-side filtering for location/distance if needed
    // This is not ideal for large datasets but works for demo purposes
    let filteredOpportunities = opportunities
    if (filters?.location) {
      filteredOpportunities = filteredOpportunities.filter(
        (opp) =>
          opp.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
          opp.location.state.toLowerCase().includes(filters.location.toLowerCase()),
      )
    }

    return {
      opportunities: filteredOpportunities,
      lastDoc: lastVisible,
    }
  } catch (error) {
    console.error("Error getting opportunities:", error)
    throw error
  }
}

export async function getOpportunityById(id: string) {
  try {
    const docRef = doc(db, "opportunities", id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return null
    }

    const opportunity = { id: docSnap.id, ...docSnap.data() }

    // Get organization details
    const orgDoc = await getDoc(doc(db, "organizations", opportunity.organizationId))
    opportunity.organization = orgDoc.exists() ? { id: orgDoc.id, ...orgDoc.data() } : null

    return opportunity
  } catch (error) {
    console.error("Error getting opportunity:", error)
    throw error
  }
}

// User profiles
export async function getVolunteerProfile(userId: string) {
  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return null
    }

    return { id: docSnap.id, ...docSnap.data() }
  } catch (error) {
    console.error("Error getting volunteer profile:", error)
    throw error
  }
}

// Applications
export async function applyForOpportunity(opportunityId: string, volunteerId: string, message: string) {
  try {
    await addDoc(collection(db, "applications"), {
      opportunityId,
      volunteerId,
      message,
      status: "pending",
      createdAt: serverTimestamp(),
    })

    return true
  } catch (error) {
    console.error("Error applying for opportunity:", error)
    throw error
  }
}

// Saved opportunities
export async function saveOpportunity(opportunityId: string, volunteerId: string) {
  try {
    // Check if already saved
    const q = query(
      collection(db, "savedOpportunities"),
      where("opportunityId", "==", opportunityId),
      where("volunteerId", "==", volunteerId),
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      await addDoc(collection(db, "savedOpportunities"), {
        opportunityId,
        volunteerId,
        savedAt: serverTimestamp(),
      })
    }

    return true
  } catch (error) {
    console.error("Error saving opportunity:", error)
    throw error
  }
}

export async function unsaveOpportunity(opportunityId: string, volunteerId: string) {
  try {
    const q = query(
      collection(db, "savedOpportunities"),
      where("opportunityId", "==", opportunityId),
      where("volunteerId", "==", volunteerId),
    )

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docToDelete = querySnapshot.docs[0]
      await deleteDoc(doc(db, "savedOpportunities", docToDelete.id))
    }

    return true
  } catch (error) {
    console.error("Error unsaving opportunity:", error)
    throw error
  }
}

// Get user's saved opportunities
export async function getSavedOpportunities(volunteerId: string) {
  try {
    const q = query(collection(db, "savedOpportunities"), where("volunteerId", "==", volunteerId))

    const querySnapshot = await getDocs(q)
    const savedOpportunities = []

    for (const doc of querySnapshot.docs) {
      const saved = doc.data()
      const opportunityDoc = await getDoc(doc(db, "opportunities", saved.opportunityId))

      if (opportunityDoc.exists()) {
        const opportunity = { id: opportunityDoc.id, ...opportunityDoc.data() }

        // Get organization details
        const orgDoc = await getDoc(doc(db, "organizations", opportunity.organizationId))
        opportunity.organization = orgDoc.exists() ? { id: orgDoc.id, ...orgDoc.data() } : null

        savedOpportunities.push(opportunity)
      }
    }

    return savedOpportunities
  } catch (error) {
    console.error("Error getting saved opportunities:", error)
    throw error
  }
}

