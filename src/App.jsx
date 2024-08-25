import Navbar from "./components/Navbar"
import { useEffect, useState } from "react";

function App() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if screen is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming mobile width is <= 768px
    };

    // Initial check
    checkMobile();

    // Add event listener to detect window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  return (
    <>

      { isMobile ? (
        <div>you are on ur phone</div>
      ) : (
        <>
          <Navbar />
          <h1>you are on web</h1>
        </>
      
      )}


    
    </>
  )
}

export default App
