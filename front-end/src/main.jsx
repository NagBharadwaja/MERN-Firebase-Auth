import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from "firebase/app";

import App from './App.jsx'
import './index.css'
import { firebaseConfig } from '../credentials.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
