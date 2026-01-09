'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function TeamSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const teamMembers = [
      { name: 'John Doe', role: 'CEO & Founder', avatar: '👨‍💼' },
      { name: 'Jane Smith', role: 'CTO', avatar: '👩‍💻' },
      { name: 'Mike Johnson', role: 'Design Director', avatar: '👨‍🎨' },
      { name: 'Sarah Williams', role: 'Marketing Lead', avatar: '👩‍💼' },
    ]

    teamMembers.forEach((member, i) => {
      const card = container
        .append('div')
        .style('position', 'absolute')
        .style('left', (i % 2) * 450 + 'px')
        .style('top', Math.floor(i / 2) * 280 + 'px')
        .style('width', '400px')
        .style('height', '250px')
        .style('background', 'white')
        .style('border-radius', '15px')
        .style('box-shadow', '0 10px 30px rgba(0,0,0,0.1)')
        .style('padding', '30px')
        .style('text-align', 'center')
        .style('opacity', 0)
        .style('transform', 'scale(0.8)')
        .style('cursor', 'pointer')
        .on('mouseenter', function() {
          d3.select(this)
            .transition()
            .duration(300)
            .style('transform', 'scale(1.05)')
            .style('box-shadow', '0 20px 40px rgba(0,0,0,0.2)')
        })
        .on('mouseleave', function() {
          d3.select(this)
            .transition()
            .duration(300)
            .style('transform', 'scale(1)')
            .style('box-shadow', '0 10px 30px rgba(0,0,0,0.1)')
        })

      // Avatar
      card
        .append('div')
        .style('font-size', '80px')
        .style('margin-bottom', '15px')
        .text(member.avatar)

      // Name
      card
        .append('div')
        .style('font-size', '22px')
        .style('font-weight', 'bold')
        .style('color', '#333')
        .style('margin-bottom', '8px')
        .text(member.name)

      // Role
      card
        .append('div')
        .style('font-size', '16px')
        .style('color', '#667eea')
        .style('margin-bottom', '15px')
        .text(member.role)

      // Social links
      const socials = card
        .append('div')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .style('gap', '15px')

      ;['💼', '🐦', '📷'].forEach(icon => {
        socials
          .append('div')
          .style('width', '35px')
          .style('height', '35px')
          .style('border-radius', '50%')
          .style('background', '#f5f5f5')
          .style('display', 'flex')
          .style('align-items', 'center')
          .style('justify-content', 'center')
          .style('font-size', '18px')
          .style('cursor', 'pointer')
          .text(icon)
          .on('mouseenter', function() {
            d3.select(this)
              .style('background', '#667eea')
              .style('transform', 'scale(1.2)')
          })
          .on('mouseleave', function() {
            d3.select(this)
              .style('background', '#f5f5f5')
              .style('transform', 'scale(1)')
          })
      })

      // Animate entrance
      setTimeout(() => {
        card
          .transition()
          .duration(600)
          .delay(i * 150)
          .style('opacity', 1)
          .style('transform', 'scale(1)')
      }, 100)
    })
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '900px', height: '600px' }}></div>
    </div>
  )
}
