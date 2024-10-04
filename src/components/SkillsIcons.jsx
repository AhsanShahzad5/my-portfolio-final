// SkillsIcons.jsx

import React from 'react';

import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJava } from 'react-icons/fa';
import {
    SiTypescript, SiRedux, SiTailwindcss, SiMongodb, SiPostgresql, SiNextdotjs, SiExpress, SiFramer, SiAndroidstudio,  SiShadcnui,
    SiPython, SiCplusplus, SiFirebase, SiReact, SiChakraui , SiRecoil
} from 'react-icons/si';

const skillsData2 = [
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" size={40} /> },
    { name: "JavaScript", icon: <FaJsSquare color="#F7DF1E" size={40} /> },
    { name: "HTML", icon: <FaHtml5 color="#E34F26" size={40} /> },
    { name: "CSS", icon: <FaCss3Alt color="#1572B6" size={40} /> },
    { name: "React.js", icon: <FaReact color="#61DAFB" size={40} /> },
    { name: "Node.js", icon: <FaNodeJs color="#339933" size={40} /> },
    { name: "Express", icon: <SiExpress color="#ffffff" size={40} className="bg-black p-1 rounded" /> },
    { name: "MongoDB", icon: <SiMongodb color="#47A248" size={40} /> },
    { name: "Next.js", icon: <SiNextdotjs color="#ffffff" size={40} className="bg-black p-1 rounded" /> },
    { name: "Git", icon: <FaGitAlt color="#F05032" size={40} /> },
    { name: "Redux", icon: <SiRedux color="#764ABC" size={40} /> },
    { name: "Recoil", icon: <SiRecoil color="#ffffff" size={40} className="bg-black p-1 rounded" /> },
    { name: "Tailwind", icon: <SiTailwindcss color="#38B2AC" size={40} /> },
    { name: "ShadCn", icon: <SiShadcnui color="#8B5CF6" size={40} /> },
    { name: "PostgreSQL", icon: <SiPostgresql color="#336791" size={40} /> },
    { name: "Docker", icon: <FaDocker color="#2496ED" size={40} /> },
    { name: "Java", icon: <FaJava color="#007396" size={40} /> },
    { name: "Android Studio", icon: <SiAndroidstudio color="#3DDC84" size={40} /> },

    //will add later
    //{ name: "Framer Motion", icon: <SiFramer color="#0055FF" size={40} /> },
    // { name: "React Native", icon: <SiReact color="#61DAFB" size={40} /> }, 
    // { name: "Chakra UI", icon: <SiChakraui color="#319795" size={40} /> }, 
    // { name: "Python", icon: <SiPython color="#3776AB" size={40} /> },
    // { name: "C/C++", icon: <SiCplusplus color="#00599C" size={40} /> },
    // { name: "Firebase", icon: <SiFirebase color="#FFCA28" size={40} /> }, 
];

const skillsData = [
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "JavaScript", icon: <FaJsSquare color="#F7DF1E" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "HTML", icon: <FaHtml5 color="#E34F26" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "CSS", icon: <FaCss3Alt color="#1572B6" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "React.js", icon: <FaReact color="#61DAFB" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "Node.js", icon: <FaNodeJs color="#339933" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "Express", icon: <SiExpress color="#ffffff" className="bg-black p-1 rounded w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "MongoDB", icon: <SiMongodb color="#47A248" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "Next.js", icon: <SiNextdotjs color="#ffffff" className="bg-black p-1 rounded w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "Git", icon: <FaGitAlt color="#F05032" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "Redux", icon: <SiRedux color="#764ABC" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "Recoil", icon: <SiRecoil color="#ffffff" className="bg-black p-1 rounded w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "Tailwind", icon: <SiTailwindcss color="#38B2AC" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "ShadCn", icon: <SiShadcnui color="#8B5CF6" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "PostgreSQL", icon: <SiPostgresql color="#336791" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "Docker", icon: <FaDocker color="#2496ED" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "Java", icon: <FaJava color="#007396" className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: "Android Studio", icon: <SiAndroidstudio color="#3DDC84" className="w-8 h-8 sm:w-10 sm:h-10" /> },
];




const SkillsIcons = () => {
    return (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 align-middle justify-center">
            {skillsData.map((skill, index) => (
                <div key={index}
                    className="flex flex-col items-center p-2 transition duration-300 hover:border-2 hover:border-primary-500 hover:rounded-lg text-center" >
                    {skill.icon}
                    <p className="text-white mt-2 text-[12px] md:text-[16px] lg:text-[16px]">{skill.name}</p>
                </div>
            ))}
        </div>
    );
};

export default SkillsIcons;
