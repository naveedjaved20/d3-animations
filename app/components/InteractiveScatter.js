'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function InteractiveScatter() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 900
    const height = 600
    const margin = { top: 40, right: 40, bottom: 60, left: 60 }

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
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .text('Interactive Scatter Plot with Brush')

    // Generate data
    const data = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      category: Math.floor(Math.random() * 3),
      size: Math.random() * 10 + 5,
    }))

    const xScale = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right])
    const yScale = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top])
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Add axes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .style('font-size', '12px')

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      .style('font-size', '12px')

    // Brush
    const brush = d3
      .brush()
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ])
      .on('brush', brushed)
      .on('end', brushended)

    svg.append('g').attr('class', 'brush').call(brush)

    // Draw points
    const points = svg
      .selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 0)
      .attr('fill', d => color(d.category))
      .attr('opacity', 0.7)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 1).attr('r', d.size + 3)
        tooltip.style('opacity', 1)
      })
      .on('mousemove', function(event, d) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
          .html(`<strong>Point</strong><br/>X: ${d.x.toFixed(2)}<br/>Y: ${d.y.toFixed(2)}`)
      })
      .on('mouseout', function(event, d) {
        d3.select(this).attr('opacity', 0.7).attr('r', d.size)
        tooltip.style('opacity', 0)
      })

    points
      .transition()
      .duration(800)
      .delay((d, i) => i * 10)
      .attr('r', d => d.size)

    function brushed(event) {
      if (!event.selection) return
      const [[x0, y0], [x1, y1]] = event.selection

      points.classed('selected', d => {
        const cx = xScale(d.x)
        const cy = yScale(d.y)
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1
      })

      points.attr('opacity', d => {
        const cx = xScale(d.x)
        const cy = yScale(d.y)
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1 ? 1 : 0.3
      })
    }

    function brushended(event) {
      if (!event.selection) {
        points.classed('selected', false).attr('opacity', 0.7)
      }
    }

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
