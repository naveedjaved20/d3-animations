'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export default function StatisticsDashboard() {
  const svgRef = useRef(null)
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    revenue: 0,
    satisfaction: 0,
  })

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 500

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(255, 255, 255, 0.95)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.2)')

    const data = [
      { label: 'Projects', value: 150, color: '#667eea', max: 200 },
      { label: 'Clients', value: 85, color: '#764ba2', max: 100 },
      { label: 'Revenue (K)', value: 1200, color: '#f093fb', max: 1500 },
      { label: 'Satisfaction %', value: 98, color: '#4facfe', max: 100 },
    ]

    // Animate counters
    data.forEach((item, index) => {
      const duration = 2000
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const currentValue = Math.floor(startValue + (item.value - startValue) * progress)

        if (item.label === 'Projects') setStats(prev => ({ ...prev, projects: currentValue }))
        if (item.label === 'Clients') setStats(prev => ({ ...prev, clients: currentValue }))
        if (item.label === 'Revenue (K)') setStats(prev => ({ ...prev, revenue: currentValue }))
        if (item.label === 'Satisfaction %') setStats(prev => ({ ...prev, satisfaction: currentValue }))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      setTimeout(() => animate(), index * 200)
    })

    // Create progress bars
    const barHeight = 60
    const barSpacing = 80
    const startY = 100

    data.forEach((item, i) => {
      const y = startY + i * barSpacing
      const barWidth = (item.value / item.max) * (width - 200)

      // Background bar
      svg
        .append('rect')
        .attr('x', 100)
        .attr('y', y)
        .attr('width', width - 200)
        .attr('height', barHeight)
        .attr('fill', '#e0e0e0')
        .attr('rx', 5)

      // Animated progress bar
      const progressBar = svg
        .append('rect')
        .attr('x', 100)
        .attr('y', y)
        .attr('width', 0)
        .attr('height', barHeight)
        .attr('fill', item.color)
        .attr('rx', 5)

      progressBar
        .transition()
        .duration(2000)
        .delay(i * 200)
        .attr('width', barWidth)

      // Label
      svg
        .append('text')
        .attr('x', 90)
        .attr('y', y + barHeight / 2)
        .attr('text-anchor', 'end')
        .attr('alignment-baseline', 'middle')
        .style('font-size', '14px')
        .style('font-weight', '500')
        .text(item.label)

      // Value text
      const valueText = svg
        .append('text')
        .attr('x', 100 + barWidth + 10)
        .attr('y', y + barHeight / 2)
        .attr('alignment-baseline', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .style('fill', item.color)
        .text(0)

      valueText
        .transition()
        .duration(2000)
        .delay(i * 200)
        .tween('text', function() {
          const interpolate = d3.interpolateNumber(0, item.value)
          return function(t) {
            const value = item.label.includes('%') || item.label.includes('Revenue')
              ? Math.round(interpolate(t))
              : Math.round(interpolate(t))
            this.textContent = item.label.includes('Revenue') 
              ? `$${value}K` 
              : item.label.includes('%')
              ? `${value}%`
              : value
          }
        })
    })

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text('Company Statistics Dashboard')
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  )
}
