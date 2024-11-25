import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import CardFlip from "./components/CardFlip";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import BlogsPage from "./pages/BlogSpace";
import CreateBlogPage from "./pages/Create";
import BlogDetailPage from "./pages/BlogDetailPage";
import Footer from "./components/Footer";
import About from "./pages/About";

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
      <BrowserRouter>
        {loggedIn && <Navbar />}
        <Routes>
          {!loggedIn ? (
            <Route path="/" element={<Homepage />}></Route>
          ) : (
            <>
              <Route path="/" element={<BlogsPage />}></Route>
              <Route path="/create" element={<CreateBlogPage />}></Route>
              <Route path="/blog/:id" element={<BlogDetailPage />}></Route>
            </>
          )}
          <Route path="/about" element={<About />} />
          <Route path="/flipper" element={<CardFlip />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
