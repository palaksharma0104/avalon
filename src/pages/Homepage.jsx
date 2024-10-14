import { React, useState } from "react";
import { motion } from "framer-motion";

import SpaceCity1 from "../assets/SpaceCity1.jpg";

function Homepage() {
  // Array-based state for all cards
  const [flippedCards, setFlippedCards] = useState([false, false, false]);

  // Handler functions that take the index of the card to flip
  function handleFlipIn(index) {
    setFlippedCards((prev) =>
      prev.map((flipped, i) => (i === index ? true : flipped))
    );
  }

  function handleFlipOut(index) {
    setFlippedCards((prev) =>
      prev.map((flipped, i) => (i === index ? false : flipped))
    );
  }

  return (
    <div className="grid grid-cols-3 gap-8 mx-auto w-full px-10 md:px-20 lg:px-48 mt-32">
      {/* Card 1 */}
      <div
        className="flip-card grid-item rounded-md cursor-pointer"
        onPointerOver={() => handleFlipIn(0)}
        onPointerOut={() => handleFlipOut(0)}
      >
        <motion.div
          className="flip-card-inner w-[100%] h-[100%]"
          initial={false}
          animate={{ rotateY: flippedCards[0] ? 180 : 0 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
        >
          <div className="flip-card-front rounded-lg bg-[#e4ccff] p-5 lg:p-7">
            <img src="./1.png" alt="Card 1" />
          </div>

          <div className="flip-card-back rounded-lg bg-[#e4ccff] p-5 lg:p-10">
            <p>Behind</p>
            <img src="./1.png" alt="Card 1" />
          </div>
        </motion.div>
      </div>

      {/* Card 2 */}
      <div
        className="flip-card grid-item rounded-md cursor-pointer"
        onPointerOver={() => handleFlipIn(1)}
        onPointerOut={() => handleFlipOut(1)}
      >
        <motion.div
          className="flip-card-inner w-[100%] h-[100%]"
          initial={false}
          animate={{ rotateY: flippedCards[1] ? 180 : 0 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
        >
          <div className="flip-card-front rounded-lg bg-[#e4ccff] p-5 lg:p-7">
            <img src="./2.png" alt="Card 2" />
          </div>

          <div className="flip-card-back rounded-lg bg-[#e4ccff] p-5 lg:p-10">
            <p>behind</p>
            <img src="./2.png" alt="Card 2" />
          </div>
        </motion.div>
      </div>

      {/* Card 3 */}
      <div
        className="flip-card grid-item rounded-md cursor-pointer"
        onPointerOver={() => handleFlipIn(2)}
        onPointerOut={() => handleFlipOut(2)}
      >
        <motion.div
          className="flip-card-inner w-[100%] h-[100%]"
          initial={false}
          animate={{ rotateY: flippedCards[2] ? 180 : 0 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
        >
          <div className="flip-card-front rounded-lg bg-[#e4ccff] p-5 lg:p-7">
            <img src="./3.png" alt="Card 3" />
          </div>

          <div className="flip-card-back rounded-lg bg-[#e4ccff] p-5 lg:p-10">
            <p>behind</p>
            <img src="./3.png" alt="Card 2" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Homepage;
