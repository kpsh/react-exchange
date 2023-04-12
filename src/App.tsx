import { BrowserRouter as Router, Route, Routes, RouteProps } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Convert } from "./pages/Convert"
import { Latest } from "./pages/Latest";
import { Chart } from "./pages/Chart";

export const App = () => {
  return (
    <Router basename="/react-exchange/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Convert />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}
