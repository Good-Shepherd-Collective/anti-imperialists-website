import React, { useCallback } from 'react'
import { Card, Button } from '@sanity/ui'
import { useClient } from 'sanity'

export function MultiImageInput() {
  const client = useClient()

  const uploadImages = useCallback(async (event) => {
    const files = Array.from(event.target.files)
    
    try {
      // Create a document for each image
      const promises = files.map(async (file) => {
        // Upload the image asset
        const imageAsset = await client.assets.upload('image', file)
        
        // Create the document with the image reference
        await client.create({
          _type: 'photos',
          image: {
            _type: 'image',
            asset: {
              _type: "reference",
              _ref: imageAsset._id
            }
          }
        })
      })

      await Promise.all(promises)
      // Optionally refresh the page or show success message
      window.location.reload()
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }, [client])

  return (
    <Card padding={4}>
      <Button 
        tone="primary" 
        text="Upload Multiple Photos"
        onClick={() => document.getElementById('multiImageInput').click()}
      />
      <input
        id="multiImageInput"
        type="file"
        accept="image/*"
        multiple
        onChange={uploadImages}
        style={{ display: 'none' }}
      />
    </Card>
  )
} 