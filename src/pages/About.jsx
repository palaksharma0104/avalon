import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="bg-slate-950 pb-20">
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-20 bg-gradient-to-br from-slate-300 to-slate-500 py-10 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-6xl"
        >
          About <span className="text-rose-800">Avalon</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-5 bg-rose-800 bg-opacity-50 rounded-sm px-10 py-8 text-slate-300 mx-auto w-3/4"
        >
          <p className="text-lg leading-8">
            Welcome to{" "}
            <span className="text-rose-500 font-semibold">Avalon</span>—your
            cozy corner of the internet. Inspired by the legendary Isle of
            Avalon from Arthurian myths, our platform is a place of healing and
            expression. Whether you’re here to pen thought-provoking articles,
            use it as a digital journal, or share snippets of your life, Avalon
            is yours to shape.
          </p>
          <p className="mt-6">
            We believe in personalization and creativity. Choose your own
            username, experiment with vibrant text and font colors, and make
            your posts uniquely yours.
          </p>
          <p className="mt-6 text-rose-300 font-medium text-center">
            Avalon—because your stories deserve a place as magical as you.
          </p>
          <p className="mt-3 text-center text-amber-700 text-xs font-bold">
            (p.s. watch the halo light up once you've logged in)
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
