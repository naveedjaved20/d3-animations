'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function TestimonialsSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const testimonials = [
      {
        name: 'Sarah Johnson',
        role: 'CEO, TechCorp',
        text: 'Outstanding service and exceptional results. Highly recommended!',
        rating: 5,
        avatar: '👩',
      },
      {
        name: 'Michael Chen',
        role: 'Founder, StartupXYZ',
        text: 'They transformed our digital presence completely.',
        rating: 5,
        avatar: '👨',
      },
      {
        name: 'Emily Davis',
        role: 'Director, DesignCo',
        text: 'Professional, creative, and always delivers on time.',
        rating: 5,
        avatar: '👩‍💼',
      },
    ]

    testimonials.forEach((testimonial, i) => {
      const card = container
        .append('div')
        .style('position', 'absolute')
        .style('left', (i * 320) + 'px')
        .style('top', '0px')
        .style('width', '300px')
        .style('height', '400px')
        .style('background', 'white')
        .style('border-radius', '15px')
        .style('box-shadow', '0 10px 30px rgba(0,0,0,0.1)')
        .style('padding', '30px')
        .style('opacity', 0)
        .style('transform', 'translateY(30px) scale(0.9)')
        .style('transition', 'all 0.6s ease')
        .style('cursor', 'pointer')
        .on('mouseenter', function() {
          d3.select(this)
            .style('transform', 'translateY(-10px) scale(1.02)')
            .style('box-shadow', '0 20px 40px rgba(0,0,0,0.2)')
        })
        .on('mouseleave', function() {
          d3.select(this)
            .style('transform', 'translateY(0px) scale(1)')
            .style('box-shadow', '0 10px 30px rgba(0,0,0,0.1)')
        })

      // Quote icon
      card
        .append('div')
        .style('font-size', '60px')
        .style('color', '#667eea')
        .style('opacity', 0.2)
        .style('margin-bottom', '20px')
        .text('"')

      // Testimonial text
      card
        .append('div')
        .style('font-size', '16px')
        .style('line-height', '1.8')
        .style('color', '#333')
        .style('margin-bottom', '30px')
        .style('min-height', '120px')
        .text(testimonial.text)

      // Stars rating
      const starsDiv = card
        .append('div')
        .style('margin-bottom', '25px')

      for (let j = 0; j < testimonial.rating; j++) {
        starsDiv
          .append('span')
          .style('font-size', '20px')
          .style('color', '#FFD700')
          .style('margin-right', '3px')
          .text('⭐')
      }

      // Avatar and name
      const authorDiv = card.append('div').style('display', 'flex').style('align-items', 'center')

      authorDiv
        .append('div')
        .style('font-size', '50px')
        .style('margin-right', '15px')
        .text(testimonial.avatar)

      const nameDiv = authorDiv.append('div')

      nameDiv
        .append('div')
        .style('font-size', '18px')
        .style('font-weight', 'bold')
        .style('color', '#333')
        .style('margin-bottom', '5px')
        .text(testimonial.name)

      nameDiv
        .append('div')
        .style('font-size', '14px')
        .style('color', '#666')
        .text(testimonial.role)

      // Animate entrance
      setTimeout(() => {
        card
          .transition()
          .duration(800)
          .style('opacity', 1)
          .style('transform', 'translateY(0px) scale(1)')
      }, i * 200)
    })
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '450px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '1000px', height: '450px' }}></div>
    </div>
  )
}
