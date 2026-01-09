'use client'

import { useState } from 'react'
import PageTransitions from './website-animations/PageTransitions'
import ScrollAnimations from './website-animations/ScrollAnimations'
import CursorInteractions from './website-animations/CursorInteractions'
import HeroAnimations from './website-animations/HeroAnimations'
import FeatureCards from './website-animations/FeatureCards'
import TestimonialCarousel from './website-animations/TestimonialCarousel'
import ServiceAccordion from './website-animations/ServiceAccordion'
import PortfolioGrid from './website-animations/PortfolioGrid'
import TechStack from './website-animations/TechStack'
import FormAnimations from './website-animations/FormAnimations'
import LogoMarquee from './website-animations/LogoMarquee'
import SkillBars from './website-animations/SkillBars'
import TeamSection from './website-animations/TeamSection'
import FAQSection from './website-animations/FAQSection'
import BlogSection from './website-animations/BlogSection'
import AwardsSection from './website-animations/AwardsSection'
import PartnersSection from './website-animations/PartnersSection'
import ProcessSection from './website-animations/ProcessSection'
import NewsletterSection from './website-animations/NewsletterSection'
import StatsSection from './website-animations/StatsSection'

const tabs = [
  { id: 'page-transitions', label: 'Page Transitions', component: PageTransitions },
  { id: 'scroll-animations', label: 'Scroll Animations', component: ScrollAnimations },
  { id: 'cursor-interactions', label: 'Cursor Interactions', component: CursorInteractions },
  { id: 'hero-animations', label: 'Hero Section', component: HeroAnimations },
  { id: 'feature-cards', label: 'Feature Cards', component: FeatureCards },
  { id: 'testimonial-carousel', label: 'Testimonials', component: TestimonialCarousel },
  { id: 'service-accordion', label: 'Service Accordion', component: ServiceAccordion },
  { id: 'portfolio-grid', label: 'Portfolio Grid', component: PortfolioGrid },
  { id: 'tech-stack', label: 'Tech Stack', component: TechStack },
  { id: 'form-animations', label: 'Form Animations', component: FormAnimations },
  { id: 'logo-marquee', label: 'Logo Marquee', component: LogoMarquee },
  { id: 'skill-bars', label: 'Skill Bars', component: SkillBars },
  { id: 'team-section', label: 'Team Section', component: TeamSection },
  { id: 'faq-section', label: 'FAQ Section', component: FAQSection },
  { id: 'blog-section', label: 'Blog Section', component: BlogSection },
  { id: 'awards-section', label: 'Awards Section', component: AwardsSection },
  { id: 'partners-section', label: 'Partners Section', component: PartnersSection },
  { id: 'process-section', label: 'Process Section', component: ProcessSection },
  { id: 'newsletter-section', label: 'Newsletter Section', component: NewsletterSection },
  { id: 'stats-section', label: 'Stats Section', component: StatsSection },
]

export default function WebsiteAnimations() {
  const [activeTab, setActiveTab] = useState('page-transitions')

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || PageTransitions

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1400px', 
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h1 style={{ 
        color: 'white', 
        marginBottom: '1rem',
        fontSize: '2.5rem',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        Website Animation Ideas
      </h1>
      <p style={{
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.1rem'
      }}>
        Technology Company Website Animations
      </p>
      
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '2rem',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '8px',
              background: activeTab === tab.id 
                ? 'rgba(255, 255, 255, 0.9)' 
                : 'rgba(255, 255, 255, 0.2)',
              color: activeTab === tab.id ? '#333' : 'white',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab.id ? '600' : '400',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === tab.id 
                ? '0 4px 12px rgba(0,0,0,0.2)' 
                : 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '15px',
        padding: '2rem',
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActiveComponent />
      </div>
    </div>
  )
}
