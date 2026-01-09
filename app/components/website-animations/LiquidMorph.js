'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function LiquidMorph() {
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
      .style('background', 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)')
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
      .text('Liquid Morphing Effect')

    const mouse = { x: width / 2, y: height / 2 }

    svg.on('mousemove', function(event) {
      const [mx, my] = d3.pointer(event)
      mouse.x = mx
      mouse.y = my
    })

    // Create liquid blob with many points
    const numPoints = 50
    let points = Array.from({ length: numPoints }, (_, i) => {
      const angle = (i / numPoints) * Math.PI * 2
      const baseRadius = 150
      return {
        angle,
        radius: baseRadius,
        targetRadius: baseRadius,
        x: width / 2 + baseRadius * Math.cos(angle),
        y: height / 2 + baseRadius * Math.sin(angle),
        vx: 0,
        vy: 0,
      }
    })

    const line = d3
      .lineRadial()
      .angle(d => d.angle)
      .radius(d => d.radius)
      .curve(d3.curveCardinalClosed)

    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`)

    const path = g
      .append('path')
      .datum(points)
      .attr('d', line)
      .attr('fill', 'url(#liquid-gradient)')
      .attr('stroke', 'rgba(255, 255, 255, 0.3)')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#blur)')

    // Gradient
    const defs = svg.append('defs')
    const gradient = defs
      .append('radialGradient')
      .attr('id', 'liquid-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')

    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#667eea').attr('stop-opacity', 0.8)
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#764ba2').attr('stop-opacity', 0.4)

    // Blur filter
    const filter = defs.append('filter').attr('id', 'blur')
    filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', 15)

    function animate() {
      points.forEach((point, i) => {
        // Calculate distance to mouse
        const dx = mouse.x - width / 2 - point.x
        const dy = mouse.y - height / 2 - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const force = distance > 0 ? 2000 / (distance * distance) : 0

        // Apply magnetic force
        point.vx += (dx / distance) * force * 0.01
        point.vy += (dy / distance) * force * 0.01

        // Spring back to base radius
        const baseRadius = 150
        const currentRadius = Math.sqrt(point.x * point.x + point.y * point.y)
        const radiusDiff = baseRadius - currentRadius
        point.vx += (point.x / currentRadius) * radiusDiff * 0.05
        point.vy += (point.y / currentRadius) * radiusDiff * 0.05

        // Damping
        point.vx *= 0.95
        point.vy *= 0.95

        // Update position
        point.x += point.vx
        point.y += point.vy

        // Update angle and radius
        point.angle = Math.atan2(point.y, point.x)
        point.radius = Math.sqrt(point.x * point.x + point.y * point.y)

        // Add wave effect
        point.radius += Math.sin(Date.now() / 1000 + i * 0.5) * 10
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
