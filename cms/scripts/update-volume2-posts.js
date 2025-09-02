import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'opgd2bhj',
  dataset: 'production',
  apiVersion: '2024-03-28',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN // You'll need to set this
})

const updates = [
  { title: "The Anti-Imperialist Scholars Collective Black August Issue", order: 1, id: "7dacaa4d-e964-4bba-9b1a-87b59d72bc6b" },
  { title: "Red Scare Tactics and the Criminalization of Radical Fightback", order: 2, id: "53eb6093-368f-4fc3-98d9-c8c567b0796a" },
  { title: "The Military Occupation of Washington, DC: Then and Now", order: 3, id: "c0ec01b2-3722-4024-a23e-8eeebf495e9e" },
  { title: "The Anti-Imperialist Struggle, Black August, and Cuban Liberation", order: 4, id: "4eb28e2d-810c-4b80-ab7c-39c507329624" },
  { title: "It's Midnight Already", order: 5, id: "afba7f9a-9dfb-46f8-86a5-db907ed50d86" },
  { title: "Blood in My Eye", order: 6, id: "803b625b-8cd1-4bb2-9f7e-a0b1a67ce831" },
  { title: "Queer-Feminism and Genocide", order: 7, id: "eccb2caf-9fb7-4c36-818f-4ae5ad5355a9" },
  { title: "The Role of the Anti-Imperialist Intellectual", order: 8, id: "d202f0b7-5e95-4394-b227-c1e28d2dacee" },
  { title: "Iran, Zionism, and the Defeat of the Imperialist Narrative", order: 9, id: "b02d9598-254c-4fa6-bbec-607b4f95afc6" }
]

async function updatePosts() {
  console.log('Updating Volume 2 blog posts...')
  
  for (const post of updates) {
    try {
      await client
        .patch(post.id)
        .set({ 
          order: post.order,
          tags: ["Black August"]
        })
        .commit()
      
      console.log(`✓ Updated: ${post.title} (order: ${post.order})`)
    } catch (error) {
      console.error(`✗ Failed to update ${post.title}:`, error.message)
    }
  }
  
  console.log('\nAll updates complete!')
}

updatePosts()