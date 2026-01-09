'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function CardAnimation1() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const cards = [
      { title: 'Web Development', description: 'Modern responsive websites', icon: '🌐', color: '#667eea' },
      { title: 'Mobile Apps', description: 'iOS & Android applications', icon: '📱', color: '#764ba2' },
      { title: 'Data Analytics', description: 'Insights from your data', icon: '📊', color: '#f093fb' },
      { title: 'Cloud Solutions', description: 'Scalable infrastructure', icon: '☁️', color: '#4facfe' },
    ]

    const cardWidth = 220
    const cardHeight = 280
    const spacing = 30

    cards.forEach((card, i) => {
      const x = i * (cardWidth + spacing)
      const y = 0

      const cardGroup = container
        .append('div')
        .style('position', 'absolute')
        .style('left', x + 'px')
        .style('top', y + 'px')
        .style('width', cardWidth + 'px')
        .style('height', cardHeight + 'px')
        .style('background', 'white')
        .style('border-radius', '15px')
        .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
        .style('padding', '30px')
        .style('opacity', 0)
        .style('transform', 'translateY(20px)')
        .style('transition', 'all 0.5s ease')
        .style('cursor', 'pointer')
        .on('mouseenter', function() {
          d3.select(this)
            .style('transform', 'translateY(-10px) scale(1.05)')
            .style('box-shadow', '0 20px 40px rgba(0,0,0,0.3)')
        })
        .on('mouseleave', function() {
          d3.select(this)
            .style('transform', 'translateY(0px) scale(1)')
            .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
        })

      // Icon
      cardGroup
        .append('div')
        .style('font-size', '60px')
        .style('text-align', 'center')
        .style('margin-bottom', '20px')
        .text(card.icon)

      // Title
      cardGroup
        .append('div')
        .style('font-size', '22px')
        .style('font-weight', 'bold')
        .style('color', '#333')
        .style('text-align', 'center')
        .style('margin-bottom', '15px')
        .text(card.title)

      // Description
      cardGroup
        .append('div')
        .style('font-size', '14px')
        .style('color', '#666')
        .style('text-align', 'center')
        .style('line-height', '1.6')
        .text(card.description)

      // Animated border
      const border = cardGroup
        .append('div')
        .style('position', 'absolute')
        .style('top', '0')
        .style('left', '0')
        .style('right', '0')
        .style('height', '4px')
        .style('background', card.color)
        .style('border-radius', '15px 15px 0 0')
        .style('width', '0%')

      // Animate card entrance
      setTimeout(() => {
        cardGroup
          .transition()
          .duration(600)
          .style('opacity', 1)
          .style('transform', 'translateY(0px)')

        border
          .transition()
          .duration(800)
          .delay(300)
          .style('width', '100%')
      }, i * 150)
    })
  }, [])

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '1000px', height: '300px' }}></div>
    </div>
  )
}
