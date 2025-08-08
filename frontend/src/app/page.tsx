import { client, homePageQuery, urlFor, getFileUrl } from '@/lib/sanity'
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

export default async function Home() {
  const homeData = await getHomePageData()

  if (!homeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const headerLogoUrl = homeData.headerLogo 
    ? urlFor(homeData.headerLogo).url() 
    : null

  const shopifyPartnerImageUrl = homeData.shopifyPartnerImage 
    ? urlFor(homeData.shopifyPartnerImage).url() 
    : null

  const heroVideoUrl = homeData.heroVideo 
    ? getFileUrl(homeData.heroVideo)
    : null

  // Process highlights data to convert images to URLs
  const processedHighlightsData = homeData.workCards ? {
    title: homeData.highlightsTitle,
    workCards: homeData.workCards?.map((card: any) => ({
      ...card,
      image: card.image ? urlFor(card.image).url() : null,
      hoverImage: card.hoverImage ? urlFor(card.hoverImage).url() : null
    }))
  } : null

  // Process services data to convert images to URLs
  const processedServicesData = homeData.services ? {
    services: homeData.services?.map((service: any) => ({
      ...service,
      image: service.image ? urlFor(service.image).url() : null
    })),
    testimonialsLabel: homeData.testimonialsLabel,
    testimonials: homeData.testimonials?.map((testimonial: any) => ({
      ...testimonial,
      image: testimonial.image ? urlFor(testimonial.image).url() : null
    }))
  } : null

  // Process our works data to convert images to URLs
  const processedOurWorksData = homeData.works ? {
    title: homeData.ourWorksTitle,
    works: homeData.works?.map((work: any) => ({
      ...work,
      image: work.image ? urlFor(work.image).url() : null
    }))
  } : null

  // Process our team data to convert images to URLs
  const processedOurTeamData = homeData.teamCards ? {
    label: homeData.ourTeamLabel,
    description: homeData.ourTeamDescription,
    teamCards: homeData.teamCards?.map((member: any) => ({
      ...member,
      image: member.image ? urlFor(member.image).url() : null
    }))
  } : null

  // Process partners data to convert images to URLs
  const processedPartnersData = homeData.partners ? {
    label: homeData.partnersLabel,
    partners: homeData.partners?.map((partner: any) => ({
      ...partner,
      image: partner.image ? urlFor(partner.image).url() : null
    }))
  } : null

  return (
    <div>
    <div
      className='flex flex-col justify-between bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600 via-black to-black md:h-[100vh] md:bg-[radial-gradient(ellipse_at_bottom,_hsla(271,100%,53%,1)_0%,_hsla(0,0%,0%,1)_25%)] md:bg-[length:250%_100%] md:bg-center'
    >
      <Header 
        logoImage={headerLogoUrl || undefined}
        navigationItems={homeData.navigationItems}
        ctaButtonLabel={homeData.headerCtaButtonLabel}
      />
      <HeroPanel
        title={homeData.heroTitle}
        subtitle={homeData.heroSubtitle}
        heroVideo={heroVideoUrl || undefined}
        mainButtonLabel={homeData.mainButtonLabel}
        shopifyPartnerImage={shopifyPartnerImageUrl}
      /> 
      <HorizontalScroll items={homeData.scrollItems} />
    </div>
      
      {homeData.statistics && (
        <StatsSection
          title={homeData.statsTitle}
          description={homeData.statsDescription}
          stats={homeData.statistics}
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