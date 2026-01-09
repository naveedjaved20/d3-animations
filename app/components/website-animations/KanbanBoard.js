'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function KanbanBoard() {
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
      .text('Kanban Board Workflow')

    const columns = [
      { name: 'To Do', color: '#667eea', tasks: ['Task 1', 'Task 2', 'Task 3'] },
      { name: 'In Progress', color: '#764ba2', tasks: ['Task 4', 'Task 5'] },
      { name: 'Review', color: '#f093fb', tasks: ['Task 6'] },
      { name: 'Done', color: '#4facfe', tasks: ['Task 7', 'Task 8'] },
    ]

    const board = container
      .append('div')
      .style('display', 'flex')
      .style('gap', '20px')
      .style('justify-content', 'center')
      .style('width', '1200px')

    columns.forEach((column, colIndex) => {
      const columnDiv = board
        .append('div')
        .style('width', '250px')
        .style('background', 'white')
        .style('border-radius', '10px')
        .style('padding', '20px')
        .style('box-shadow', '0 5px 15px rgba(0,0,0,0.1)')
        .style('opacity', 0)
        .style('transform', 'translateY(30px)')

      // Column header
      const header = columnDiv
        .append('div')
        .style('padding-bottom', '15px')
        .style('border-bottom', `3px solid ${column.color}`)
        .style('margin-bottom', '15px')

      header
        .append('div')
        .style('font-size', '20px')
        .style('font-weight', 'bold')
        .style('color', '#333')
        .text(column.name)

      header
        .append('div')
        .style('font-size', '14px')
        .style('color', '#666')
        .style('margin-top', '5px')
        .text(`${column.tasks.length} tasks`)

      // Tasks
      column.tasks.forEach((task, taskIndex) => {
        const taskCard = columnDiv
          .append('div')
          .style('background', '#f5f5f5')
          .style('padding', '15px')
          .style('border-radius', '8px')
          .style('margin-bottom', '10px')
          .style('border-left', `4px solid ${column.color}`)
          .style('cursor', 'pointer')
          .style('opacity', 0)
          .style('transform', 'translateX(-20px)')
          .text(task)
          .on('mouseenter', function() {
            d3.select(this)
              .style('background', '#e8e8e8')
              .style('transform', 'translateX(5px)')
          })
          .on('mouseleave', function() {
            d3.select(this)
              .style('background', '#f5f5f5')
              .style('transform', 'translateX(0px)')
          })

        taskCard
          .transition()
          .duration(400)
          .delay(300 + colIndex * 200 + taskIndex * 100)
          .style('opacity', 1)
          .style('transform', 'translateX(0px)')
      })

      // Animate column entrance
      setTimeout(() => {
        columnDiv
          .transition()
          .duration(600)
          .delay(colIndex * 150)
          .style('opacity', 1)
          .style('transform', 'translateY(0px)')
      }, 100)
    })
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
