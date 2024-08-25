import Navbar from "./components/Navbar"
import MobileHome from "./pages/MobileHome";
import { useEffect, useState } from "react";

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
          </body>
        </>
      
      )}
    </>
  )
}

export default App
