"use client";
import { useEffect, useState } from "react";

const Typewriter = ({ text, speed = 30 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed(""); // reset when text changes
    if (!text) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval); // cleanup
  }, [text, speed]);

  return <span>{displayed}</span>;
};

export default Typewriter;
