'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function FlowChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 600

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(255, 255, 255, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    const nodes = [
      { id: 'start', label: 'Start', x: 100, y: 300, type: 'start' },
      { id: 'process1', label: 'Analysis', x: 250, y: 300, type: 'process' },
      { id: 'decision', label: 'Decision', x: 400, y: 300, type: 'decision' },
      { id: 'process2', label: 'Implementation', x: 550, y: 200, type: 'process' },
      { id: 'process3', label: 'Review', x: 550, y: 400, type: 'process' },
      { id: 'end', label: 'End', x: 700, y: 300, type: 'end' },
    ]

    const links = [
      { source: 'start', target: 'process1' },
      { source: 'process1', target: 'decision' },
      { source: 'decision', target: 'process2', label: 'Yes' },
      { source: 'decision', target: 'process3', label: 'No' },
      { source: 'process2', target: 'end' },
      { source: 'process3', target: 'end' },
    ]

    const nodeShapes = {
      start: (g, d) => {
        g.append('ellipse')
          .attr('rx', 50)
          .attr('ry', 30)
          .attr('fill', '#4CAF50')
          .attr('stroke', '#2E7D32')
          .attr('stroke-width', 2)
      },
      process: (g, d) => {
        g.append('rect')
          .attr('x', -60)
          .attr('y', -25)
          .attr('width', 120)
          .attr('height', 50)
          .attr('rx', 5)
          .attr('fill', '#2196F3')
          .attr('stroke', '#1565C0')
          .attr('stroke-width', 2)
      },
      decision: (g, d) => {
        const points = [
          [0, -30],
          [30, 0],
          [0, 30],
          [-30, 0],
        ]
        g.append('polygon')
          .attr('points', points.map(p => p.join(',')).join(' '))
          .attr('fill', '#FF9800')
          .attr('stroke', '#E65100')
          .attr('stroke-width', 2)
      },
      end: (g, d) => {
        g.append('ellipse')
          .attr('rx', 50)
          .attr('ry', 30)
          .attr('fill', '#F44336')
          .attr('stroke', '#C62828')
          .attr('stroke-width', 2)
      },
    }

    // Draw links
    links.forEach((link, i) => {
      const sourceNode = nodes.find(n => n.id === link.source)
      const targetNode = nodes.find(n => n.id === link.target)

      const line = svg
        .append('line')
        .attr('x1', sourceNode.x)
        .attr('y1', sourceNode.y)
        .attr('x2', sourceNode.x)
        .attr('y2', sourceNode.y)
        .attr('stroke', '#666')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)')

      line
        .transition()
        .duration(800)
        .delay(i * 200)
        .attr('x2', targetNode.x)
        .attr('y2', targetNode.y)

      // Link label
      if (link.label) {
        const midX = (sourceNode.x + targetNode.x) / 2
        const midY = (sourceNode.y + targetNode.y) / 2

        svg
          .append('text')
          .attr('x', midX)
          .attr('y', midY - 10)
          .attr('text-anchor', 'middle')
          .style('font-size', '11px')
          .style('fill', '#666')
          .style('background', 'white')
          .style('padding', '2px 4px')
          .text(link.label)
          .style('opacity', 0)
          .transition()
          .duration(300)
          .delay(800 + i * 200)
          .style('opacity', 1)
      }
    })

    // Arrow marker
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 5)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z')
      .attr('fill', '#666')

    // Draw nodes
    const nodeGroups = svg
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('opacity', 0)

    nodeGroups.each(function(d) {
      const g = d3.select(this)
      nodeShapes[d.type](g, d)

      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .style('fill', 'white')
        .text(d.label)
    })

    // Animate nodes
    nodeGroups
      .transition()
      .duration(500)
      .delay((d, i) => i * 150)
      .style('opacity', 1)

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text('Process Flow Chart')
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  )
}
