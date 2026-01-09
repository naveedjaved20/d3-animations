'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function MagneticField() {
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
      .style('background', 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)')
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
      .text('Magnetic Field Visualization - Move Mouse')

    const mouse = { x: width / 2, y: height / 2 }

    svg.on('mousemove', function(event) {
      const [mx, my] = d3.pointer(event)
      mouse.x = mx
      mouse.y = my
    })

    // Magnetic poles
    const poles = [
      { x: width / 3, y: height / 2, charge: 1 },
      { x: (2 * width) / 3, y: height / 2, charge: -1 },
    ]

    // Draw field lines
    function drawFieldLines() {
      svg.selectAll('.field-line').remove()

      const numLines = 30
      for (let i = 0; i < numLines; i++) {
        const startAngle = (i / numLines) * Math.PI * 2
        const startRadius = 30
        let x = poles[0].x + Math.cos(startAngle) * startRadius
        let y = poles[0].y + Math.sin(startAngle) * startRadius

        const path = d3.path()
        path.moveTo(x, y)

        // Trace field line
        for (let step = 0; step < 200; step++) {
          let fx = 0,
            fy = 0

          poles.forEach(pole => {
            const dx = x - pole.x
            const dy = y - pole.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const force = (pole.charge * 1000) / (dist * dist)
            fx += (dx / dist) * force
            fy += (dy / dist) * force
          })

          // Mouse influence
          const mdx = x - mouse.x
          const mdy = y - mouse.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          const mforce = 500 / (mdist * mdist)
          fx += (mdx / mdist) * mforce
          fy += (mdy / mdist) * mforce

          const magnitude = Math.sqrt(fx * fx + fy * fy)
          if (magnitude > 0) {
            x += (fx / magnitude) * 5
            y += (fy / magnitude) * 5
            path.lineTo(x, y)
          }

          if (x < 0 || x > width || y < 0 || y > height) break
        }

        svg
          .append('path')
          .attr('class', 'field-line')
          .attr('d', path.toString())
          .attr('fill', 'none')
          .attr('stroke', d3.interpolateRainbow(i / numLines))
          .attr('stroke-width', 2)
          .attr('opacity', 0.6)
      }
    }

    // Draw poles
    poles.forEach((pole, i) => {
      const poleGroup = svg.append('g')

      poleGroup
        .append('circle')
        .attr('cx', pole.x)
        .attr('cy', pole.y)
        .attr('r', 20)
        .attr('fill', pole.charge > 0 ? '#ff6b6b' : '#4ecdc4')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)

      poleGroup
        .append('text')
        .attr('x', pole.x)
        .attr('y', pole.y)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '20px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .text(pole.charge > 0 ? '+' : '−')
    })

    function animate() {
      drawFieldLines()
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
