import './globals.css'
import { ReduxProvider } from '../lib/redux/Provider'

export const metadata = {
  title: 'Weather App',
  description: 'Search for weather information',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}