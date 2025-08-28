import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'opgd2bhj',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-21',
  token: process.env.SANITY_AUTH_TOKEN
})

// Run the update query
const transaction = client.transaction()

client
  .fetch('*[_type == "memberBio"]._id')
  .then(ids => {
    ids.forEach(id => {
      transaction.patch(id, {
        set: { editorialBoardMember: true }
      })
    })
    return transaction.commit()
  })
  .then(result => {
    console.log('Update completed:', result)
  })
  .catch(err => {
    console.error('Update failed:', err.message)
  }) 