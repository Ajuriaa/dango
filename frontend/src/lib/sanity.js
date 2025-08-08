import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export function getFileUrl(fileRef) {
  if (!fileRef || !fileRef.asset || !fileRef.asset._ref) return null
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  
  // Extract file ID from reference like "file-aa09da47d17bf0de5b0d69687291273b5e258db6-webm"
  const fileId = fileRef.asset._ref.replace('file-', '').replace('-webm', '').replace('-mp4', '')
  const extension = fileRef.asset._ref.includes('-webm') ? 'webm' : 'mp4'
  
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`
}

// GROQ query for home page data
export const homePageQuery = `*[_type == "homePage"][0]{
  ...,
  headerLogo,
  navigationItems,
  headerCtaButtonLabel,
  highlightsLabel
}`