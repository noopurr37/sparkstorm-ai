
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { forceHttps } from './utils/httpsRedirect'

// Force HTTPS in production environments
forceHttps();

createRoot(document.getElementById("root")!).render(<App />);
