import './globals.css'

export const metadata = {
  title: 'Human Design Charts',
  description: 'Interactive Human Design Body Chart with Center Gates',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
