'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function FlightPaths() {
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
      .style('background', 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)')
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
      .style('fill', 'white')
      .text('Animated Flight Paths')

    // Cities
    const cities = [
      { name: 'NYC', x: 200, y: 200 },
      { name: 'LA', x: 150, y: 400 },
      { name: 'London', x: 500, y: 150 },
      { name: 'Tokyo', x: 850, y: 250 },
      { name: 'Sydney', x: 900, y: 500 },
    ]

    // Draw cities
    cities.forEach((city, i) => {
      const cityGroup = svg.append('g').attr('opacity', 0)

      cityGroup
        .append('circle')
        .attr('cx', city.x)
        .attr('cy', city.y)
        .attr('r', 0)
        .attr('fill', '#4facfe')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)

      cityGroup
        .append('text')
        .attr('x', city.x)
        .attr('y', city.y - 25)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .text(city.name)

      cityGroup
        .select('circle')
        .transition()
        .duration(600)
        .delay(i * 200)
        .attr('r', 12)

      cityGroup
        .transition()
        .duration(300)
        .delay(i * 200)
        .attr('opacity', 1)
    })

    // Flight paths
    const flights = [
      { from: 0, to: 2, color: '#ff6b6b' },
      { from: 1, to: 3, color: '#4ecdc4' },
      { from: 2, to: 4, color: '#ffe66d' },
      { from: 0, to: 3, color: '#95e1d3' },
      { from: 1, to: 2, color: '#f38181' },
    ]

    flights.forEach((flight, i) => {
      const from = cities[flight.from]
      const to = cities[flight.to]

      // Create curved path
      const midX = (from.x + to.x) / 2
      const midY = (from.y + to.y) / 2 - 50

      const path = d3.path()
      path.moveTo(from.x, from.y)
      path.quadraticCurveTo(midX, midY, to.x, to.y)

      const pathElement = svg
        .append('path')
        .attr('d', path.toString())
        .attr('fill', 'none')
        .attr('stroke', flight.color)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.3)
        .style('opacity', 0)

      pathElement
        .transition()
        .duration(1000)
        .delay(1000 + i * 300)
        .style('opacity', 0.3)

      // Animated plane
      const plane = svg
        .append('circle')
        .attr('cx', from.x)
        .attr('cy', from.y)
        .attr('r', 0)
        .attr('fill', flight.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)

      plane
        .transition()
        .duration(2000)
        .delay(1500 + i * 300)
        .attr('r', 6)
        .attrTween('transform', function() {
          const pathNode = pathElement.node()
          const pathLength = pathNode.getTotalLength()
          return function(t) {
            const point = pathNode.getPointAtLength(t * pathLength)
            return `translate(${point.x}, ${point.y})`
          }
        })
        .on('end', function() {
          d3.select(this).remove()
          // Restart animation
          setTimeout(() => {
            const newPlane = svg
              .append('circle')
              .attr('cx', from.x)
              .attr('cy', from.y)
              .attr('r', 6)
              .attr('fill', flight.color)
              .attr('stroke', '#fff')
              .attr('stroke-width', 2)

            newPlane
              .transition()
              .duration(2000)
              .attrTween('transform', function() {
                const pathNode = pathElement.node()
                const pathLength = pathNode.getTotalLength()
                return function(t) {
                  const point = pathNode.getPointAtLength(t * pathLength)
                  return `translate(${point.x}, ${point.y})`
                }
              })
              .on('end', arguments.callee)
          }, 500)
        })
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
