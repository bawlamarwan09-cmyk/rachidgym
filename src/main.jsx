import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

import {
  startWebVitals,
  enableTelemetry
} from '@workspace/boosthis-runtime-web'

// Local performance measurement
startWebVitals({ bubble: true })

// Telemetry disabled until we explicitly allow it
enableTelemetry({
  installId: '6bbda6c1-812a-4cc2-ae4f-7a0f75c33f52',
  appName: 'RachidGym Test',
  endUserConsent:
  import.meta.env.VITE_VERCEL_ENV === 'preview'
    ? 'granted'
    : 'withheld',
  sendPageMap: false,
  traceSameOrigin: false,
  inviteKey: import.meta.env.VITE_BOOSTHIS_INVITE_KEY,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)