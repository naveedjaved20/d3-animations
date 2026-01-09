'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ProjectsGallery() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const projects = [
      { name: 'E-Commerce Platform', category: 'Web', color: '#667eea', icon: '🛒' },
      { name: 'Mobile Banking App', category: 'Mobile', color: '#764ba2', icon: '📱' },
      { name: 'AI Dashboard', category: 'Data', color: '#f093fb', icon: '🤖' },
      { name: 'Brand Identity', category: 'Design', color: '#4facfe', icon: '🎨' },
      { name: 'Cloud Migration', category: 'DevOps', color: '#00f2fe', icon: '☁️' },
      { name: 'Analytics Platform', category: 'Data', color: '#f5576c', icon: '📊' },
    ]

    const cols = 3
    const cardWidth = 280
    const cardHeight = 200
    const spacing = 30

    projects.forEach((project, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = col * (cardWidth + spacing)
      const y = row * (cardHeight + spacing)

      const card = container
        .append('div')
        .style('position', 'absolute')
        .style('left', x + 'px')
        .style('top', y + 'px')
        .style('width', cardWidth + 'px')
        .style('height', cardHeight + 'px')
        .style('background', `linear-gradient(135deg, ${project.color} 0%, ${project.color}dd 100%)`)
        .style('border-radius', '15px')
        .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
        .style('padding', '25px')
        .style('color', 'white')
        .style('opacity', 0)
        .style('transform', 'scale(0.8) rotate(5deg)')
        .style('transition', 'all 0.5s ease')
        .style('cursor', 'pointer')
        .on('mouseenter', function() {
          d3.select(this)
            .style('transform', 'scale(1.05) rotate(0deg)')
            .style('box-shadow', '0 20px 40px rgba(0,0,0,0.3)')
        })
        .on('mouseleave', function() {
          d3.select(this)
            .style('transform', 'scale(1) rotate(0deg)')
            .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
        })

      // Icon
      card
        .append('div')
        .style('font-size', '50px')
        .style('margin-bottom', '15px')
        .text(project.icon)

      // Project name
      card
        .append('div')
        .style('font-size', '22px')
        .style('font-weight', 'bold')
        .style('margin-bottom', '10px')
        .text(project.name)

      // Category badge
      card
        .append('div')
        .style('display', 'inline-block')
        .style('background', 'rgba(255, 255, 255, 0.3)')
        .style('padding', '5px 15px')
        .style('border-radius', '20px')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .text(project.category)

      // Animate entrance
      setTimeout(() => {
        card
          .transition()
          .duration(600)
          .style('opacity', 1)
          .style('transform', 'scale(1) rotate(0deg)')
      }, i * 100)
    })
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '900px', height: '500px' }}></div>
    </div>
  )
}
