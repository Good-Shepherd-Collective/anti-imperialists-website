import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'opgd2bhj',
  dataset: 'production',
  token: 'skIsaUIzonbzhkPHasfuWRAM1RYfQZmGs8uGEHg6UvzQIfDVNgCFn4PssF6th6sYDIGGzmgI6sgTk63LM3eQ6rL4nv1Xaw9SkWpekvX0pPaC6JrZmXENrhJ9RbjhLQdTitzaSL1U4Ll20Nn57TPeHt9GpyBjdjpkirov0atXdN847OmzWSKP',
  apiVersion: '2024-03-29',
  useCdn: false
})

const editorialBoardMembers = [
  "Charisse Burden-Stelly",
  "Corinna Mullins",
  "Helyeh Doutaghi",
  "Jeannette Graulau",
  "Patrick Higgins",
  "Alex Aviña"
]

async function updateEditorialBoard() {
  try {
    // First get all member documents
    const members = await client.fetch('*[_type == "memberBio"]')
    
    // Create mutations for each member
    const mutations = members.map(member => ({
      patch: {
        id: member._id,
        set: {
          editorialBoardMember: editorialBoardMembers.includes(member.name)
        }
      }
    }))

    // Execute all mutations in a single transaction
    const result = await client.mutate(mutations)
    console.log('Successfully updated editorial board members:', result)
  } catch (error) {
    console.error('Error updating editorial board members:', error)
  }
}

updateEditorialBoard() 