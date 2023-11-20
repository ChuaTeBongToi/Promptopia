import '@styles/globals.css'

export const metadata = {
  title: 'Promptopia',
  description: 'Create & Share AI Prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <div className='main'>
          <div className='gradient'/>
        </div>
        
        <main className='app'>
          {children}
        </main>

      </body>
    </html>
  )
}
