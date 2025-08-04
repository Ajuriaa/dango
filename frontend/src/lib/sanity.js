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

// GROQ query for home page data
export const homePageQuery = `*[_type == "homePage"][0]{
  title,
  subtitle,
  shopifyPartnerImage,
  heroImage,
  mainButtonLabel,
  scrollItems
}`

// GROQ query for stats section data
export const statsSectionQuery = `*[_type == "statsSection"][0]{
  title,
  description,
  stats
}`

// GROQ query for highlights section data
export const highlightsSectionQuery = `*[_type == "highlightsSection"][0]{
  title,
  workCards[]{
    name,
    tags,
    image,
    hoverImage
  }
}`

// GROQ query for services section data
export const servicesSectionQuery = `*[_type == "servicesSection"][0]{
  services[]{
    title,
    description,
    image
  },
  testimonialsLabel,
  testimonials[]{
    name,
    position,
    image,
    comment
  }
}`

// GROQ query for partners section data
export const partnersSectionQuery = `*[_type == "partnersSection"][0]{
  label,
  partners[]{
    image
  }
}`

// GROQ query for our works section data
export const ourWorksSectionQuery = `*[_type == "ourWorksSection"][0]{
  title,
  works[]{
    image,
    alt
  }
}`

// GROQ query for our team section data
export const ourTeamSectionQuery = `*[_type == "ourTeamSection"][0]{
  label,
  description,
  teamCards[]{
    name,
    image
  }
}`