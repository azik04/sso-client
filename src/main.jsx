import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import { NotificationService } from './services/notification';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NotificationService>
            <App />
        </NotificationService>
    </StrictMode>,
)