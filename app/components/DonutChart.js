'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function DonutChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 700
    const height = 700
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
      .text('Animated Donut Chart')

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const data = [
      { label: 'Web', value: 35 },
      { label: 'Mobile', value: 25 },
      { label: 'Desktop', value: 20 },
      { label: 'Cloud', value: 15 },
      { label: 'Other', value: 5 },
    ]

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const pie = d3.pie().value(d => d.value).sort(null)
    const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius)
    const arcHover = d3.arc().innerRadius(radius * 0.6).outerRadius(radius + 20)

    const arcs = g
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')

    const paths = arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .attr('stroke', 'white')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arcHover)
        tooltip.style('opacity', 1)
      })
      .on('mousemove', function(event, d) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
          .html(`<strong>${d.data.label}</strong><br/>${d.data.value}%`)
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arc)
        tooltip.style('opacity', 0)
      })

    // Animate slices
    paths
      .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
        return function(t) {
          return arc(interpolate(t))
        }
      })

    // Center text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-10')
      .style('font-size', '32px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text('Total')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(1000)
      .style('opacity', 1)

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '20')
      .style('font-size', '24px')
      .style('fill', '#667eea')
      .text(data.reduce((sum, d) => sum + d.value, 0) + '%')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(1200)
      .style('opacity', 1)

    // Labels
    arcs
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .text(d => d.data.value + '%')
      .style('opacity', 0)
      .transition()
      .duration(500)
      .delay(1000)
      .style('opacity', 1)

    // Legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 150}, 60)`)

    data.forEach((d, i) => {
      const legendItem = legend.append('g').attr('transform', `translate(0, ${i * 25})`)

      legendItem
        .append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', color(i))

      legendItem
        .append('text')
        .attr('x', 20)
        .attr('y', 12)
        .style('font-size', '12px')
        .text(d.label)
    })

    // Tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('padding', '8px 12px')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', 1000)

    return () => {
      tooltip.remove()
    }
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '700px' }}></svg>
    </div>
  )
}
