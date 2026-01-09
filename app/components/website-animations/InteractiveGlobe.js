'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export default function InteractiveGlobe() {
  const svgRef = useRef(null)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const filterRef = useRef('all')

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1000
    const height = 700
    const radius = Math.min(width, height) / 2 - 50

    d3.select(svgRef.current).selectAll('*').remove()
    filterRef.current = selectedFilter

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)')
      .style('border-radius', '10px')
      .style('box-shadow', '0 10px 40px rgba(0,0,0,0.3)')

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    // Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text('Interactive 3D Globe - Global Presence')

    // Sample data - locations with different types
    const locations = [
      // Offices
      { name: 'New York Office', type: 'office', lat: 40.7128, lon: -74.0060, color: '#667eea', icon: '🏢' },
      { name: 'London Office', type: 'office', lat: 51.5074, lon: -0.1278, color: '#667eea', icon: '🏢' },
      { name: 'Tokyo Office', type: 'office', lat: 35.6762, lon: 139.6503, color: '#667eea', icon: '🏢' },
      { name: 'Sydney Office', type: 'office', lat: -33.8688, lon: 151.2093, color: '#667eea', icon: '🏢' },
      
      // Clients
      { name: 'TechCorp Inc', type: 'client', lat: 37.7749, lon: -122.4194, color: '#4caf50', icon: '👥' },
      { name: 'Global Systems', type: 'client', lat: 52.5200, lon: 13.4050, color: '#4caf50', icon: '👥' },
      { name: 'Digital Solutions', type: 'client', lat: 22.3193, lon: 114.1694, color: '#4caf50', icon: '👥' },
      { name: 'Innovate Labs', type: 'client', lat: -22.9068, lon: -43.1729, color: '#4caf50', icon: '👥' },
      { name: 'Cloud Ventures', type: 'client', lat: 28.6139, lon: 77.2090, color: '#4caf50', icon: '👥' },
      
      // Projects - Development
      { name: 'E-commerce Platform', type: 'development', lat: 55.7558, lon: 37.6173, color: '#ff9800', icon: '🚧' },
      { name: 'Mobile App Suite', type: 'development', lat: 25.2048, lon: 55.2708, color: '#ff9800', icon: '🚧' },
      { name: 'AI Analytics Tool', type: 'development', lat: 31.2304, lon: 121.4737, color: '#ff9800', icon: '🚧' },
      
      // Projects - Shipped
      { name: 'Enterprise CRM', type: 'shipped', lat: 48.8566, lon: 2.3522, color: '#2196F3', icon: '✅' },
      { name: 'Cloud Infrastructure', type: 'shipped', lat: 19.4326, lon: -99.1332, color: '#2196F3', icon: '✅' },
      { name: 'Payment Gateway', type: 'shipped', lat: 1.3521, lon: 103.8198, color: '#2196F3', icon: '✅' },
      { name: 'Data Platform', type: 'shipped', lat: 59.9343, lon: 30.3351, color: '#2196F3', icon: '✅' },
    ]

    // Projection for 3D globe effect
    let rotation = [0, 0]
    const projection = d3.geoOrthographic()
      .scale(radius)
      .translate([0, 0])
      .clipAngle(90)
      .rotate(rotation)

    const path = d3.geoPath().projection(projection)

    // Draw graticules (latitude/longitude lines)
    const graticule = d3.geoGraticule()
    const graticulePath = g
      .append('path')
      .datum(graticule())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.2)')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0)

    graticulePath
      .transition()
      .duration(1000)
      .attr('opacity', 1)

    // Draw globe circle
    const globeCircle = g
      .append('circle')
      .attr('r', radius)
      .attr('fill', 'rgba(30, 60, 114, 0.3)')
      .attr('stroke', 'rgba(255,255,255,0.3)')
      .attr('stroke-width', 2)
      .attr('opacity', 0)

    globeCircle
      .transition()
      .duration(1000)
      .attr('opacity', 1)

    // Tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('padding', '10px 15px')
      .style('background', 'rgba(0,0,0,0.9)')
      .style('color', 'white')
      .style('border-radius', '8px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('font-size', '14px')
      .style('z-index', '1000')
      .style('box-shadow', '0 4px 12px rgba(0,0,0,0.3)')

    // Function to convert lat/lon to x/y
    function getCoordinates(lat, lon) {
      const coords = projection([lon, lat])
      return coords ? { x: coords[0], y: coords[1] } : null
    }

    // Function to check if point is visible on front hemisphere
    function isVisible(lat, lon) {
      const coords = getCoordinates(lat, lon)
      if (!coords) return false
      const distance = Math.sqrt(coords.x * coords.x + coords.y * coords.y)
      return distance < radius
    }

    // Create markers
    const markersGroup = g.append('g').attr('class', 'markers')

    function updateMarkers(filterType = 'all') {
      markersGroup.selectAll('.marker').remove()

      const filteredLocations = filterType === 'all' 
        ? locations 
        : locations.filter(loc => loc.type === filterType)

      filteredLocations.forEach((location, i) => {
        const coords = getCoordinates(location.lat, location.lon)
        if (!coords || !isVisible(location.lat, location.lon)) return

        const markerGroup = markersGroup
          .append('g')
          .attr('class', 'marker')
          .attr('transform', `translate(${coords.x}, ${coords.y})`)
          .style('cursor', 'pointer')
          .style('opacity', 0)

        // Pulse circle
        const pulse = markerGroup
          .append('circle')
          .attr('r', 0)
          .attr('fill', 'none')
          .attr('stroke', location.color)
          .attr('stroke-width', 2)
          .attr('opacity', 0.6)

        function animatePulse() {
          pulse
            .attr('r', 0)
            .attr('opacity', 0.6)
            .transition()
            .duration(2000)
            .attr('r', 20)
            .attr('opacity', 0)
            .on('end', animatePulse)
        }

        // Main marker circle
        const circle = markerGroup
          .append('circle')
          .attr('r', 0)
          .attr('fill', location.color)
          .attr('stroke', 'white')
          .attr('stroke-width', 3)

        // Icon
        const icon = markerGroup
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em')
          .style('font-size', '16px')
          .text(location.icon)

        // Animate entrance
        setTimeout(() => {
          markerGroup
            .transition()
            .duration(600)
            .style('opacity', 1)

          circle
            .transition()
            .duration(400)
            .delay(200)
            .attr('r', 8)

          animatePulse()
        }, i * 100)

        // Hover effects
        markerGroup.on('mouseenter', function(event) {
          d3.select(this).select('circle').attr('r', 12)
          
          tooltip
            .html(`
              <div style="font-weight: bold; margin-bottom: 5px;">${location.name}</div>
              <div style="font-size: 12px; opacity: 0.8;">Type: ${location.type}</div>
              <div style="font-size: 12px; opacity: 0.8;">Location: ${location.lat.toFixed(2)}°, ${location.lon.toFixed(2)}°</div>
            `)
            .style('opacity', 1)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
        })

        markerGroup.on('mouseleave', function() {
          d3.select(this).select('circle').attr('r', 8)
          tooltip.style('opacity', 0)
        })

        markerGroup.on('click', function() {
          // Center on location
          const targetRotation = [-location.lon, -location.lat]
          rotation = targetRotation
          projection.rotate(rotation)
          
          g.selectAll('path').attr('d', path)
          updateMarkers(filterType)
        })
      })
    }

    // Initial render
    updateMarkers(filterRef.current)

    // Rotation animation
    function animateRotation() {
      rotation[0] += 0.2
      projection.rotate(rotation)
      
      g.selectAll('path').attr('d', path)
      updateMarkers(filterRef.current)
      
      requestAnimationFrame(animateRotation)
    }

    // Start auto-rotation
    let animationId = requestAnimationFrame(animateRotation)

    // Drag to rotate
    const drag = d3.drag()
      .on('start', function() {
        cancelAnimationFrame(animationId)
      })
      .on('drag', function(event) {
        const sensitivity = 0.5
        rotation[0] += event.dx * sensitivity
        rotation[1] -= event.dy * sensitivity
        projection.rotate(rotation)
        
        g.selectAll('path').attr('d', path)
        updateMarkers(selectedFilter)
      })
      .on('end', function() {
        animationId = requestAnimationFrame(animateRotation)
      })

    globeCircle.call(drag)

    // Legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 200}, 60)`)
      .style('opacity', 0)

    const legendItems = [
      { label: 'Offices', color: '#667eea', icon: '🏢' },
      { label: 'Clients', color: '#4caf50', icon: '👥' },
      { label: 'In Development', color: '#ff9800', icon: '🚧' },
      { label: 'Shipped', color: '#2196F3', icon: '✅' },
    ]

    legendItems.forEach((item, i) => {
      const itemGroup = legend.append('g').attr('transform', `translate(0, ${i * 30})`)

      itemGroup
        .append('circle')
        .attr('r', 8)
        .attr('fill', item.color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('cx', 10)
        .attr('cy', 0)

      itemGroup
        .append('text')
        .attr('x', 25)
        .attr('y', 5)
        .style('fill', 'white')
        .style('font-size', '14px')
        .text(`${item.icon} ${item.label}`)
    })

    legend
      .transition()
      .duration(800)
      .delay(1200)
      .style('opacity', 1)

    // Filter buttons
    const filterContainer = svg
      .append('g')
      .attr('transform', `translate(20, ${height - 100})`)
      .style('opacity', 0)

    const filters = ['all', 'office', 'client', 'development', 'shipped']
    const filterLabels = {
      all: 'All',
      office: 'Offices',
      client: 'Clients',
      development: 'Development',
      shipped: 'Shipped'
    }

    filters.forEach((filter, i) => {
      const isActive = filterRef.current === filter
      const button = filterContainer
        .append('g')
        .attr('transform', `translate(${i * 120}, 0)`)
        .style('cursor', 'pointer')

      button
        .append('rect')
        .attr('x', 0)
        .attr('y', -15)
        .attr('width', 100)
        .attr('height', 30)
        .attr('rx', 15)
        .attr('fill', isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)

      button
        .append('text')
        .attr('x', 50)
        .attr('y', 5)
        .attr('text-anchor', 'middle')
        .style('fill', isActive ? '#333' : 'white')
        .style('font-size', '12px')
        .style('font-weight', isActive ? 'bold' : 'normal')
        .text(filterLabels[filter])

      button.on('click', function() {
        const newFilter = filter
        filterRef.current = newFilter
        setSelectedFilter(newFilter)
        updateMarkers(newFilter)
        
        // Update button styles
        filterContainer.selectAll('rect').each(function(d, idx) {
          d3.select(this).attr('fill', idx === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)')
        })
        filterContainer.selectAll('text').each(function(d, idx) {
          d3.select(this)
            .style('fill', idx === i ? '#333' : 'white')
            .style('font-weight', idx === i ? 'bold' : 'normal')
        })
      })
    })

    filterContainer
      .transition()
      .duration(800)
      .delay(1500)
      .style('opacity', 1)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      tooltip.remove()
    }
  }, [selectedFilter])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', maxWidth: '1000px' }}></svg>
    </div>
  )
}
