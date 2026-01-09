'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function CardAnimation2() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
    const height = 400
    const cardWidth = 200
    const cardHeight = 250

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(255, 255, 255, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    const cards = [
      { title: 'Design', value: 95, color: '#667eea', x: 150 },
      { title: 'Development', value: 88, color: '#764ba2', x: 400 },
      { title: 'Marketing', value: 92, color: '#f093fb', x: 650 },
    ]

    cards.forEach((card, i) => {
      const cardGroup = svg.append('g').attr('opacity', 0)

      // Card background
      const cardBg = cardGroup
        .append('rect')
        .attr('x', card.x - cardWidth / 2)
        .attr('y', height / 2 - cardHeight / 2)
        .attr('width', 0)
        .attr('height', cardHeight)
        .attr('rx', 15)
        .attr('fill', 'white')
        .attr('stroke', card.color)
        .attr('stroke-width', 2)

      cardBg
        .transition()
        .duration(600)
        .delay(i * 200)
        .attr('width', cardWidth)

      // Progress circle
      const radius = 50
      const centerX = card.x
      const centerY = height / 2 - 30

      const arc = d3
        .arc()
        .innerRadius(radius - 15)
        .outerRadius(radius)
        .startAngle(0)

      const progressArc = cardGroup
        .append('path')
        .attr('transform', `translate(${centerX}, ${centerY})`)
        .attr('d', arc.endAngle(0))
        .attr('fill', card.color)

      progressArc
        .transition()
        .duration(1500)
        .delay(600 + i * 200)
        .attrTween('d', function() {
          const interpolate = d3.interpolate(0, (card.value / 100) * 2 * Math.PI)
          return function(t) {
            return arc.endAngle(interpolate(t))()
          }
        })

      // Background circle
      cardGroup
        .append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', '#e0e0e0')
        .attr('stroke-width', 2)

      // Percentage text
      const percentText = cardGroup
        .append('text')
        .attr('x', centerX)
        .attr('y', centerY)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '24px')
        .style('font-weight', 'bold')
        .style('fill', card.color)
        .text('0%')

      percentText
        .transition()
        .duration(1500)
        .delay(600 + i * 200)
        .tween('text', function() {
          const interpolate = d3.interpolate(0, card.value)
          return function(t) {
            this.textContent = Math.round(interpolate(t)) + '%'
          }
        })

      // Title
      cardGroup
        .append('text')
        .attr('x', centerX)
        .attr('y', centerY + 80)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', '600')
        .style('fill', '#333')
        .text(card.title)

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
