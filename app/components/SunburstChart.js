'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function SunburstChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 800
    const radius = Math.min(width, height) / 2

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
      .text('Hierarchical Sunburst Chart')

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    // Hierarchical data
    const data = {
      name: 'Root',
      children: [
        {
          name: 'Tech',
          children: [
            { name: 'Web', value: 30 },
            { name: 'Mobile', value: 25 },
            { name: 'Cloud', value: 20 },
          ],
        },
        {
          name: 'Design',
          children: [
            { name: 'UI/UX', value: 35 },
            { name: 'Branding', value: 20 },
          ],
        },
        {
          name: 'Marketing',
          children: [
            { name: 'Digital', value: 40 },
            { name: 'Content', value: 30 },
          ],
        },
      ],
    }

    const root = d3.hierarchy(data).sum(d => d.value)
    const partition = d3.partition().size([2 * Math.PI, radius])

    partition(root)

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const arc = d3
      .arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1)

    const paths = g
      .selectAll('path')
      .data(root.descendants().filter(d => d.depth))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => {
        while (d.depth > 1) d = d.parent
        return color(d.data.name)
      })
      .attr('opacity', 0.8)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('opacity', 0)

    paths
      .transition()
      .duration(800)
      .delay((d, i) => i * 50)
      .style('opacity', 0.8)
      .on('start', function() {
        d3.select(this).attr('d', arc.startAngle(d => d.x0).endAngle(d => d.x0))
      })
      .transition()
      .duration(800)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate(d.x0, d.x1)
        return function(t) {
          d.x1 = interpolate(t)
          return arc(d)
        }
      })

    // Labels
    const labels = g
      .selectAll('text')
      .data(root.descendants().filter(d => d.depth && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03))
      .enter()
      .append('text')
      .attr('transform', d => {
        const x = ((d.x0 + d.x1) / 2) * 180 / Math.PI
        const y = (d.y0 + d.y1) / 2
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
      })
      .attr('dy', '.35em')
      .attr('text-anchor', d => (d.x < Math.PI ? 'start' : 'end'))
      .style('font-size', '11px')
      .style('font-weight', '600')
      .style('fill', '#333')
      .text(d => d.data.name)
      .style('opacity', 0)
      .transition()
      .duration(400)
      .delay(1000)
      .style('opacity', 1)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '800px' }}></svg>
    </div>
  )
}
