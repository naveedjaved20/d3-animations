'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function BubbleChart() {
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
      .text('Bubble Chart Visualization')

    const margin = { top: 60, right: 60, bottom: 60, left: 60 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Data
    const data = [
      { name: 'Product A', x: 20, y: 30, size: 40, category: 'Tech' },
      { name: 'Product B', x: 50, y: 60, size: 60, category: 'Design' },
      { name: 'Product C', x: 70, y: 40, size: 35, category: 'Tech' },
      { name: 'Product D', x: 30, y: 70, size: 50, category: 'Marketing' },
      { name: 'Product E', x: 80, y: 80, size: 45, category: 'Design' },
      { name: 'Product F', x: 40, y: 20, size: 30, category: 'Tech' },
      { name: 'Product G', x: 60, y: 50, size: 55, category: 'Marketing' },
      { name: 'Product H', x: 90, y: 30, size: 40, category: 'Design' },
    ]

    const xScale = d3.scaleLinear().domain([0, 100]).range([0, chartWidth])
    const yScale = d3.scaleLinear().domain([0, 100]).range([chartHeight, 0])
    const rScale = d3.scaleSqrt().domain([0, 100]).range([10, 60])

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Axes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    g.append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis)
      .style('font-size', '12px')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(500)
      .style('opacity', 1)

    g.append('g')
      .call(yAxis)
      .style('font-size', '12px')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(500)
      .style('opacity', 1)

    // Axis labels
    g.append('text')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '600')
      .text('Performance')
      .style('opacity', 0)
      .transition()
      .duration(500)
      .delay(1000)
      .style('opacity', 1)

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -chartHeight / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '600')
      .text('Quality')
      .style('opacity', 0)
      .transition()
      .duration(500)
      .delay(1000)
      .style('opacity', 1)

    // Bubbles
    const bubbles = g
      .selectAll('.bubble')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bubble')
      .attr('transform', d => `translate(${xScale(d.x)}, ${yScale(d.y)})`)
      .style('opacity', 0)

    bubbles
      .append('circle')
      .attr('r', 0)
      .attr('fill', d => color(d.category))
      .attr('opacity', 0.7)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 1).attr('stroke-width', 3)
        tooltip.style('opacity', 1)
      })
      .on('mousemove', function(event, d) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
          .html(`<strong>${d.name}</strong><br/>Category: ${d.category}<br/>Size: ${d.size}`)
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 0.7).attr('stroke-width', 2)
        tooltip.style('opacity', 0)
      })

    bubbles
      .select('circle')
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr('r', d => rScale(d.size))
      .style('opacity', 0.7)

    bubbles
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('font-size', '11px')
      .style('font-weight', '600')
      .style('fill', '#333')
      .text(d => d.name)
      .style('opacity', 0)
      .transition()
      .duration(500)
      .delay((d, i) => 1000 + i * 100)
      .style('opacity', 1)

    bubbles
      .transition()
      .duration(500)
      .delay((d, i) => i * 100)
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
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
