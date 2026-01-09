'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function BarChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 500
    const margin = { top: 40, right: 40, bottom: 60, left: 60 }

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(255, 255, 255, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    const data = [
      { category: 'Q1', value: 45 },
      { category: 'Q2', value: 78 },
      { category: 'Q3', value: 92 },
      { category: 'Q4', value: 65 },
      { category: 'Q5', value: 88 },
      { category: 'Q6', value: 120 },
    ]

    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.2)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top])

    // Add axes
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .style('font-size', '12px')

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale))
      .style('font-size', '12px')

    // Add title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text('Quarterly Performance')

    // Create bars with animation
    const bars = svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.category))
      .attr('width', xScale.bandwidth())
      .attr('y', height - margin.bottom)
      .attr('height', 0)
      .attr('fill', (d, i) => d3.schemeCategory10[i % 10])
      .attr('rx', 5)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 0.7)
        tooltip.style('opacity', 1)
      })
      .on('mousemove', function(event, d) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
          .html(`<strong>${d.category}</strong><br/>Value: ${d.value}`)
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 1)
        tooltip.style('opacity', 0)
      })

    // Animate bars
    bars
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr('y', d => yScale(d.value))
      .attr('height', d => height - margin.bottom - yScale(d.value))

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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  )
}
