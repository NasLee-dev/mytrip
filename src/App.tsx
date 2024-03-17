import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Test from './pages/Test'
import HotelList from './pages/HotelList'
import HotelPage from './pages/Hotel'
import useLoadKakao from './hooks/useLoadKakao'
import MyPage from './pages/My'
import SigninPage from './pages/Signin'
function App() {
  useLoadKakao()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/test" element={<Test />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
