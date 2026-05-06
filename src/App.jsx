import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import GamePage from './pages/GamePage/GamePage'
import EduPage from './pages/EduPage/EduPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/edu/:type" element={<EduPage />} />
    </Routes>
  )
}

export default App
