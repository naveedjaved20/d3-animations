'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function CardAnimation4() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const cards = [
      { 
        title: 'Innovation', 
        description: 'Cutting-edge solutions',
        icon: '💡',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        stats: [{ label: 'Projects', value: 150 }, { label: 'Clients', value: 50 }]
      },
      { 
        title: 'Excellence', 
        description: 'Quality in every detail',
        icon: '⭐',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        stats: [{ label: 'Awards', value: 25 }, { label: 'Years', value: 10 }]
      },
      { 
        title: 'Growth', 
        description: 'Scaling your business',
        icon: '📈',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        stats: [{ label: 'Growth', value: '300%' }, { label: 'Revenue', value: '$5M' }]
      },
    ]

    cards.forEach((card, i) => {
      const cardDiv = container
        .append('div')
        .style('position', 'absolute')
        .style('left', (i * 320) + 'px')
        .style('top', '0px')
        .style('width', '300px')
        .style('height', '350px')
        .style('background', card.gradient)
        .style('border-radius', '20px')
        .style('box-shadow', '0 15px 35px rgba(0,0,0,0.2)')
        .style('padding', '30px')
        .style('color', 'white')
        .style('opacity', 0)
        .style('transform', 'scale(0.8) rotateY(20deg)')
        .style('transition', 'all 0.6s ease')
        .style('cursor', 'pointer')
        .style('perspective', '1000px')
        .on('mouseenter', function() {
          d3.select(this)
            .style('transform', 'scale(1.05) rotateY(0deg)')
            .style('box-shadow', '0 25px 50px rgba(0,0,0,0.3)')
        })
        .on('mouseleave', function() {
          d3.select(this)
            .style('transform', 'scale(1) rotateY(0deg)')
            .style('box-shadow', '0 15px 35px rgba(0,0,0,0.2)')
        })

      // Icon
      cardDiv
        .append('div')
        .style('font-size', '70px')
        .style('text-align', 'center')
        .style('margin-bottom', '20px')
        .style('opacity', 0)
        .text(card.icon)
        .transition()
        .duration(600)
        .delay(i * 200 + 300)
        .style('opacity', 1)
        .style('transform', 'scale(1.2)')
        .transition()
        .duration(300)
        .style('transform', 'scale(1)')

      // Title
      cardDiv
        .append('div')
        .style('font-size', '28px')
        .style('font-weight', 'bold')
        .style('text-align', 'center')
        .style('margin-bottom', '15px')
        .style('opacity', 0)
        .text(card.title)
        .transition()
        .duration(400)
        .delay(i * 200 + 500)
        .style('opacity', 1)

      // Description
      cardDiv
        .append('div')
        .style('font-size', '16px')
        .style('text-align', 'center')
        .style('margin-bottom', '30px')
        .style('opacity', 0.9)
        .style('opacity', 0)
        .text(card.description)
        .transition()
        .duration(400)
        .delay(i * 200 + 600)
        .style('opacity', 0.9)

      // Stats
      const statsDiv = cardDiv
        .append('div')
        .style('display', 'flex')
        .style('justify-content', 'space-around')
        .style('margin-top', '20px')

      card.stats.forEach((stat, j) => {
        const statDiv = statsDiv
          .append('div')
          .style('text-align', 'center')
          .style('opacity', 0)

        statDiv
          .append('div')
          .style('font-size', '32px')
          .style('font-weight', 'bold')
          .style('margin-bottom', '5px')
          .text(stat.value)

        statDiv
          .append('div')
          .style('font-size', '14px')
          .style('opacity', 0.9)
          .text(stat.label)

        statDiv
          .transition()
          .duration(400)
          .delay(i * 200 + 700 + j * 100)
          .style('opacity', 1)
      })

      // Animate card entrance
      setTimeout(() => {
        cardDiv
          .transition()
          .duration(800)
          .style('opacity', 1)
          .style('transform', 'scale(1) rotateY(0deg)')
      }, i * 200)
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
      <div ref={containerRef} style={{ position: 'relative', width: '1000px', height: '400px' }}></div>
    </div>
  )
}
