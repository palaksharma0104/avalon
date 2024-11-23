import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import MobileHome from "./pages/MobileHome";
import CardFlip from "./components/CardFlip";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LoggedInPage from "./pages/Lhome";
import BlogsPage from "./pages/BlogSpace";
import CreateBlogPage from "./pages/Create";
import { Hm } from "./components/Hm";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileHome />
      ) : (
        <>
          <BrowserRouter>
            <Navbar />
            <Routes>
              {!loggedIn ? (
                <Route path="/" element={<Hm />}></Route>
              ) : (
                <>
                  <Route path="/" element={<BlogsPage />}></Route>
                  <Route path="/create" element={<CreateBlogPage />}></Route>
                </>
              )}

              <Route path="/l" element={<LoggedInPage />}></Route>

              <Route path="/flipper" element={<CardFlip />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
