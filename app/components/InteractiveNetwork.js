'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function InteractiveNetwork() {
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
      .style('background', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
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
      .text('Interactive Network with Sparkle Effects')

    const nodes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      group: Math.floor(Math.random() * 3),
    }))

    const links = []
    for (let i = 0; i < nodes.length; i++) {
      if (i < nodes.length - 1) {
        links.push({ source: i, target: i + 1 })
      }
      if (Math.random() > 0.7 && i < nodes.length - 3) {
        links.push({ source: i, target: i + Math.floor(Math.random() * 3) + 1 })
      }
    }

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30))

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Links
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#fff')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 2)

    // Nodes
    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 15)
      .attr('fill', d => color(d.group))
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer')
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )
      .on('click', function(event, d) {
        // Sparkle effect
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2
          const sparkle = svg
            .append('circle')
            .attr('cx', d.x)
            .attr('cy', d.y)
            .attr('r', 3)
            .attr('fill', '#fff')
            .attr('opacity', 1)

          sparkle
            .transition()
            .duration(800)
            .attr('cx', d.x + Math.cos(angle) * 50)
            .attr('cy', d.y + Math.sin(angle) * 50)
            .attr('r', 0)
            .attr('opacity', 0)
            .remove()
        }

        // Pulse effect
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 25)
          .transition()
          .duration(200)
          .attr('r', 15)
      })

    // Labels
    const label = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text(d => d.id)
      .attr('font-size', '10px')
      .attr('dx', 20)
      .attr('dy', 5)
      .attr('fill', 'white')

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      node.attr('cx', d => d.x).attr('cy', d => d.y)
      label.attr('x', d => d.x).attr('y', d => d.y)
    })

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event, d) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
