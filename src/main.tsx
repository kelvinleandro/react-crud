import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { UsersContextProvider } from './context/UsersContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <UsersContextProvider>
        <App />
      </UsersContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
