'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function FeatureCards() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const features = [
      { icon: '⚡', title: 'Fast Performance', desc: 'Lightning-fast load times' },
      { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security' },
      { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
      { icon: '🎨', title: 'Modern Design', desc: 'Beautiful user interface' },
    ]

    features.forEach((feature, i) => {
      const card = container
        .append('div')
        .style('position', 'absolute')
        .style('left', (i % 2) * 450 + 'px')
        .style('top', Math.floor(i / 2) * 200 + 'px')
        .style('width', '400px')
        .style('height', '170px')
        .style('background', 'white')
        .style('border-radius', '15px')
        .style('box-shadow', '0 10px 30px rgba(0,0,0,0.1)')
        .style('padding', '30px')
        .style('opacity', 0)
        .style('transform', 'translateY(30px)')
        .style('cursor', 'pointer')
        .on('mouseenter', function() {
          d3.select(this)
            .transition()
            .duration(300)
            .style('transform', 'translateY(-10px)')
            .style('box-shadow', '0 20px 40px rgba(0,0,0,0.2)')
        })
        .on('mouseleave', function() {
          d3.select(this)
            .transition()
            .duration(300)
            .style('transform', 'translateY(0px)')
            .style('box-shadow', '0 10px 30px rgba(0,0,0,0.1)')
        })

      // Icon with SVG stroke animation
      const iconDiv = card
        .append('div')
        .style('font-size', '50px')
        .style('margin-bottom', '15px')
        .text(feature.icon)

      card
        .append('div')
        .style('font-size', '20px')
        .style('font-weight', 'bold')
        .style('color', '#333')
        .style('margin-bottom', '10px')
        .text(feature.title)

      card
        .append('div')
        .style('font-size', '14px')
        .style('color', '#666')
        .text(feature.desc)

      // Staggered entrance
      setTimeout(() => {
        card
          .transition()
          .duration(600)
          .delay(i * 150)
          .style('opacity', 1)
          .style('transform', 'translateY(0px)')
      }, 100)
    })
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '900px', height: '400px' }}></div>
    </div>
  )
}
