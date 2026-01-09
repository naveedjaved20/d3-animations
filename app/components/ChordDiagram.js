'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ChordDiagram() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 800
    const radius = Math.min(width, height) / 2 - 40

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
      .text('Relationship Flow Diagram')

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    // Matrix data showing relationships
    const matrix = [
      [0, 20, 15, 10], // A to others
      [25, 0, 12, 18], // B to others
      [18, 15, 0, 22], // C to others
      [12, 20, 25, 0], // D to others
    ]

    const names = ['Web', 'Mobile', 'Cloud', 'Data']

    const chord = d3.chord().padAngle(0.05)
    const chords = chord(matrix)
    const arc = d3.arc().innerRadius(radius - 20).outerRadius(radius)
    const ribbon = d3.ribbon().radius(radius - 20)

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Arcs
    const arcs = g
      .selectAll('.arc')
      .data(chords.groups)
      .enter()
      .append('g')
      .attr('class', 'arc')

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 150)
      .style('opacity', 0.7)

    // Labels
    arcs
      .append('text')
      .each(function(d) {
        d.angle = (d.startAngle + d.endAngle) / 2
      })
      .attr('dy', '.35em')
      .attr('transform', d => {
        const c = d3.arc().centroid({ startAngle: d.angle, endAngle: d.angle, innerRadius: radius + 20, outerRadius: radius + 20 })
        return `translate(${c}) rotate(${(d.angle * 180) / Math.PI - 90})`
      })
      .attr('text-anchor', d => (d.angle > Math.PI ? 'end' : null))
      .style('font-size', '14px')
      .style('font-weight', '600')
      .style('fill', '#333')
      .text((d, i) => names[i])
      .style('opacity', 0)
      .transition()
      .duration(500)
      .delay(1000)
      .style('opacity', 1)

    // Ribbons (connections)
    g.selectAll('.ribbon')
      .data(chords)
      .enter()
      .append('path')
      .attr('class', 'ribbon')
      .attr('d', ribbon)
      .attr('fill', d => color(d.source.index))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(1200)
      .style('opacity', 0.6)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '800px' }}></svg>
    </div>
  )
}
