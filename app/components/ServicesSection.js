'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ServicesSection() {
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
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '32px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text('Our Services')

    const services = [
      { name: 'Web Design', icon: '🎨', color: '#667eea', x: 200, y: 200 },
      { name: 'Development', icon: '💻', color: '#764ba2', x: 400, y: 200 },
      { name: 'Marketing', icon: '📢', color: '#f093fb', x: 600, y: 200 },
      { name: 'Consulting', icon: '💡', color: '#4facfe', x: 800, y: 200 },
    ]

    services.forEach((service, i) => {
      const serviceGroup = svg.append('g').attr('opacity', 0)

      // Service circle
      const circle = serviceGroup
        .append('circle')
        .attr('cx', service.x)
        .attr('cy', service.y)
        .attr('r', 0)
        .attr('fill', service.color)
        .attr('opacity', 0.1)
        .attr('stroke', service.color)
        .attr('stroke-width', 3)

      circle
        .transition()
        .duration(800)
        .delay(i * 200)
        .attr('r', 60)

      // Icon
      serviceGroup
        .append('text')
        .attr('x', service.x)
        .attr('y', service.y - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '50px')
        .style('opacity', 0)
        .text(service.icon)
        .transition()
        .duration(500)
        .delay(400 + i * 200)
        .style('opacity', 1)

      // Service name
      serviceGroup
        .append('text')
        .attr('x', service.x)
        .attr('y', service.y + 100)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', '600')
        .style('fill', '#333')
        .style('opacity', 0)
        .text(service.name)
        .transition()
        .duration(500)
        .delay(600 + i * 200)
        .style('opacity', 1)

      // Animated connecting lines
      if (i < services.length - 1) {
        const line = svg
          .append('line')
          .attr('x1', service.x + 60)
          .attr('y1', service.y)
          .attr('x2', service.x + 60)
          .attr('y2', service.y)
          .attr('stroke', '#ddd')
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '5,5')

        line
          .transition()
          .duration(800)
          .delay(800 + i * 200)
          .attr('x2', services[i + 1].x - 60)
      }

      serviceGroup
        .transition()
        .duration(300)
        .delay(i * 200)
        .attr('opacity', 1)
    })

    // Description text
    const description = svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 350)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', '#666')
      .style('opacity', 0)
      .text('Comprehensive solutions tailored to your business needs')

    description
      .transition()
      .duration(800)
      .delay(1500)
      .style('opacity', 1)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
