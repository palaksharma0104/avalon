import { useState } from "react";
import React from "react";
import Footer from "../components/Footer";
import Signup from "../components/Signup";

function Homepage() {
  const [showSignup, setShowSignup] = useState(false);
  const handleCloseSignup = () => {
    setShowSignup(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3e8ff] to-[#ffe6f7] flex flex-col items-center mt-20">
      {/* Hero Section */}
      <header className="flex flex-col-reverse md:flex-row items-center mt-10 px-8 md:px-20 text-center md:text-left">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-[#6d28d9] leading-tight">
            Welcome to <span className="text-[#9b59b6]">Avalon</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#8b5cf6]">
            A cozy corner of the internet where stories meet creativity. Share
            your blogs, connect with like-minded people, and create your own
            unique journey.
          </p>
          <p className="mt-2 text-[#6d28d9]">
            Avalon is not just a platform. It's a vibe.
          </p>
          <button
            className="mt-6 bg-[#6d28d9] hover:bg-[#8b5cf6] text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg"
            onClick={() => {
              setShowSignup(true);
            }}
          >
            Get Started
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="3.png"
            alt="Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="mt-16 px-8 md:px-20 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6d28d9] text-center">
          Why Choose Avalon?
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#ffffffcc] p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#9b59b6]">
              Creative Space
            </h3>
            <p className="mt-2 text-[#6d28d9]">
              Express your ideas and stories in a welcoming community.
            </p>
          </div>
          <div className="bg-[#ffffffcc] p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#9b59b6]">
              Personalized Feed
            </h3>
            <p className="mt-2 text-[#6d28d9]">
              Discover blogs tailored to your interests.
            </p>
          </div>
          <div className="bg-[#ffffffcc] p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#9b59b6]">
              Connect & Collaborate
            </h3>
            <p className="mt-2 text-[#6d28d9]">
              Meet people who share your passion for storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="mt-16 px-8 md:px-20 w-full bg-[#ffe6f7] py-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#6d28d9] text-center">
          What Our Users Say
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-[#6d28d9]">
              "Avalon is the perfect place for me to share my thoughts and
              discover amazing stories. Love it!"
            </p>
            <p className="mt-4 text-sm text-[#9b59b6]">- Emma</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-[#6d28d9]">
              "The community is so supportive, and the design is so cute. It’s
              my go-to blog platform!"
            </p>
            <p className="mt-4 text-sm text-[#9b59b6]">- Mia</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-[#6d28d9]">
              "I love how easy it is to post and explore blogs. Avalon is truly
              unique."
            </p>
            <p className="mt-4 text-sm text-[#9b59b6]">- Liam</p>
          </div>
        </div>
      </section>
      <Footer />
      <div>{showSignup && <Signup closeSignup={handleCloseSignup} />}</div>
    </div>
  );
}

export default Homepage;
