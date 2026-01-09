'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function DNAHelix() {
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
      .text('3D DNA Helix Visualization')

    const centerX = width / 2
    const centerY = height / 2
    const radius = 100
    const numStrands = 2
    const numNodes = 30
    let rotation = 0

    const g = svg.append('g').attr('transform', `translate(${centerX}, ${centerY})`)

    // Create DNA strands
    const strands = []
    for (let s = 0; s < numStrands; s++) {
      const strand = []
      for (let i = 0; i < numNodes; i++) {
        const z = (i / numNodes - 0.5) * 200
        strand.push({
          z,
          index: i,
          strand: s,
        })
      }
      strands.push(strand)
    }

    function project3D(x, y, z) {
      const scale = 300 / (300 + z)
      return {
        x: x * scale,
        y: y * scale,
        scale,
      }
    }

    function animate() {
      rotation += 0.02

      // Clear previous frame
      g.selectAll('.dna-node, .dna-link').remove()

      strands.forEach((strand, s) => {
        strand.forEach((node, i) => {
          const angle = rotation + (i / numNodes) * Math.PI * 4 + (s * Math.PI)
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          const projected = project3D(x, y, node.z)

          // Draw node
          const circle = g
            .append('circle')
            .attr('class', 'dna-node')
            .attr('cx', projected.x)
            .attr('cy', projected.y)
            .attr('r', 8 * projected.scale)
            .attr('fill', s === 0 ? '#667eea' : '#f093fb')
            .attr('opacity', projected.scale)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)

          // Draw links to next node
          if (i < strand.length - 1) {
            const nextAngle = rotation + ((i + 1) / numNodes) * Math.PI * 4 + (s * Math.PI)
            const nextX = Math.cos(nextAngle) * radius
            const nextY = Math.sin(nextAngle) * radius
            const nextProjected = project3D(nextX, nextY, strand[i + 1].z)

            g.append('line')
              .attr('class', 'dna-link')
              .attr('x1', projected.x)
              .attr('y1', projected.y)
              .attr('x2', nextProjected.x)
              .attr('y2', nextProjected.y)
              .attr('stroke', s === 0 ? '#667eea' : '#f093fb')
              .attr('stroke-width', 2 * projected.scale)
              .attr('opacity', projected.scale * 0.6)
          }

          // Draw cross-links between strands
          if (s === 0 && i < strands[1].length) {
            const otherAngle = rotation + (i / numNodes) * Math.PI * 4 + Math.PI
            const otherX = Math.cos(otherAngle) * radius
            const otherY = Math.sin(otherAngle) * radius
            const otherProjected = project3D(otherX, otherY, node.z)

            g.append('line')
              .attr('class', 'dna-link')
              .attr('x1', projected.x)
              .attr('y1', projected.y)
              .attr('x2', otherProjected.x)
              .attr('y2', otherProjected.y)
              .attr('stroke', '#fff')
              .attr('stroke-width', 1)
              .attr('opacity', projected.scale * 0.3)
          }
        })
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
