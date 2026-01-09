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
import AgileFlow from './website-animations/AgileFlow'
import DevOpsPipeline from './website-animations/DevOpsPipeline'
import DesignThinking from './website-animations/DesignThinking'
import KanbanBoard from './website-animations/KanbanBoard'
import WaterfallMethod from './website-animations/WaterfallMethod'
import LeanStartup from './website-animations/LeanStartup'
import LoadingAnimation from './website-animations/LoadingAnimation'
import InteractiveMap from './website-animations/InteractiveMap'
import ImageGallery from './website-animations/ImageGallery'
import ComparisonTable from './website-animations/ComparisonTable'
import Calculator from './website-animations/Calculator'
import InteractiveTabs from './website-animations/InteractiveTabs'
import ToastNotification from './website-animations/ToastNotification'
import ParallaxScroll from './website-animations/ParallaxScroll'
import SearchAutocomplete from './website-animations/SearchAutocomplete'
import AnimatedLogo from './website-animations/AnimatedLogo'
import CookieConsent from './website-animations/CookieConsent'
import InteractiveGlobe from './website-animations/InteractiveGlobe'

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
  { id: 'agile-flow', label: 'Agile Flow', component: AgileFlow },
  { id: 'devops-pipeline', label: 'DevOps Pipeline', component: DevOpsPipeline },
  { id: 'design-thinking', label: 'Design Thinking', component: DesignThinking },
  { id: 'kanban-board', label: 'Kanban Board', component: KanbanBoard },
  { id: 'waterfall-method', label: 'Waterfall Method', component: WaterfallMethod },
  { id: 'lean-startup', label: 'Lean Startup', component: LeanStartup },
  { id: 'loading-animation', label: 'Loading Animation', component: LoadingAnimation },
  { id: 'interactive-map', label: 'Interactive Map', component: InteractiveMap },
  { id: 'image-gallery', label: 'Image Gallery', component: ImageGallery },
  { id: 'comparison-table', label: 'Comparison Table', component: ComparisonTable },
  { id: 'calculator', label: 'Calculator', component: Calculator },
  { id: 'interactive-tabs', label: 'Interactive Tabs', component: InteractiveTabs },
  { id: 'toast-notification', label: 'Toast Notification', component: ToastNotification },
  { id: 'parallax-scroll', label: 'Parallax Scroll', component: ParallaxScroll },
  { id: 'search-autocomplete', label: 'Search Autocomplete', component: SearchAutocomplete },
  { id: 'animated-logo', label: 'Animated Logo', component: AnimatedLogo },
  { id: 'cookie-consent', label: 'Cookie Consent', component: CookieConsent },
  { id: 'interactive-globe', label: 'Interactive Globe', component: InteractiveGlobe },
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
