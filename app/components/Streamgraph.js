'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function Streamgraph() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
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

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .text('Streamgraph - Flowing Data Visualization')

    const categories = ['Category A', 'Category B', 'Category C', 'Category D']
    const timePoints = Array.from({ length: 20 }, (_, i) => i)

    // Generate data
    const data = categories.map((category, i) => ({
      category,
      values: timePoints.map(t => ({
        time: t,
        value: 20 + Math.sin(t / 2 + i) * 15 + Math.random() * 10,
      })),
      color: d3.schemeCategory10[i],
    }))

    const xScale = d3
      .scaleLinear()
      .domain([0, 19])
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top])

    // Stack the data
    const stack = d3.stack().keys(categories).offset(d3.stackOffsetSilhouette)
    const stackedData = stack(
      timePoints.map(t => {
        const obj = { time: t }
        categories.forEach((cat, i) => {
          obj[cat] = data[i].values[t].value
        })
        return obj
      })
    )

    // Area generator
    const area = d3
      .area()
      .x(d => xScale(d.data.time))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))
      .curve(d3.curveBasis)

    // Draw areas
    const areas = svg
      .selectAll('.stream')
      .data(stackedData)
      .enter()
      .append('path')
      .attr('class', 'stream')
      .attr('fill', (d, i) => data[i].color)
      .attr('opacity', 0.7)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('d', area)
      .style('opacity', 0)

    // Animate
    areas
      .transition()
      .duration(2000)
      .delay((d, i) => i * 200)
      .style('opacity', 0.7)

    // Add axes
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .style('font-size', '12px')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(1500)
      .style('opacity', 1)

    // Legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 150}, ${margin.top})`)

    categories.forEach((cat, i) => {
      const legendItem = legend.append('g').attr('transform', `translate(0, ${i * 25})`)

      legendItem
        .append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', data[i].color)
        .attr('opacity', 0.7)
        .style('opacity', 0)

      legendItem
        .append('text')
        .attr('x', 20)
        .attr('y', 12)
        .style('font-size', '12px')
        .text(cat)
        .style('opacity', 0)

      legendItem
        .selectAll('*')
        .transition()
        .duration(400)
        .delay(2000 + i * 100)
        .style('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
