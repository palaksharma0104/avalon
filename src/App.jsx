import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import MobileHome from "./pages/MobileHome";
import CardFlip from "./components/CardFlip";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LoggedInPage from "./pages/Lhome";

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
          <body>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/l" element={<LoggedInPage />}></Route>

                <Route path="/flipper" element={<CardFlip />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </BrowserRouter>
          </body>
        </>
      )}
    </>
  );
}

export default App;
