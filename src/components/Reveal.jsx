"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// One consistent scroll-in animation used across the whole page: a short fade and rise, once.
const Reveal = ({ children, delay = 0, y = 24, className = "", as = "div" }) => {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
