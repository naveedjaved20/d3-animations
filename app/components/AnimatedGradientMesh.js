'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function AnimatedGradientMesh() {
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
      .style('background', '#1a1a2e')
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
      .text('Animated Gradient Mesh')

    const gridSize = 20
    const cols = Math.ceil(width / gridSize)
    const rows = Math.ceil(height / gridSize)

    const defs = svg.append('defs')

    // Create gradient mesh
    const mesh = svg.append('g')

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize
        const y = j * gridSize
        const id = `gradient-${i}-${j}`

        const gradient = defs
          .append('linearGradient')
          .attr('id', id)
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '100%')
          .attr('y2', '100%')

        const hue = (i + j) * 2
        gradient
          .append('stop')
          .attr('offset', '0%')
          .attr('stop-color', d3.hsl(hue % 360, 0.7, 0.5))
          .attr('stop-opacity', 0.8)

        gradient
          .append('stop')
          .attr('offset', '100%')
          .attr('stop-color', d3.hsl((hue + 60) % 360, 0.7, 0.5))
          .attr('stop-opacity', 0.8)

        mesh
          .append('rect')
          .attr('x', x)
          .attr('y', y)
          .attr('width', gridSize)
          .attr('height', gridSize)
          .attr('fill', `url(#${id})`)
          .attr('opacity', 0)
      }
    }

    // Animate mesh appearance
    mesh
      .selectAll('rect')
      .transition()
      .duration(2000)
      .delay((d, i) => i * 5)
      .attr('opacity', 0.6)

    // Animate gradient colors
    function animateGradients() {
      mesh.selectAll('rect').each(function(d, i) {
        const rect = d3.select(this)
        const currentFill = rect.attr('fill')
        const match = currentFill.match(/gradient-(\d+)-(\d+)/)
        if (match) {
          const col = parseInt(match[1])
          const row = parseInt(match[2])
          const hue = ((col + row) * 2 + Date.now() / 50) % 360

          const gradient = defs.select(`#gradient-${col}-${row}`)
          gradient
            .select('stop:first-child')
            .attr('stop-color', d3.hsl(hue, 0.7, 0.5))
          gradient
            .select('stop:last-child')
            .attr('stop-color', d3.hsl((hue + 60) % 360, 0.7, 0.5))
        }
      })

      requestAnimationFrame(animateGradients)
    }

    setTimeout(() => animateGradients(), 2000)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
