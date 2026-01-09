'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function LightRefraction() {
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
      .style('background', 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)')
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
      .text('Interactive Light Refraction - Move Mouse')

    const mouse = { x: width / 2, y: height / 2 }

    svg.on('mousemove', function(event) {
      const [mx, my] = d3.pointer(event)
      mouse.x = mx
      mouse.y = my
    })

    // Light source
    const lightSource = { x: width / 2, y: 100 }

    // Prism (triangle)
    const prismPoints = [
      { x: width / 2 - 80, y: height / 2 },
      { x: width / 2 + 80, y: height / 2 },
      { x: width / 2, y: height / 2 - 150 },
    ]

    const prism = svg
      .append('polygon')
      .attr('points', prismPoints.map(p => `${p.x},${p.y}`).join(' '))
      .attr('fill', 'rgba(255, 255, 255, 0.1)')
      .attr('stroke', 'rgba(255, 255, 255, 0.3)')
      .attr('stroke-width', 2)

    // Light rays
    function drawLightRays() {
      svg.selectAll('.light-ray').remove()

      const numRays = 20
      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 0.6 - Math.PI * 0.3
        const rayLength = 300

        // Primary ray
        const endX = lightSource.x + Math.cos(angle) * rayLength
        const endY = lightSource.y + Math.sin(angle) * rayLength

        // Check intersection with prism
        const intersection = findIntersection(
          lightSource.x,
          lightSource.y,
          endX,
          endY,
          prismPoints
        )

        if (intersection) {
          // Draw incident ray
          svg
            .append('line')
            .attr('class', 'light-ray')
            .attr('x1', lightSource.x)
            .attr('y1', lightSource.y)
            .attr('x2', intersection.x)
            .attr('y2', intersection.y)
            .attr('stroke', d3.interpolateRainbow(i / numRays))
            .attr('stroke-width', 2)
            .attr('opacity', 0.6)

          // Refracted ray
          const refractedAngle = angle + 0.3
          const refractedLength = 200
          const refractedX = intersection.x + Math.cos(refractedAngle) * refractedLength
          const refractedY = intersection.y + Math.sin(refractedAngle) * refractedLength

          svg
            .append('line')
            .attr('class', 'light-ray')
            .attr('x1', intersection.x)
            .attr('y1', intersection.y)
            .attr('x2', refractedX)
            .attr('y2', refractedY)
            .attr('stroke', d3.interpolateRainbow(i / numRays))
            .attr('stroke-width', 2)
            .attr('opacity', 0.4)
            .attr('stroke-dasharray', '5,5')
        }
      }
    }

    function findIntersection(x1, y1, x2, y2, triangle) {
      // Simplified intersection check
      for (let i = 0; i < triangle.length; i++) {
        const p1 = triangle[i]
        const p2 = triangle[(i + 1) % triangle.length]

        const denom = (x1 - x2) * (p1.y - p2.y) - (y1 - y2) * (p1.x - p2.x)
        if (Math.abs(denom) < 0.001) continue

        const t = ((p1.x - x1) * (p1.y - p2.y) - (p1.y - y1) * (p1.x - p2.x)) / denom
        const u = -((x1 - x2) * (p1.y - y1) - (y1 - y2) * (p1.x - x1)) / denom

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
          return {
            x: x1 + t * (x2 - x1),
            y: y1 + t * (y2 - y1),
          }
        }
      }
      return null
    }

    // Animate light source following mouse
    function animate() {
      lightSource.x += (mouse.x - lightSource.x) * 0.05
      lightSource.y += (mouse.y - lightSource.y) * 0.05
      lightSource.y = Math.max(50, Math.min(height - 50, lightSource.y))

      drawLightRays()
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
