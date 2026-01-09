import TabbedAnimations from './components/TabbedAnimations'

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <TabbedAnimations />
    </main>
  )
}
