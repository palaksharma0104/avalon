import Navbar from "./components/Navbar"
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

      { isMobile ? (
        <div>you are on ur phone</div>
      ) : (
        <>
          <body className="bg-white h-[200em]">
            <Navbar />
            <h1>you are on web</h1>
          </body>
        </>
      
      )}


    
    </>
  )
}

export default App
