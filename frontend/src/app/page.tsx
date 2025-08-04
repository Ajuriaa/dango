import { client, homePageQuery, statsSectionQuery, highlightsSectionQuery, servicesSectionQuery, partnersSectionQuery, ourWorksSectionQuery, ourTeamSectionQuery, urlFor } from '@/lib/sanity'
import Header from '@/components/Header'
import HeroPanel from '@/components/HeroPanel'
import HorizontalScroll from '@/components/HorizontalScroll'
import StatsSection from '@/components/StatsSection'
import HighlightsSection from '@/components/HighlightsSection'
import ServicesSection from '@/components/ServicesSection'
import OurWorksSection from '@/components/OurWorksSection'
import OurTeamSection from '@/components/OurTeamSection'
import PartnersSection from '@/components/PartnersSection'
import ContactSection from '@/components/ContactSection'

async function getHomePageData() {
  try {
    const data = await client.fetch(homePageQuery)
    return data
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return null
  }
}

async function getStatsSectionData() {
  try {
    const data = await client.fetch(statsSectionQuery)
    return data
  } catch (error) {
    console.error('Error fetching stats section data:', error)
    return null
  }
}

async function getHighlightsSectionData() {
  try {
    const data = await client.fetch(highlightsSectionQuery)
    return data
  } catch (error) {
    console.error('Error fetching highlights section data:', error)
    return null
  }
}

async function getServicesSectionData() {
  try {
    const data = await client.fetch(servicesSectionQuery)
    return data
  } catch (error) {
    console.error('Error fetching services section data:', error)
    return null
  }
}

async function getOurWorksSectionData() {
  try {
    const data = await client.fetch(ourWorksSectionQuery)
    return data
  } catch (error) {
    console.error('Error fetching our works section data:', error)
    return null
  }
}

async function getOurTeamSectionData() {
  try {
    const data = await client.fetch(ourTeamSectionQuery)
    return data
  } catch (error) {
    console.error('Error fetching our team section data:', error)
    return null
  }
}

async function getPartnersSectionData() {
  try {
    const data = await client.fetch(partnersSectionQuery)
    return data
  } catch (error) {
    console.error('Error fetching partners section data:', error)
    return null
  }
}

export default async function Home() {
  const [homeData, statsData, highlightsData, servicesData, ourWorksData, ourTeamData, partnersData] = await Promise.all([
    getHomePageData(),
    getStatsSectionData(),
    getHighlightsSectionData(),
    getServicesSectionData(),
    getOurWorksSectionData(),
    getOurTeamSectionData(),
    getPartnersSectionData()
  ])

  if (!homeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const shopifyPartnerImageUrl = homeData.shopifyPartnerImage 
    ? urlFor(homeData.shopifyPartnerImage).url() 
    : null

  const heroImageUrl = homeData.heroImage 
    ? urlFor(homeData.heroImage).url() 
    : null

  // Process highlights data to convert images to URLs
  const processedHighlightsData = highlightsData ? {
    ...highlightsData,
    workCards: highlightsData.workCards?.map((card: any) => ({
      ...card,
      image: card.image ? urlFor(card.image).url() : null,
      hoverImage: card.hoverImage ? urlFor(card.hoverImage).url() : null
    }))
  } : null

  // Process services data to convert images to URLs
  const processedServicesData = servicesData ? {
    ...servicesData,
    services: servicesData.services?.map((service: any) => ({
      ...service,
      image: service.image ? urlFor(service.image).url() : null
    })),
    testimonials: servicesData.testimonials?.map((testimonial: any) => ({
      ...testimonial,
      image: testimonial.image ? urlFor(testimonial.image).url() : null
    }))
  } : null

  // Process our works data to convert images to URLs
  const processedOurWorksData = ourWorksData ? {
    ...ourWorksData,
    works: ourWorksData.works?.map((work: any) => ({
      ...work,
      image: work.image ? urlFor(work.image).url() : null
    }))
  } : null

  // Process our team data to convert images to URLs
  const processedOurTeamData = ourTeamData ? {
    ...ourTeamData,
    teamCards: ourTeamData.teamCards?.map((member: any) => ({
      ...member,
      image: member.image ? urlFor(member.image).url() : null
    }))
  } : null

  // Process partners data to convert images to URLs
  const processedPartnersData = partnersData ? {
    ...partnersData,
    partners: partnersData.partners?.map((partner: any) => ({
      ...partner,
      image: partner.image ? urlFor(partner.image).url() : null
    }))
  } : null

  return (
    <div className="min-h-screen">
      <div className="bg-[radial-gradient(circle_at_center,_#a855f7,_#0f0f0f_80%)]">
        <Header />
        
        <HeroPanel
          title={homeData.title}
          subtitle={homeData.subtitle}
          heroImage={heroImageUrl}
          mainButtonLabel={homeData.mainButtonLabel}
          shopifyPartnerImage={shopifyPartnerImageUrl}
        />
        
        <HorizontalScroll items={homeData.scrollItems} />
      </div>
      
      {statsData && (
        <StatsSection
          title={statsData.title}
          description={statsData.description}
          stats={statsData.stats}
        />
      )}
      
      {processedHighlightsData && (
        <HighlightsSection
          title={processedHighlightsData.title}
          workCards={processedHighlightsData.workCards}
        />
      )}
      
      {processedServicesData && (
        <ServicesSection
          services={processedServicesData.services}
          testimonialsLabel={processedServicesData.testimonialsLabel}
          testimonials={processedServicesData.testimonials}
        />
      )}
      
      {processedPartnersData && (
        <PartnersSection
          label={processedPartnersData.label}
          partners={processedPartnersData.partners}
        />
      )}
      
      {processedOurWorksData && (
        <OurWorksSection
          title={processedOurWorksData.title}
          works={processedOurWorksData.works}
        />
      )}
      
      {processedOurTeamData && (
        <OurTeamSection
          label={processedOurTeamData.label}
          description={processedOurTeamData.description}
          teamCards={processedOurTeamData.teamCards}
        />
      )}
      
      <ContactSection />
    </div>
  )
}
