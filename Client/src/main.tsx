import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import QueryProvider from './lib/tanstack/config.tsx';
import './../app/globals.css'
import { MonthProvider } from './context/context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <QueryProvider>  
    <MonthProvider>
        <App />
    </MonthProvider>
   </QueryProvider>
  </React.StrictMode>,
)
