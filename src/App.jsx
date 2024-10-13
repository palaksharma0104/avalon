import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import MobileHome from "./pages/MobileHome";
import CardFlip from "./components/CardFlip";
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
        <body className="bg-white h-[200em]">
        <Navbar />
        {/* <div className="flex items-center mt-24"> */}
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Homepage />}>
              </Route>

              <Route path='/flipper' element={<CardFlip />}/>
            </Routes>
          </BrowserRouter>
          {/* </div> */}
          </body>
        </>
      
      )}
    </>
  )
}

export default App
