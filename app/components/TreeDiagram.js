'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function TreeDiagram() {
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
      .text('Organizational Tree Structure')

    // Create hierarchical data
    const data = {
      name: 'CEO',
      children: [
        {
          name: 'CTO',
          children: [
            { name: 'Dev Team Lead' },
            { name: 'QA Lead' },
          ],
        },
        {
          name: 'CMO',
          children: [
            { name: 'Marketing Lead' },
            { name: 'Sales Lead' },
          ],
        },
        {
          name: 'CFO',
          children: [
            { name: 'Finance Lead' },
            { name: 'Accounting Lead' },
          ],
        },
      ],
    }

    const root = d3.hierarchy(data)
    const treeLayout = d3.tree().size([width - 200, height - 150])
    treeLayout(root)

    const g = svg.append('g').attr('transform', 'translate(100, 80)')

    // Links
    const links = g
      .selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d => {
        return `M ${d.source.x} ${d.source.y} L ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`
      })
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2)
      .style('opacity', 0)

    links
      .transition()
      .duration(800)
      .attr('d', d3.linkHorizontal().x(d => d.x).y(d => d.y))
      .style('opacity', 1)

    // Nodes
    const nodes = g
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('opacity', 0)

    nodes
      .append('circle')
      .attr('r', 0)
      .attr('fill', d => (d.children ? '#667eea' : '#764ba2'))
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)

    nodes
      .select('circle')
      .transition()
      .duration(600)
      .delay((d, i) => i * 100)
      .attr('r', d => (d.children ? 25 : 20))
      .style('opacity', 1)

    nodes
      .append('text')
      .attr('dy', '.35em')
      .attr('x', d => (d.children ? -35 : 35))
      .style('text-anchor', d => (d.children ? 'end' : 'start'))
      .style('font-size', '12px')
      .style('font-weight', '600')
      .style('fill', '#333')
      .text(d => d.data.name)
      .style('opacity', 0)
      .transition()
      .duration(400)
      .delay((d, i) => 600 + i * 100)
      .style('opacity', 1)

    nodes
      .transition()
      .duration(400)
      .delay((d, i) => i * 100)
      .style('opacity', 1)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
