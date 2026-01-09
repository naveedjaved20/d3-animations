'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function Heatmap() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 900
    const height = 500
    const margin = { top: 60, right: 60, bottom: 60, left: 100 }

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
      .text('Activity Heatmap')

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const hours = Array.from({ length: 24 }, (_, i) => i)

    // Generate random data
    const data = []
    days.forEach((day, i) => {
      hours.forEach((hour, j) => {
        data.push({
          day,
          hour,
          value: Math.random() * 100,
          dayIndex: i,
          hourIndex: j,
        })
      })
    })

    const cellWidth = (width - margin.left - margin.right) / days.length
    const cellHeight = (height - margin.top - margin.bottom) / hours.length

    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, 100])

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Day labels
    days.forEach((day, i) => {
      g.append('text')
        .attr('x', i * cellWidth + cellWidth / 2)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .style('fill', '#333')
        .text(day)
        .style('opacity', 0)
        .transition()
        .duration(300)
        .delay(i * 50)
        .style('opacity', 1)
    })

    // Hour labels
    hours.forEach((hour, i) => {
      if (i % 2 === 0) {
        g.append('text')
          .attr('x', -10)
          .attr('y', i * cellHeight + cellHeight / 2)
          .attr('text-anchor', 'end')
          .attr('dy', '.35em')
          .style('font-size', '11px')
          .style('fill', '#666')
          .text(hour + ':00')
          .style('opacity', 0)
          .transition()
          .duration(300)
          .delay(i * 30)
          .style('opacity', 1)
      }
    })

    // Cells
    const cells = g
      .selectAll('.cell')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', d => d.dayIndex * cellWidth)
      .attr('y', d => d.hourIndex * cellHeight)
      .attr('width', cellWidth - 2)
      .attr('height', cellHeight - 2)
      .attr('rx', 3)
      .attr('fill', d => colorScale(d.value))
      .attr('opacity', 0)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 1).attr('stroke', '#333').attr('stroke-width', 2)
        tooltip.style('opacity', 1)
      })
      .on('mousemove', function(event, d) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
          .html(`<strong>${d.day} ${d.hour}:00</strong><br/>Value: ${Math.round(d.value)}`)
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 0.8).attr('stroke', 'none')
        tooltip.style('opacity', 0)
      })

    cells
      .transition()
      .duration(400)
      .delay((d, i) => i * 2)
      .attr('opacity', 0.8)

    // Legend
    const legendWidth = 200
    const legendHeight = 20
    const legendX = width - margin.right - legendWidth
    const legendY = margin.top / 2

    const legendScale = d3.scaleLinear().domain([0, 100]).range([0, legendWidth])

    const legendAxis = d3.axisBottom(legendScale).ticks(5)

    const legendG = svg
      .append('g')
      .attr('transform', `translate(${legendX}, ${legendY})`)

    const defs = svg.append('defs')
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'heatmap-gradient')
      .attr('x1', '0%')
      .attr('x2', '100%')

    gradient
      .selectAll('stop')
      .data(d3.range(0, 1.01, 0.1))
      .enter()
      .append('stop')
      .attr('offset', d => d * 100 + '%')
      .attr('stop-color', d => colorScale(d * 100))

    legendG
      .append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', 'url(#heatmap-gradient)')
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .delay(1000)
      .attr('opacity', 1)

    legendG
      .append('g')
      .attr('transform', `translate(0, ${legendHeight})`)
      .call(legendAxis)
      .style('font-size', '10px')
      .style('opacity', 0)
      .transition()
      .duration(500)
      .delay(1000)
      .style('opacity', 1)

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
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '900px' }}></svg>
    </div>
  )
}
