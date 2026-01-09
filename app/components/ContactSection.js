'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ContactSection() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
    const height = 500

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(255, 255, 255, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .style('font-size', '32px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text('Get In Touch')

    const contactMethods = [
      { icon: '📧', label: 'Email', value: 'hello@company.com', x: 250, y: 200 },
      { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567', x: 500, y: 200 },
      { icon: '📍', label: 'Location', value: 'New York, USA', x: 750, y: 200 },
    ]

    contactMethods.forEach((method, i) => {
      const group = svg.append('g').attr('opacity', 0)

      // Icon circle
      const circle = group
        .append('circle')
        .attr('cx', method.x)
        .attr('cy', method.y - 40)
        .attr('r', 0)
        .attr('fill', '#667eea')
        .attr('opacity', 0.1)
        .attr('stroke', '#667eea')
        .attr('stroke-width', 3)

      circle
        .transition()
        .duration(600)
        .delay(i * 200)
        .attr('r', 50)

      // Icon
      group
        .append('text')
        .attr('x', method.x)
        .attr('y', method.y - 40)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '40px')
        .style('opacity', 0)
        .text(method.icon)
        .transition()
        .duration(400)
        .delay(400 + i * 200)
        .style('opacity', 1)

      // Label
      group
        .append('text')
        .attr('x', method.x)
        .attr('y', method.y + 30)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', '600')
        .style('fill', '#333')
        .style('opacity', 0)
        .text(method.label)
        .transition()
        .duration(400)
        .delay(600 + i * 200)
        .style('opacity', 1)

      // Value
      group
        .append('text')
        .attr('x', method.x)
        .attr('y', method.y + 55)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#666')
        .style('opacity', 0)
        .text(method.value)
        .transition()
        .duration(400)
        .delay(800 + i * 200)
        .style('opacity', 1)

      group
        .transition()
        .duration(300)
        .delay(i * 200)
        .attr('opacity', 1)
    })

    // Social media icons
    const socials = [
      { icon: '💼', x: 300, y: 350 },
      { icon: '🐦', x: 400, y: 350 },
      { icon: '📷', x: 500, y: 350 },
      { icon: '💬', x: 600, y: 350 },
      { icon: '🔗', x: 700, y: 350 },
    ]

    socials.forEach((social, i) => {
      const socialCircle = svg
        .append('circle')
        .attr('cx', social.x)
        .attr('cy', social.y)
        .attr('r', 0)
        .attr('fill', '#667eea')
        .attr('opacity', 0.1)
        .attr('stroke', '#667eea')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')

      socialCircle
        .transition()
        .duration(500)
        .delay(1200 + i * 100)
        .attr('r', 30)

      svg
        .append('text')
        .attr('x', social.x)
        .attr('y', social.y)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '24px')
        .style('opacity', 0)
        .text(social.icon)
        .transition()
        .duration(300)
        .delay(1400 + i * 100)
        .style('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
