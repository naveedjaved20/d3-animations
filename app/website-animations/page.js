'use client'

import WebsiteAnimations from '../components/WebsiteAnimations'
import Link from 'next/link'

export default function WebsiteAnimationsPage() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000
      }}>
        <Link 
          href="/"
          style={{
            padding: '12px 24px',
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#333',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          ← Data Visualizations
        </Link>
      </div>
      <WebsiteAnimations />
    </main>
  )
}
