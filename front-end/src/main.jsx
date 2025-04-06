import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from "firebase/app";

import App from './App.jsx'
import './index.css'

const firebaseConfig = {
  apiKey: "AIzaSyDjP3ulSOsVBd3zl1ouSZc4sE35qWFtjhM",
  authDomain: "full-stack-react-1c177.firebaseapp.com",
  projectId: "full-stack-react-1c177",
  storageBucket: "full-stack-react-1c177.firebasestorage.app",
  messagingSenderId: "140280139151",
  appId: "1:140280139151:web:ea74618684aa1cae440ffa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
