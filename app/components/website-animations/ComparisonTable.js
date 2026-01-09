'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function ComparisonTable() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = d3.select(containerRef.current)
    container.selectAll('*').remove()

    // Title
    container
      .append('div')
      .style('text-align', 'center')
      .style('font-size', '28px')
      .style('font-weight', 'bold')
      .style('color', '#333')
      .style('margin-bottom', '30px')
      .text('Feature Comparison Table')

    const features = [
      { feature: 'Feature A', basic: true, pro: true, enterprise: true },
      { feature: 'Feature B', basic: false, pro: true, enterprise: true },
      { feature: 'Feature C', basic: false, pro: false, enterprise: true },
      { feature: 'Feature D', basic: true, pro: true, enterprise: true },
      { feature: 'Feature E', basic: false, pro: true, enterprise: true },
    ]

    const plans = ['Basic', 'Pro', 'Enterprise']
    const colors = ['#667eea', '#764ba2', '#f093fb']

    const table = container
      .append('table')
      .style('width', '800px')
      .style('border-collapse', 'collapse')
      .style('background', 'white')
      .style('border-radius', '10px')
      .style('overflow', 'hidden')
      .style('box-shadow', '0 10px 30px rgba(0,0,0,0.1)')
      .style('opacity', 0)

    // Header
    const header = table.append('thead')
    const headerRow = header.append('tr')

    headerRow
      .append('th')
      .style('padding', '20px')
      .style('text-align', 'left')
      .style('font-weight', 'bold')
      .style('background', '#f5f5f5')
      .text('Features')
      .style('opacity', 0)

    plans.forEach((plan, i) => {
      headerRow
        .append('th')
        .style('padding', '20px')
        .style('text-align', 'center')
        .style('font-weight', 'bold')
        .style('background', colors[i])
        .style('color', 'white')
        .text(plan)
        .style('opacity', 0)
    })

    // Body
    const body = table.append('tbody')

    features.forEach((feature, rowIndex) => {
      const row = body.append('tr').style('opacity', 0)

      row
        .append('td')
        .style('padding', '15px 20px')
        .style('font-weight', '600')
        .text(feature.feature)

      plans.forEach((plan, colIndex) => {
        const cell = row.append('td').style('text-align', 'center').style('padding', '15px')

        const hasFeature = feature[plan.toLowerCase()]
        const checkmark = cell
          .append('div')
          .style('display', 'inline-block')
          .style('width', '30px')
          .style('height', '30px')
          .style('border-radius', '50%')
          .style('background', hasFeature ? colors[colIndex] : '#e0e0e0')
          .style('color', 'white')
          .style('line-height', '30px')
          .style('font-weight', 'bold')
          .text(hasFeature ? '✓' : '✗')
          .style('opacity', 0)
          .style('transform', 'scale(0)')

        checkmark
          .transition()
          .duration(400)
          .delay(300 + rowIndex * 100 + colIndex * 50)
          .style('opacity', 1)
          .style('transform', 'scale(1)')
      })

      // Animate row entrance
      setTimeout(() => {
        row
          .transition()
          .duration(600)
          .delay(rowIndex * 100)
          .style('opacity', 1)
      }, 100)
    })

    // Animate table entrance
    setTimeout(() => {
      table
        .transition()
        .duration(800)
        .style('opacity', 1)

      headerRow.selectAll('th').transition().duration(400).delay((d, i) => i * 100).style('opacity', 1)
    }, 100)
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <div ref={containerRef} style={{ position: 'relative' }}></div>
    </div>
  )
}
