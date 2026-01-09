'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function CardAnimation3() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
    const height = 400

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(255, 255, 255, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    const cards = [
      { title: 'Project Alpha', category: 'Web Design', progress: 75, color: '#667eea', x: 200 },
      { title: 'Project Beta', category: 'Mobile App', progress: 60, color: '#764ba2', x: 500 },
      { title: 'Project Gamma', category: 'Branding', progress: 90, color: '#f093fb', x: 800 },
    ]

    cards.forEach((card, i) => {
      const cardGroup = svg.append('g').attr('opacity', 0)

      // Card shadow
      cardGroup
        .append('rect')
        .attr('x', card.x - 120)
        .attr('y', height / 2 - 80 + 5)
        .attr('width', 240)
        .attr('height', 160)
        .attr('rx', 12)
        .attr('fill', 'rgba(0,0,0,0.1)')
        .attr('transform', 'skewX(-5)')

      // Card background
      const cardBg = cardGroup
        .append('rect')
        .attr('x', card.x - 120)
        .attr('y', height / 2 - 80)
        .attr('width', 0)
        .attr('height', 160)
        .attr('rx', 12)
        .attr('fill', 'white')
        .attr('stroke', card.color)
        .attr('stroke-width', 2)

      cardBg
        .transition()
        .duration(500)
        .delay(i * 200)
        .attr('width', 240)

      // Title
      cardGroup
        .append('text')
        .attr('x', card.x)
        .attr('y', height / 2 - 40)
        .attr('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('font-weight', 'bold')
        .style('fill', '#333')
        .style('opacity', 0)
        .text(card.title)
        .transition()
        .duration(300)
        .delay(500 + i * 200)
        .style('opacity', 1)

      // Category
      cardGroup
        .append('text')
        .attr('x', card.x)
        .attr('y', height / 2 - 15)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#666')
        .style('opacity', 0)
        .text(card.category)
        .transition()
        .duration(300)
        .delay(600 + i * 200)
        .style('opacity', 1)

      // Progress bar background
      cardGroup
        .append('rect')
        .attr('x', card.x - 100)
        .attr('y', height / 2 + 10)
        .attr('width', 200)
        .attr('height', 8)
        .attr('rx', 4)
        .attr('fill', '#e0e0e0')
        .style('opacity', 0)
        .transition()
        .duration(300)
        .delay(700 + i * 200)
        .style('opacity', 1)

      // Progress bar
      const progressBar = cardGroup
        .append('rect')
        .attr('x', card.x - 100)
        .attr('y', height / 2 + 10)
        .attr('width', 0)
        .attr('height', 8)
        .attr('rx', 4)
        .attr('fill', card.color)

      progressBar
        .transition()
        .duration(1000)
        .delay(800 + i * 200)
        .attr('width', (card.progress / 100) * 200)

      // Progress text
      const progressText = cardGroup
        .append('text')
        .attr('x', card.x)
        .attr('y', height / 2 + 40)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', '600')
        .style('fill', card.color)
        .text('0%')
        .style('opacity', 0)
        .transition()
        .duration(300)
        .delay(800 + i * 200)
        .style('opacity', 1)

      progressText
        .transition()
        .duration(1000)
        .delay(800 + i * 200)
        .tween('text', function() {
          const interpolate = d3.interpolate(0, card.progress)
          return function(t) {
            this.textContent = Math.round(interpolate(t)) + '%'
          }
        })

      // Animate card group
      cardGroup
        .transition()
        .duration(300)
        .delay(i * 200)
        .attr('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
