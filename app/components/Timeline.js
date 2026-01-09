'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function Timeline() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 500
    const margin = { top: 40, right: 40, bottom: 40, left: 80 }

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(255, 255, 255, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    const events = [
      { year: 2020, event: 'Company Founded', milestone: 'Start' },
      { year: 2021, event: 'First Major Client', milestone: 'Growth' },
      { year: 2022, event: 'Team Expansion', milestone: 'Scale' },
      { year: 2023, event: 'Product Launch', milestone: 'Innovation' },
      { year: 2024, event: 'Global Expansion', milestone: 'Success' },
    ]

    const xScale = d3
      .scaleLinear()
      .domain([2019, 2025])
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleBand()
      .domain(events.map(d => d.year))
      .range([margin.top, height - margin.bottom])
      .padding(0.3)

    // Draw timeline line
    const timelineLine = svg
      .append('line')
      .attr('x1', margin.left)
      .attr('y1', (margin.top + height - margin.bottom) / 2)
      .attr('x2', margin.left)
      .attr('y2', (margin.top + height - margin.bottom) / 2)
      .attr('stroke', '#667eea')
      .attr('stroke-width', 3)

    timelineLine
      .transition()
      .duration(2000)
      .attr('x2', width - margin.right)

    // Create event markers
    events.forEach((event, i) => {
      const y = (margin.top + height - margin.bottom) / 2
      const x = xScale(event.year)

      // Circle marker
      const circle = svg
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 0)
        .attr('fill', d3.schemeCategory10[i])
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)

      circle
        .transition()
        .duration(500)
        .delay(500 + i * 300)
        .attr('r', 12)

      // Event card
      const cardY = i % 2 === 0 ? y - 60 : y + 60
      const card = svg
        .append('g')
        .attr('opacity', 0)
        .attr('transform', `translate(${x}, ${cardY})`)

      card
        .append('rect')
        .attr('x', -80)
        .attr('y', -30)
        .attr('width', 160)
        .attr('height', 60)
        .attr('fill', 'white')
        .attr('stroke', d3.schemeCategory10[i])
        .attr('stroke-width', 2)
        .attr('rx', 8)
        .attr('filter', 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))')

      card
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -5)
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .text(event.year)

      card
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 15)
        .style('font-size', '11px')
        .style('fill', '#666')
        .text(event.event)

      card
        .transition()
        .duration(500)
        .delay(500 + i * 300)
        .attr('opacity', 1)

      // Connecting line
      const connector = svg
        .append('line')
        .attr('x1', x)
        .attr('y1', y)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', d3.schemeCategory10[i])
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0)

      connector
        .transition()
        .duration(300)
        .delay(700 + i * 300)
        .attr('y2', cardY)
        .attr('opacity', 0.5)
    })

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text('Company Timeline')
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  )
}
