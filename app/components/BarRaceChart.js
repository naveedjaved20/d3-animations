'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function BarRaceChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 900
    const height = 600
    const margin = { top: 40, right: 100, bottom: 60, left: 150 }

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
      .text('Animated Bar Race Chart')

    const categories = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E']
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Generate time series data
    const timeSteps = 20
    const data = []
    for (let t = 0; t < timeSteps; t++) {
      const step = {}
      categories.forEach((cat, i) => {
        step[cat] = 30 + Math.sin(t / 2 + i) * 20 + Math.random() * 15
      })
      data.push(step)
    }

    const xScale = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right])
    const yScale = d3.scaleBand().domain(categories).range([margin.top, height - margin.bottom]).padding(0.2)

    let currentStep = 0

    function updateBars() {
      const currentData = data[currentStep]

      // Sort by value
      const sorted = categories
        .map(cat => ({ name: cat, value: currentData[cat] }))
        .sort((a, b) => b.value - a.value)

      yScale.domain(sorted.map(d => d.name))

      const bars = svg.selectAll('.bar').data(sorted, d => d.name)

      // Enter
      const barsEnter = bars.enter().append('g').attr('class', 'bar')

      barsEnter
        .append('rect')
        .attr('x', margin.left)
        .attr('y', d => yScale(d.name))
        .attr('width', 0)
        .attr('height', yScale.bandwidth())
        .attr('fill', d => color(d.name))
        .attr('rx', 5)

      barsEnter
        .append('text')
        .attr('x', margin.left - 10)
        .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2)
        .attr('text-anchor', 'end')
        .attr('dy', '.35em')
        .style('font-size', '14px')
        .style('font-weight', '600')
        .text(d => d.name)

      barsEnter
        .append('text')
        .attr('x', margin.left)
        .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2)
        .attr('dy', '.35em')
        .attr('dx', 10)
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', '#333')
        .text(d => Math.round(d.value))

      // Update
      bars
        .merge(barsEnter)
        .transition()
        .duration(500)
        .attr('transform', d => `translate(0, 0)`)

      bars
        .merge(barsEnter)
        .select('rect')
        .transition()
        .duration(500)
        .attr('y', d => yScale(d.name))
        .attr('width', d => xScale(d.value) - margin.left)

      bars
        .merge(barsEnter)
        .selectAll('text')
        .transition()
        .duration(500)
        .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2)

      bars
        .merge(barsEnter)
        .select('text:last-child')
        .transition()
        .duration(500)
        .attr('x', d => xScale(d.value) + 10)
        .text(d => Math.round(d.value))

      // Exit
      bars.exit().remove()

      // Update time label
      svg.selectAll('.time-label').remove()
      svg
        .append('text')
        .attr('class', 'time-label')
        .attr('x', width / 2)
        .attr('y', height - 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('font-weight', 'bold')
        .style('fill', '#667eea')
        .text(`Time Step: ${currentStep + 1}`)
    }

    // Initial render
    updateBars()

    // Animate through time steps
    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % timeSteps
      updateBars()
    }, 1000)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '900px' }}></svg>
    </div>
  )
}
