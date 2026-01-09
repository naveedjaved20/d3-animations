'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function FractalTree() {
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
      .text('Interactive Fractal Tree - Click to Grow')

    const g = svg.append('g')
    let depth = 0
    const maxDepth = 8

    function drawBranch(x1, y1, angle, length, currentDepth) {
      if (currentDepth > depth || length < 2) return

      const x2 = x1 + Math.cos(angle) * length
      const y2 = y1 + Math.sin(angle) * length

      // Draw branch
      const line = g
        .append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x1)
        .attr('y1', y1)
        .attr('stroke', d3.interpolateViridis(currentDepth / maxDepth))
        .attr('stroke-width', Math.max(1, length / 10))
        .attr('opacity', 0)

      line
        .transition()
        .duration(500)
        .delay(currentDepth * 50)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('opacity', 1)

      if (currentDepth < depth) {
        // Draw child branches
        const newLength = length * 0.7
        const angle1 = angle - Math.PI / 6
        const angle2 = angle + Math.PI / 6

        drawBranch(x2, y2, angle1, newLength, currentDepth + 1)
        drawBranch(x2, y2, angle2, newLength, currentDepth + 1)
      }
    }

    function drawTree() {
      g.selectAll('*').remove()
      const startX = width / 2
      const startY = height - 50
      const startAngle = -Math.PI / 2
      const startLength = 100

      drawBranch(startX, startY, startAngle, startLength, 0)
    }

    svg.on('click', function() {
      if (depth < maxDepth) {
        depth++
        drawTree()
      }
    })

    drawTree()
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
