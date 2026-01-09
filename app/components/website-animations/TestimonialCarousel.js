'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export default function TestimonialCarousel() {
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    const testimonials = [
      { name: 'John Doe', role: 'CEO, TechCorp', text: 'Outstanding service and results!' },
      { name: 'Jane Smith', role: 'CTO, StartupXYZ', text: 'Transformed our digital presence.' },
      { name: 'Mike Johnson', role: 'Director, DesignCo', text: 'Professional and always delivers.' },
    ]

    const testimonial = testimonials[currentIndex]

    const card = container
      .append('div')
      .style('width', '700px')
      .style('height', '300px')
      .style('background', 'white')
      .style('border-radius', '15px')
      .style('box-shadow', '0 10px 30px rgba(0,0,0,0.2)')
      .style('padding', '40px')
      .style('opacity', 0)
      .style('transform', 'scale(0.9)')

    card
      .append('div')
      .style('font-size', '60px')
      .style('color', '#667eea')
      .style('opacity', 0.2)
      .style('margin-bottom', '20px')
      .text('"')

    card
      .append('div')
      .style('font-size', '18px')
      .style('line-height', '1.8')
      .style('color', '#333')
      .style('margin-bottom', '30px')
      .text(testimonial.text)

    card
      .append('div')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .style('color', '#333')
      .style('margin-bottom', '5px')
      .text(testimonial.name)

    card
      .append('div')
      .style('font-size', '14px')
      .style('color', '#666')
      .text(testimonial.role)

    card
      .transition()
      .duration(500)
      .style('opacity', 1)
      .style('transform', 'scale(1)')

    // Navigation dots
    const dots = container
      .append('div')
      .style('display', 'flex')
      .style('justify-content', 'center')
      .style('gap', '10px')
      .style('margin-top', '20px')

    testimonials.forEach((_, i) => {
      const dot = dots
        .append('div')
        .style('width', '12px')
        .style('height', '12px')
        .style('border-radius', '50%')
        .style('background', i === currentIndex ? '#667eea' : '#ddd')
        .style('cursor', 'pointer')
        .on('click', () => {
          setCurrentIndex(i)
        })

      dot.on('mouseenter', function() {
        d3.select(this).style('background', '#667eea')
      })

      dot.on('mouseleave', function() {
        if (i !== currentIndex) {
          d3.select(this).style('background', '#ddd')
        }
      })
    })
  }, [currentIndex])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div ref={containerRef} style={{ position: 'relative', width: '700px', height: '400px' }}></div>
    </div>
  )
}
