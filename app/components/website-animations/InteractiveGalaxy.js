'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function InteractiveGalaxy() {
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
      .style('background', 'radial-gradient(circle, #1a1a2e 0%, #000000 100%)')
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
      .text('Interactive Galaxy - Move Mouse to Explore')

    const centerX = width / 2
    const centerY = height / 2
    const mouse = { x: centerX, y: centerY }

    svg.on('mousemove', function(event) {
      const [mx, my] = d3.pointer(event)
      mouse.x = mx
      mouse.y = my
    })

    // Create stars
    const numStars = 200
    const stars = Array.from({ length: numStars }, () => {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 250
      return {
        angle,
        distance,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.01 + 0.005,
        twinkle: Math.random() * Math.PI * 2,
      }
    })

    const starElements = svg
      .selectAll('.star')
      .data(stars)
      .enter()
      .append('circle')
      .attr('class', 'star')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.size)
      .attr('fill', 'white')
      .attr('opacity', 0.8)

    // Create spiral arms
    function createSpiralArm(angleOffset, color) {
      const points = []
      for (let i = 0; i < 100; i++) {
        const t = i / 100
        const angle = angleOffset + t * Math.PI * 4
        const distance = t * 200
        points.push({
          angle,
          distance,
          t,
        })
      }
      return { points, color }
    }

    const arms = [
      createSpiralArm(0, '#667eea'),
      createSpiralArm(Math.PI, '#f093fb'),
    ]

    function animate() {
      // Animate stars
      stars.forEach((star, i) => {
        // Rotate around center
        star.angle += star.speed

        // Magnetic effect toward mouse
        const dx = mouse.x - centerX
        const dy = mouse.y - centerY
        const mouseAngle = Math.atan2(dy, dx)
        const angleDiff = mouseAngle - star.angle
        star.angle += Math.sin(angleDiff) * 0.02

        // Update position
        star.x = centerX + Math.cos(star.angle) * star.distance
        star.y = centerY + Math.sin(star.angle) * star.distance

        // Twinkle
        star.twinkle += 0.1
        const opacity = 0.5 + Math.sin(star.twinkle) * 0.3

        starElements
          .filter((d, j) => j === i)
          .attr('cx', star.x)
          .attr('cy', star.y)
          .attr('opacity', opacity)
      })

      // Draw spiral arms
      svg.selectAll('.spiral-arm').remove()
      arms.forEach(arm => {
        const path = d3.path()
        arm.points.forEach((point, i) => {
          const angle = point.angle + Date.now() / 5000
          const x = centerX + Math.cos(angle) * point.distance
          const y = centerY + Math.sin(angle) * point.distance

          if (i === 0) {
            path.moveTo(x, y)
          } else {
            path.lineTo(x, y)
          }
        })

        svg
          .append('path')
          .attr('class', 'spiral-arm')
          .attr('d', path.toString())
          .attr('fill', 'none')
          .attr('stroke', arm.color)
          .attr('stroke-width', 2)
          .attr('opacity', 0.3)
      })

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
