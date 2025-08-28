import React, {useCallback, useState} from 'react'
import {Card, Stack, Text, Button, Container, Box} from '@sanity/ui'
import {useClient} from 'sanity'
import {useRouter} from 'sanity/router'
import mammoth from 'mammoth'
import {nanoid} from 'nanoid'

const uploadImageBuffer = async (arrayBuffer, filename, client) => {
  const blob = new Blob([arrayBuffer], { type: 'image/png' })
  const imageFile = new File([blob], filename, { type: 'image/png' })
  return client.assets.upload('image', imageFile)
}

export default function WordImportTool() {
  const [isLoading, setIsLoading] = useState(false)
  const client = useClient()
  const router = useRouter()

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsLoading(true)
    try {
      const arrayBuffer = await file.arrayBuffer()
      
      const result = await mammoth.convertToHtml({
        arrayBuffer: arrayBuffer,
        styleMap: [
          "p[style-name='Normal'] => p",
          "p[style-name='Body Text'] => p",
          "p[style-name='Heading 1'] => h1",
          "p[style-name='Heading 2'] => h2",
          "p[style-name='Heading 3'] => h3"
        ],
        ignoreEmptyParagraphs: false,
        includeDefaultStyleMap: true,
        convertFootnotes: "extract"
      })

      console.log('Mammoth conversion result:', result.value)

      // Convert main content to blocks
      const blocks = []
      const parser = new DOMParser()
      const doc = parser.parseFromString(result.value, 'text/html')

      // Process main content with footnote references
      const elements = Array.from(doc.body.children)
      for (const element of elements) {
        // Skip truly empty elements (no text content at all)
        if (!element.textContent.trim()) continue

        // Log any links found in this element
        const links = element.getElementsByTagName('a')
        if (links.length > 0) {
          console.log('Found links in element:', Array.from(links).map(link => ({
            text: link.textContent,
            href: link.getAttribute('href')
          })))
        }

        // Determine the style based on element type
        let style = 'normal'
        switch (element.tagName.toLowerCase()) {
          case 'h1': style = 'h1'; break
          case 'h2': style = 'h2'; break
          case 'h3': style = 'h3'; break
          case 'p': style = 'normal'; break
          case 'ol': {
            // Split footnotes into separate blocks
            const footnotes = element.textContent.split('↑').filter(Boolean)
            footnotes.forEach((footnote, index) => {
              const footnoteText = footnote.trim()
              if (footnoteText) {
                blocks.push({
                  _type: 'block',
                  _key: nanoid(),
                  style: 'normal',
                  children: [{
                    _type: 'span',
                    _key: nanoid(),
                    text: `[${index + 1}] ${footnoteText}`
                  }]
                })
              }
            })
            continue
          }
        }

        // Process text content with links
        const children = []
        let currentNode = element.firstChild
        let lastNodeWasText = false

        const addTextNode = (text) => {
          // Only trim start of first text node and end of last text node
          if (text && text.length > 0) {
            children.push({
              _type: 'span',
              _key: nanoid(),
              text: text
            })
          }
        }

        while (currentNode) {
          if (currentNode.nodeType === Node.TEXT_NODE) {
            // Handle plain text while preserving spaces
            const text = currentNode.textContent
            if (text) {
              addTextNode(text)
              lastNodeWasText = true
            }
          } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
            if (currentNode.tagName.toLowerCase() === 'a') {
              // Handle hyperlinks
              const text = currentNode.textContent
              const href = currentNode.getAttribute('href')
              console.log('Processing link:', { text, href })
              if (text && href) {
                const markDefKey = nanoid()
                const linkSpan = {
                  _type: 'span',
                  _key: nanoid(),
                  text: text,
                  marks: [markDefKey]
                }
                children.push(linkSpan)
                // Store markDef separately to add to block later
                if (!element._markDefs) {
                  element._markDefs = []
                }
                element._markDefs.push({
                  _key: markDefKey,
                  _type: 'link',
                  href: href
                })
              }
              lastNodeWasText = false
            } else {
              // Handle other elements
              const text = currentNode.textContent
              if (text) {
                addTextNode(text)
                lastNodeWasText = true
              }
            }
          }
          currentNode = currentNode.nextSibling
        }

        // Create block with processed children
        if (children.length > 0) {
          // Trim the first and last text nodes while preserving internal spacing
          if (children.length > 0) {
            const firstChild = children[0]
            const lastChild = children[children.length - 1]
            if (firstChild._type === 'span' && !firstChild.marks) {
              firstChild.text = firstChild.text.trimStart()
            }
            if (lastChild._type === 'span' && !lastChild.marks) {
              lastChild.text = lastChild.text.trimEnd()
            }
          }

          const block = {
            _type: 'block',
            _key: nanoid(),
            style: style,
            children: children,
            markDefs: element._markDefs || []
          }
          console.log('Created block with links:', block)
          blocks.push(block)
        }
      }

      // Generate the slug
      const slug = file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/\s+/g, '-')
      
      // Check if a document with this slug already exists
      const existingDoc = await client.fetch(
        `*[_type == "blog" && slug.current == $slug][0]`,
        { slug }
      )

      let docId
      if (existingDoc) {
        // Update existing document
        docId = existingDoc._id
        await client
          .patch(docId)
          .set({
            title: file.name.replace(/\.[^/.]+$/, ''),
            body: blocks
          })
          .commit()
      } else {
        // Create new document
        docId = `imported-${nanoid()}`
        await client.create({
          _type: 'blog',
          _id: docId,
          title: file.name.replace(/\.[^/.]+$/, ''),
          slug: {
            _type: 'slug',
            current: slug
          },
          body: blocks
        })
      }
      
      // Navigate to the document using the correct path format
      router.navigateIntent('edit', {
        type: 'blog',
        id: docId
      })
      
    } catch (error) {
      console.error('Error importing document:', error)
      alert('Error importing document. Check console for details.')
    } finally {
      setIsLoading(false)
    }
  }, [client, router])

  return (
    <Container>
      <Box padding={4}>
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={4}>
            <Text size={2} weight="bold">Import Word Document</Text>
            <Text>Upload a Word document (.doc, .docx) to create a new blog post.</Text>
            <input
              type="file"
              accept=".doc,.docx"
              onChange={handleFileUpload}
              disabled={isLoading}
            />
            {isLoading && <Text>Importing document and uploading images...</Text>}
          </Stack>
        </Card>
      </Box>
    </Container>
  )
} 