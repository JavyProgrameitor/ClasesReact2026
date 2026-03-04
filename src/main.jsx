import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { TooltipProvider } from '@/components/ui/tooltip'
import { TaskProvider } from './context/TaskContext'
import { Provider } from 'react-redux'
import store from './redux/store'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider>
        <TaskProvider>
          <Provider store={store}>
              <App />
          </Provider>       
        </TaskProvider>
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>,
)
