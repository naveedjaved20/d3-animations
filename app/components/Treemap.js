'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function Treemap() {
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
      .text('Hierarchical Treemap')

    const g = svg.append('g').attr('transform', 'translate(20, 60)')

    const data = {
      name: 'Root',
      children: [
        {
          name: 'Category A',
          children: [
            { name: 'Item 1', value: 40 },
            { name: 'Item 2', value: 30 },
            { name: 'Item 3', value: 20 },
          ],
        },
        {
          name: 'Category B',
          children: [
            { name: 'Item 4', value: 50 },
            { name: 'Item 5', value: 35 },
          ],
        },
        {
          name: 'Category C',
          children: [
            { name: 'Item 6', value: 45 },
            { name: 'Item 7', value: 25 },
            { name: 'Item 8', value: 30 },
          ],
        },
      ],
    }

    const root = d3.hierarchy(data).sum(d => d.value)
    const treemap = d3.treemap().size([width - 40, height - 80]).padding(2)

    treemap(root)

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const cells = g
      .selectAll('.cell')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('class', 'cell')
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`)
      .style('opacity', 0)

    // Rectangles
    cells
      .append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => {
        while (d.depth > 1) d = d.parent
        return color(d.data.name)
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', 0.8)
      .style('cursor', 'pointer')
      .on('mouseover', function() {
        d3.select(this).attr('opacity', 1).attr('stroke-width', 3)
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 0.8).attr('stroke-width', 2)
      })

    // Labels
    cells
      .append('text')
      .attr('x', d => (d.x1 - d.x0) / 2)
      .attr('y', d => (d.y1 - d.y0) / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .style('font-size', d => Math.min(14, (d.x1 - d.x0) / 8) + 'px')
      .style('font-weight', '600')
      .style('fill', '#333')
      .text(d => d.data.name)
      .style('opacity', 0)

    // Animate
    cells
      .transition()
      .duration(800)
      .delay((d, i) => i * 50)
      .style('opacity', 1)

    cells
      .select('text')
      .transition()
      .duration(500)
      .delay((d, i) => 800 + i * 50)
      .style('opacity', 1)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
