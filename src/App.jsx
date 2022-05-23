import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./sass/App.scss";
// import NavContainer from "./pages/NavContainer";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import Schedule from "./pages/Schedule";
import Info from "./pages/Info";
import Basket from "./pages/Basket";

function App() {
  const [bands, setBands] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await fetch("https://foofest2022.herokuapp.com/bands");
      const data = await res.json();
      setBands(data);
    }
    getData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home bands={bands} />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/info" element={<Info />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
