'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function SankeyDiagram() {
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
      .text('Flow Diagram (Sankey)')

    const g = svg.append('g')

    // Simplified Sankey-like diagram
    const nodes = [
      { id: 0, name: 'Source A', x: 100, y: 150, value: 100 },
      { id: 1, name: 'Source B', x: 100, y: 300, value: 80 },
      { id: 2, name: 'Source C', x: 100, y: 450, value: 60 },
      { id: 3, name: 'Process 1', x: 400, y: 200, value: 120 },
      { id: 4, name: 'Process 2', x: 400, y: 400, value: 120 },
      { id: 5, name: 'Output X', x: 700, y: 200, value: 80 },
      { id: 6, name: 'Output Y', x: 700, y: 350, value: 100 },
      { id: 7, name: 'Output Z', x: 700, y: 500, value: 60 },
    ]

    const links = [
      { source: 0, target: 3, value: 60 },
      { source: 0, target: 4, value: 40 },
      { source: 1, target: 3, value: 40 },
      { source: 1, target: 4, value: 40 },
      { source: 2, target: 4, value: 40 },
      { source: 2, target: 3, value: 20 },
      { source: 3, target: 5, value: 50 },
      { source: 3, target: 6, value: 70 },
      { source: 4, target: 6, value: 30 },
      { source: 4, target: 7, value: 90 },
    ]

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Draw links
    links.forEach((link, i) => {
      const source = nodes[link.source]
      const target = nodes[link.target]

      const pathData = d3.path()
      const midX = (source.x + target.x) / 2

      pathData.moveTo(source.x, source.y)
      pathData.bezierCurveTo(midX, source.y, midX, target.y, target.x, target.y)

      const linkGroup = g.append('g')

      const pathElement = linkGroup
        .append('path')
        .attr('d', pathData.toString())
        .attr('fill', 'none')
        .attr('stroke', color(link.source))
        .attr('stroke-width', 0)
        .attr('opacity', 0.3)
        .attr('id', `path-${i}`)

      pathElement
        .transition()
        .duration(1000)
        .delay(i * 100)
        .attr('stroke-width', link.value / 5)

      // Animated flow along path
      const flowCircle = linkGroup
        .append('circle')
        .attr('r', 4)
        .attr('fill', color(link.source))
        .attr('opacity', 0)

      flowCircle
        .transition()
        .duration(2000)
        .delay(1000 + i * 100)
        .attrTween('transform', function() {
          const pathNode = pathElement.node()
          const pathLength = pathNode.getTotalLength()
          return function(t) {
            const point = pathNode.getPointAtLength(t * pathLength)
            return `translate(${point.x}, ${point.y})`
          }
        })
        .style('opacity', 0.8)
        .transition()
        .duration(500)
        .style('opacity', 0)
    })

    // Draw nodes
    nodes.forEach((node, i) => {
      const nodeGroup = g.append('g').attr('opacity', 0)

      nodeGroup
        .append('rect')
        .attr('x', node.x - 60)
        .attr('y', node.y - 30)
        .attr('width', 0)
        .attr('height', 60)
        .attr('rx', 5)
        .attr('fill', color(i))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .transition()
        .duration(600)
        .delay(i * 100)
        .attr('width', 120)
        .style('opacity', 1)

      nodeGroup
        .append('text')
        .attr('x', node.x)
        .attr('y', node.y)
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .style('fill', '#333')
        .text(node.name)
        .style('opacity', 0)
        .transition()
        .duration(400)
        .delay(600 + i * 100)
        .style('opacity', 1)

      nodeGroup
        .transition()
        .duration(300)
        .delay(i * 100)
        .attr('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
