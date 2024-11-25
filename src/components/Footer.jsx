import React from "react";

export default function Footer({ classe }) {
  return (
    <>
      <footer className={"py-6 w-full " + classe}>
        <p className={"text-[#6d28d9] text-sm text-center"}>
          Made with 💜 by p & g <br /> © 2024 Avalon
          <br />
          <a
            href="/about"
            className="text-xs underline hover:text-slate-600 transition"
          >
            About
          </a>
        </p>
      </footer>
    </>
  );
}
