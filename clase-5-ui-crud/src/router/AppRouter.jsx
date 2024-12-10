import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Products from "../pages/Products"
import Resume from "../pages/Resume"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter