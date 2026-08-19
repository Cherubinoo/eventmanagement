import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import useTheme from './useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-[#05060a]">
        <Routes>
          <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/login" element={<Login theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/signup" element={<Signup theme={theme} toggleTheme={toggleTheme} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
