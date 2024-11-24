import React from "react";

export default function Footer({ classe }) {
  return (
    <>
      <footer className={"py-6 w-full " + classe}>
        <p className={"text-[#6d28d9] text-sm text-center"}>
          Made with 💜 by p & g | © 2024 Avalon
        </p>
      </footer>
    </>
  );
}
