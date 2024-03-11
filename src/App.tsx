import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Test from './pages/Test'
import HotelList from './pages/HotelList'
import HotelPage from './pages/Hotel'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/test" element={<Test />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
