'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function VoronoiDiagram() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 900
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
      .text('Interactive Voronoi Diagram')

    // Generate random points
    const points = Array.from({ length: 50 }, () => [
      Math.random() * (width - 100) + 50,
      Math.random() * (height - 100) + 50,
    ])

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Create Voronoi diagram
    const voronoi = d3.Delaunay.from(points).voronoi([0, 0, width, height])

    // Draw Voronoi cells
    const cells = svg
      .selectAll('.cell')
      .data(points)
      .enter()
      .append('path')
      .attr('class', 'cell')
      .attr('d', (d, i) => voronoi.renderCell(i))
      .attr('fill', (d, i) => color(i % 10))
      .attr('opacity', 0.3)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .style('opacity', 0)
      .on('mouseenter', function() {
        d3.select(this).attr('opacity', 0.6).attr('stroke-width', 2)
      })
      .on('mouseleave', function() {
        d3.select(this).attr('opacity', 0.3).attr('stroke-width', 1)
      })

    cells
      .transition()
      .duration(800)
      .delay((d, i) => i * 20)
      .style('opacity', 0.3)

    // Draw points
    const pointCircles = svg
      .selectAll('.point')
      .data(points)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', d => d[0])
      .attr('cy', d => d[1])
      .attr('r', 0)
      .attr('fill', (d, i) => color(i % 10))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')

    pointCircles
      .transition()
      .duration(600)
      .delay((d, i) => 1000 + i * 20)
      .attr('r', 6)
      .on('end', function() {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('r', 8)
          .transition()
          .duration(300)
          .attr('r', 6)
      })

    // Animate points
    function animate() {
      points.forEach((point, i) => {
        point[0] += (Math.random() - 0.5) * 2
        point[1] += (Math.random() - 0.5) * 2

        // Keep within bounds
        point[0] = Math.max(50, Math.min(width - 50, point[0]))
        point[1] = Math.max(50, Math.min(height - 50, point[1]))

        pointCircles.filter((d, j) => j === i).attr('cx', point[0]).attr('cy', point[1])
      })

      // Update Voronoi
      const newVoronoi = d3.Delaunay.from(points).voronoi([0, 0, width, height])
      cells.attr('d', (d, i) => newVoronoi.renderCell(i))

      requestAnimationFrame(animate)
    }

    setTimeout(() => animate(), 2000)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '900px' }}></svg>
    </div>
  )
}
