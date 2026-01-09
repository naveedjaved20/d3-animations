'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function PortfolioGrid() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const projects = [
      { name: 'Project Alpha', category: 'Web', color: '#667eea' },
      { name: 'Project Beta', category: 'Mobile', color: '#764ba2' },
      { name: 'Project Gamma', category: 'Design', color: '#f093fb' },
      { name: 'Project Delta', color: '#4facfe' },
      { name: 'Project Epsilon', color: '#00f2fe' },
      { name: 'Project Zeta', color: '#f5576c' },
    ]

    projects.forEach((project, i) => {
      const col = i % 3
      const row = Math.floor(i / 3)
      const card = container
        .append('div')
        .style('position', 'absolute')
        .style('left', col * 280 + 'px')
        .style('top', row * 200 + 'px')
        .style('width', '260px')
        .style('height', '180px')
        .style('background', `linear-gradient(135deg, ${project.color} 0%, ${project.color}dd 100%)`)
        .style('border-radius', '15px')
        .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
        .style('padding', '30px')
        .style('color', 'white')
        .style('opacity', 0)
        .style('transform', 'scale(0.8)')
        .style('cursor', 'pointer')
        .on('mouseenter', function() {
          d3.select(this)
            .transition()
            .duration(300)
            .style('transform', 'scale(1.05)')
            .style('box-shadow', '0 20px 40px rgba(0,0,0,0.3)')
        })
        .on('mouseleave', function() {
          d3.select(this)
            .transition()
            .duration(300)
            .style('transform', 'scale(1)')
            .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
        })

      card
        .append('div')
        .style('font-size', '22px')
        .style('font-weight', 'bold')
        .style('margin-bottom', '10px')
        .text(project.name)

      if (project.category) {
        card
          .append('div')
          .style('font-size', '12px')
          .style('opacity', 0.9)
          .style('background', 'rgba(255,255,255,0.2)')
          .style('display', 'inline-block')
          .style('padding', '5px 15px')
          .style('border-radius', '20px')
          .text(project.category)
      }

      // Hover overlay
      const overlay = card
        .append('div')
        .style('position', 'absolute')
        .style('top', '0')
        .style('left', '0')
        .style('right', '0')
        .style('bottom', '0')
        .style('background', 'rgba(0,0,0,0.7)')
        .style('border-radius', '15px')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('opacity', 0)
        .style('transition', 'opacity 0.3s')

      overlay
        .append('div')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text('View Details')

      card.on('mouseenter', function() {
        overlay.style('opacity', 1)
      })

      card.on('mouseleave', function() {
        overlay.style('opacity', 0)
      })

      // Staggered entrance
      setTimeout(() => {
        card
          .transition()
          .duration(600)
          .delay(i * 100)
          .style('opacity', 1)
          .style('transform', 'scale(1)')
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
      <div ref={containerRef} style={{ position: 'relative', width: '840px', height: '400px' }}></div>
    </div>
  )
}
