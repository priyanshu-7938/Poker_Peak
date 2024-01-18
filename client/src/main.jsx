import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SocketContextProvier from './socketContext/index.jsx';
import ContextProvierAllOver from './context/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvierAllOver>
    <SocketContextProvier>
      <App />
    </SocketContextProvier>
  </ContextProvierAllOver>
)
