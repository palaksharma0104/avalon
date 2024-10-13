import { useState } from "react";
import { motion } from "framer-motion";

import SpaceCity from "../assets/SpaceCity.jpg";
import SpaceCity1 from "../assets/SpaceCity1.jpg";

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlipIn() {
    setIsFlipped(true);
  }

  function handleFlipOut() {
    setIsFlipped(false);
  }

  return (
    <div className="flex items-center justify-center  h-[800px] cursor-pointer">
      <div
        className="flip-card w-[300px] h-[600px] rounded-md"
        onPointerOver={handleFlipIn} onPointerOut={handleFlipOut}
      >
        <motion.div
          className="flip-card-inner w-[100%] h-[100%]"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
        >
          <div
            className="flip-card-front w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4"
            style={{ backgroundImage: `url(${SpaceCity})` }}
          >
            <h1 className="text-2xl font-bold/">Sky</h1>
            <p>Live on top of the world</p>
          </div>

          <div
            className="flip-card-back w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4"
            style={{ backgroundImage: `url(${SpaceCity1})` }}
          >
            <h1 className="text-2xl font-bold/">Earth</h1>
            <p>Or in the maze of the city</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CardFlip;