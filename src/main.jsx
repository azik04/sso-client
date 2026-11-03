import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import { NotificationService } from './services/notification';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NotificationService>
            <UserProvider>
                <App />
            </UserProvider>
        </NotificationService>
    </StrictMode>,
)