'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function InteractiveMap() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
    const height = 600

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
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .text('Interactive World Map - Office Locations')

    // Simplified world map (continents as shapes)
    const continents = [
      { name: 'North America', path: 'M 100,200 L 300,180 L 350,250 L 200,280 Z', x: 200, y: 230 },
      { name: 'Europe', path: 'M 450,150 L 550,140 L 580,200 L 480,220 Z', x: 520, y: 175 },
      { name: 'Asia', path: 'M 600,180 L 800,170 L 850,280 L 650,300 Z', x: 725, y: 230 },
      { name: 'Australia', path: 'M 750,350 L 850,340 L 880,400 L 780,410 Z', x: 815, y: 375 },
    ]

    continents.forEach((continent, i) => {
      const continentPath = svg
        .append('path')
        .attr('d', continent.path)
        .attr('fill', '#e8e8e8')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 2)
        .attr('opacity', 0)
        .style('cursor', 'pointer')

      continentPath
        .transition()
        .duration(600)
        .delay(i * 200)
        .attr('opacity', 0.6)

      continentPath.on('mouseenter', function() {
        d3.select(this).attr('fill', '#667eea').attr('opacity', 0.8)
      })

      continentPath.on('mouseleave', function() {
        d3.select(this).attr('fill', '#e8e8e8').attr('opacity', 0.6)
      })

      // Office locations
      const office = svg
        .append('g')
        .attr('opacity', 0)

      office
        .append('circle')
        .attr('cx', continent.x)
        .attr('cy', continent.y)
        .attr('r', 0)
        .attr('fill', '#667eea')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)

      office
        .select('circle')
        .transition()
        .duration(600)
        .delay(1000 + i * 200)
        .attr('r', 12)

      // Pulse effect
      const pulse = office
        .append('circle')
        .attr('cx', continent.x)
        .attr('cy', continent.y)
        .attr('r', 12)
        .attr('fill', 'none')
        .attr('stroke', '#667eea')
        .attr('stroke-width', 2)
        .attr('opacity', 0)

      pulse
        .transition()
        .duration(1500)
        .delay(1200 + i * 200)
        .attr('r', 40)
        .attr('opacity', 0)
        .on('end', function repeat() {
          d3.select(this)
            .attr('r', 12)
            .attr('opacity', 0.8)
            .transition()
            .duration(1500)
            .attr('r', 40)
            .attr('opacity', 0)
            .on('end', repeat)
        })

      // Label
      office
        .append('text')
        .attr('x', continent.x)
        .attr('y', continent.y - 25)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .style('fill', '#333')
        .text(continent.name)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(1400 + i * 200)
        .style('opacity', 1)

      office
        .transition()
        .duration(300)
        .delay(1000 + i * 200)
        .attr('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
