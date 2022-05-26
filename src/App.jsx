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
  const [availableSpots, setAvailableSpots] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await fetch("https://foofest2022.herokuapp.com/bands");
      const res2 = await fetch(
        "https://foofest2022.herokuapp.com/available-spots"
      );
      const data = await res.json();
      const data2 = await res2.json();
      setBands(data);
      setAvailableSpots(data2);
    }
    getData();
  }, []);

  const vipPrice = 1299;
  const regularPrice = 799;
  let [vipCount, setVipCount] = useState(0);
  let [regularCount, setRegularCount] = useState(0);
  const [twoPeopleTent, setTwoPeopleTent] = useState(0);
  const [threePeopleTent, setThreePeopleTent] = useState(0);

  function incrementCount(countType) {
    if (countType === "VIP") {
      setVipCount((old) => old + 1);
    } else if (countType === "REGULAR") {
      setRegularCount((old) => old + 1);
    } else if (countType === "TWOTENT") {
      setTwoPeopleTent((old) => old + 1);
    } else if (countType === "THREETENT") {
      setThreePeopleTent((old) => old + 1);
    }
  }
  function decrementCount(countType) {
    if (countType === "VIP") {
      setVipCount((old) => old - 1);
    } else if (countType === "REGULAR") {
      setRegularCount((old) => old - 1);
    } else if (countType === "TWOTENT") {
      setTwoPeopleTent((old) => old - 1);
    } else if (countType === "THREETENT") {
      setThreePeopleTent((old) => old - 1);
    }
  }

  function resetTents() {
    setTwoPeopleTent(0);
    setThreePeopleTent(0);
  }
  // function incrementRegularCount() {
  //   setRegularCount((old) => old + 1);
  // }

  // function decrementVipCount() {
  //   setVipCount((old) => old - 1);
  // }

  // function decrementRegularCount() {
  //   setRegularCount((old) => old - 1);
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home bands={bands} />} />
        <Route
          path="/tickets"
          element={
            <Tickets
              availableSpots={availableSpots}
              vipPrice={vipPrice}
              regularPrice={regularPrice}
              vipCount={vipCount}
              regularCount={regularCount}
              incrementCount={incrementCount}
              decrementCount={decrementCount}
            />
          }
        />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/info" element={<Info />} />
        <Route
          path="/basket"
          element={
            <Basket
              availableSpots={availableSpots}
              vipCount={vipCount}
              regularCount={regularCount}
              vipPrice={vipPrice}
              regularPrice={regularPrice}
              incrementCount={incrementCount}
              decrementCount={decrementCount}
              twoPeopleTent={twoPeopleTent}
              threePeopleTent={threePeopleTent}
              resetTents={resetTents}
              
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
