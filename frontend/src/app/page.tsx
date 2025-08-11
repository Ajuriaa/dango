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
    label: homeData.highlightsLabel,
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
    testimonialsSectionLabel: homeData.testimonialsSectionLabel,
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
    })),
    viewAll: homeData.ourWorksViewAll
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
    title: homeData.partnersTitle,
    label: homeData.partnersLabel,
    partners: homeData.partners?.map((partner: any) => ({
      ...partner,
      image: partner.image ? urlFor(partner.image).url() : null
    }))
  } : null

  // Process contact section data
  const processedContactData = {
    title: homeData.contactTitle,
    formFields: homeData.contactFormFields,
    buttonLabel: homeData.contactButtonLabel,
    blogTitle: homeData.blogTitle,
    blogPosts: homeData.blogPosts?.map((post: any) => ({
      ...post,
      image: post.image ? urlFor(post.image).url() : null
    })),
    blogViewAll: homeData.blogViewAll
  }

  return (
    <div>
    <div
      id="hero"
      className='flex flex-col justify-between bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600 via-black to-black md:h-[min(100vh,1080px)] md:bg-[radial-gradient(ellipse_at_bottom,_hsla(271,100%,53%,1)_0%,_hsla(0,0%,0%,1)_25%)] md:bg-[length:250%_100%] md:bg-center pt-20'
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
          label={processedHighlightsData.label}
          title={processedHighlightsData.title}
          workCards={processedHighlightsData.workCards}
        />
      )}

      {processedServicesData && (
        <ServicesSection
          services={processedServicesData.services}
          testimonialsSectionLabel={processedServicesData.testimonialsSectionLabel}
          testimonialsLabel={processedServicesData.testimonialsLabel}
          testimonials={processedServicesData.testimonials}
        />
      )}
      
      {processedPartnersData && (
        <PartnersSection
          title={processedPartnersData.title}
          label={processedPartnersData.label}
          partners={processedPartnersData.partners}
        />
      )}
      
      {processedOurWorksData && (
        <OurWorksSection
          title={processedOurWorksData.title}
          works={processedOurWorksData.works}
          viewAll={processedOurWorksData.viewAll}
        />
      )}
      
      {processedOurTeamData && (
        <OurTeamSection
          label={processedOurTeamData.label}
          description={processedOurTeamData.description}
          teamCards={processedOurTeamData.teamCards}
        />
      )}
      
      <ContactSection 
        title={processedContactData.title}
        formFields={processedContactData.formFields}
        buttonLabel={processedContactData.buttonLabel}
        blogTitle={processedContactData.blogTitle}
        blogPosts={processedContactData.blogPosts}
        blogViewAll={processedContactData.blogViewAll}
      />
    </div>
  )
}