# Portfolio Animations Gallery

A Next.js application with D3.js featuring multiple interactive animations perfect for company portfolio websites. Includes a tabbed interface to showcase different visualization types.

## Features

### 8 Different Animation Types:

1. **Human Design Chart** - Interactive visualization of the 9 Human Design centers with gates
2. **Bar Chart** - Animated bar chart with hover interactions for data visualization
3. **Network Graph** - Interactive force-directed graph showing relationships (draggable nodes)
4. **Particle Animation** - Dynamic particle system with connecting lines
5. **Statistics Dashboard** - Animated progress bars with counter animations
6. **Timeline** - Interactive timeline visualization with animated event markers
7. **Pie Chart** - Animated pie chart with hover effects and legend
8. **Flow Chart** - Process flow diagram with animated connections

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/page.js` - Main page with tabbed interface
- `app/components/TabbedAnimations.js` - Tab navigation component
- `app/components/HumanDesignChart.js` - Human Design visualization
- `app/components/BarChart.js` - Animated bar chart
- `app/components/NetworkGraph.js` - Interactive network graph
- `app/components/ParticleAnimation.js` - Particle system animation
- `app/components/StatisticsDashboard.js` - Statistics dashboard
- `app/components/Timeline.js` - Timeline visualization
- `app/components/PieChart.js` - Pie chart visualization
- `app/components/FlowChart.js` - Process flow chart
- `app/globals.css` - Global styles

## Usage in Portfolio

All animations are designed to be:
- **Reusable** - Easy to customize with your own data
- **Interactive** - Hover effects, click interactions, and animations
- **Professional** - Modern design suitable for company websites
- **Responsive** - Works well on different screen sizes

Simply copy the component files you need and customize the data and styling to match your brand!
