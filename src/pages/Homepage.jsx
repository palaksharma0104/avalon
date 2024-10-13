import { React, useState } from "react";
import { motion } from "framer-motion";

import SpaceCity1 from "../assets/SpaceCity1.jpg";

function Homepage() {
  // Create an array of states for each card
  const [flippedCards, setFlippedCards] = useState([false, false, false]);

  // Function to flip in a specific card
  function handleFlipIn(index) {
    setFlippedCards((prev) =>
      prev.map((flipped, i) => (i === index ? true : flipped))
    );
  }

  // Function to flip out a specific card
  function handleFlipOut(index) {
    setFlippedCards((prev) =>
      prev.map((flipped, i) => (i === index ? false : flipped))
    );
  }

  return (
    <div className="grid grid-cols-3 gap-8 mx-auto w-full px-10 md:px-20 lg:px-36 mt-40">
      {[1, 2, 3].map((card, index) => (
        <div
          key={index}
          className="flip-card grid-item rounded-md"
          onPointerOver={() => handleFlipIn(index)}
          onPointerOut={() => handleFlipOut(index)}
        >
          <motion.div
            className="flip-card-inner w-[100%] h-[100%]"
            initial={false}
            animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
            transition={{ duration: 0.6, animationDirection: "normal" }}
          >
            <div className="flip-card-front rounded-lg bg-[#e4ccff] p-5 lg:p-10">
              <img src={`./${card}.png`} alt={`Card ${card}`} />
            </div>

            <div
              className="flip-card-back w-[100%] h-[100%] bg-cover text-white rounded-lg p-4"
              style={{ backgroundImage: `url(${SpaceCity1})` }}
            >
              <h1 className="text-2xl font-bold/">Earth</h1>
              <p>Or in the maze of the city</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default Homepage;
