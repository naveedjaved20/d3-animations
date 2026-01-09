'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function MorphingBlob() {
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
      .style('background', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)')
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
      .text('Morphing Blob Animation')

    const centerX = width / 2
    const centerY = height / 2
    const radius = 150
    const numPoints = 20

    // Create initial blob points
    let points = Array.from({ length: numPoints }, (_, i) => {
      const angle = (i / numPoints) * Math.PI * 2
      return {
        angle,
        radius: radius + Math.random() * 30,
        targetRadius: radius + Math.random() * 30,
      }
    })

    const line = d3
      .lineRadial()
      .angle(d => d.angle)
      .radius(d => d.radius)
      .curve(d3.curveCardinalClosed)

    const blob = svg
      .append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`)

    const path = blob
      .append('path')
      .datum(points)
      .attr('d', line)
      .attr('fill', 'rgba(255, 255, 255, 0.3)')
      .attr('stroke', 'white')
      .attr('stroke-width', 3)
      .attr('filter', 'url(#blur)')

    // Blur filter for gooey effect
    const defs = svg.append('defs')
    const filter = defs.append('filter').attr('id', 'blur')
    filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', 10)

    function animate() {
      points.forEach(point => {
        // Smooth transition to target radius
        point.radius += (point.targetRadius - point.radius) * 0.1

        // Randomly change target
        if (Math.random() < 0.02) {
          point.targetRadius = radius + (Math.random() - 0.5) * 60
        }
      })

      path.datum(points).attr('d', line)

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
