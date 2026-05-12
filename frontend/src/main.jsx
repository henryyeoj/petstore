import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

console.log('Main.jsx: Initializing React app...')

window.onerror = (msg, url, line, col, error) => {
  console.error('GLOBAL ERROR:', msg, 'at', url, ':', line, ':', col, error)
}

window.onunhandledrejection = (event) => {
  console.error('UNHANDLED REJECTION:', event.reason)
}

try {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    console.error('Root element not found!')
  } else {
    createRoot(rootElement).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    )
    console.log('Main.jsx: Render called.')
  }
} catch (err) {
  console.error('Main.jsx: Crash during render:', err)
}
