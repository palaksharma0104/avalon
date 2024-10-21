import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import MobileHome from "./pages/MobileHome";
import CardFlip from "./components/CardFlip";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileHome />
      ) : (
        <>
          <body className="h-[200em]">
            <Navbar />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />}></Route>

                <Route path="/flipper" element={<CardFlip />} />
              </Routes>
            </BrowserRouter>
          </body>
        </>
      )}
    </>
  );
}

export default App;
