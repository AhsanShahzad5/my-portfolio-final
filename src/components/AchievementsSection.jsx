"use client";
import React from "react";
import dynamic from "next/dynamic";
import { achievements } from "@/data/site";

const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false }
);

const AchievementsSection = () => {
  return (
    <section id="achievements" className="pt-4">
      <div className="grid grid-cols-1 gap-8 rounded-md py-8 px-6 sm:grid-cols-3 sm:border sm:border-[#33353F]">
        {achievements.map((achievement) => {
          return (
            <div
              key={achievement.metric}
              className="flex flex-col items-center justify-center text-center"
            >
              <h2 className="text-white text-4xl font-bold flex flex-row">
                {achievement.prefix}
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="en-US"
                  className="text-white text-4xl font-bold"
                  configs={(_, index) => {
                    return {
                      mass: 1,
                      friction: 100,
                      tensions: 140 * (index + 1),
                    };
                  }}
                />
                {achievement.postfix}
              </h2>
              <p className="text-[#ADB7BE] text-base text-center">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AchievementsSection;
