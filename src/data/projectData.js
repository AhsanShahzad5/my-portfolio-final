import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJava , FaOauth} from 'react-icons/fa';
import {
    SiTypescript, SiRedux, SiTailwindcss, SiMongodb, SiPostgresql, SiNextdotjs, SiExpress, SiFramer, SiAndroidstudio,
    SiPython, SiCplusplus, SiFirebase, SiReact, SiChakraui , SiAuth0 , SiRecoil , SiShadcnui
} from 'react-icons/si';
import { TbFileTypeXml } from "react-icons/tb";

const react = (<FaReact color="#61DAFB" className="w-8 h-8 sm:w-10 sm:h-10" />);
const node = (<FaNodeJs color="#339933" className="w-8 h-8 sm:w-10 sm:h-10" />);
const express = (<SiExpress color="#ffffff" className="bg-black p-1 rounded w-8 h-8 sm:w-10 sm:h-10" />);
const mongo = <SiMongodb color="#47A248" className="w-8 h-8 sm:w-10 sm:h-10" />;
const typescript = <SiTypescript color="#3178C6" className="w-8 h-8 sm:w-10 sm:h-10" />;
const auth0 = (<SiAuth0 color="#EB5424" className="w-8 h-8 sm:w-10 sm:h-10" />);
const shadcn = <SiShadcnui color="#8B5CF6" className="w-8 h-8 sm:w-10 sm:h-10" />;
const javaScript = <FaJsSquare color="#F7DF1E" className="w-8 h-8 sm:w-10 sm:h-10" />;
const recoil = <SiRecoil color="#ffffff" className="bg-black p-1 rounded w-8 h-8 sm:w-10 sm:h-10" />;
const nextjs = <SiNextdotjs color="#ffffff" className="bg-black p-1 rounded w-8 h-8 sm:w-10 sm:h-10" />;
const tailwind = <SiTailwindcss color="#38B2AC" className="w-8 h-8 sm:w-10 sm:h-10" />;
const framer = <SiFramer color="red" className="w-8 h-8 sm:w-10 sm:h-10" />;
const css = <FaCss3Alt color="#1572B6" className="w-8 h-8 sm:w-10 sm:h-10" />;
const java = <FaJava color="#007396" className="w-8 h-8 sm:w-10 sm:h-10" />;
const androidStudio = <SiAndroidstudio color="#3DDC84" className="w-8 h-8 sm:w-10 sm:h-10" />;
const html = <FaHtml5 color="#E34F26" className="w-8 h-8 sm:w-10 sm:h-10" />;
const xml = <TbFileTypeXml color="#3DDC84" className="w-8 h-8 sm:w-10 sm:h-10" />;

export const projectsData = [
    {
      id: 1,
      title: "Quick Bites",
      description: "A full stack Food ordering platform , with proper authentication , restaurant page module for restaurant owners , and food ordering module for customers",
      image: "/images/projects/quickbites.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/AhsanShahzad5/Quick-Bites-Frontend",
      previewUrl: "https://quick-bites-frontend-za1k.onrender.com/",
      techStack:[typescript,react,shadcn,express,mongo,node]
    },
    {
      id: 2,
      title: "Social Link",
      description: "A full stack social media website , having proper authetnication , posts and profiles features , with real time messaging features included",
      image: "/images/projects/socialLink3.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/AhsanShahzad5/Social-Link",
      previewUrl: "https://social-link-iz2i.onrender.com/",
     techStack:[javaScript,react,recoil,express,mongo,node]
    
    },
    {
      id: 3,
      title: "Next-Js Developer Protfolio",
      description: "My developer portfolio showing my projects , and expertise in various technologies",
      image: "/images/projects/portfolio2.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/AhsanShahzad5/my-portfolio-final",
      previewUrl: "https://my-portfolio-final.vercel.app/",
      techStack:[typescript,nextjs, tailwind , framer]
    },
    {
      id: 4,
      title: "Newzy",
      description: "A News fetching website built using news API featuring news for tech , politics etc ",
      image: "/images/projects/newzy.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/AhsanShahzad5/Newzy",
      previewUrl: "",
      techStack:[html,javaScript,react,tailwind]
    },
    {
      id: 5,
      title: "NextJs Admin Dashboard + Blog",
      description: "A full stack web app having combined power of Admin dashboard and Blogging websites",
      image: "/images/projects/dashboard.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/AhsanShahzad5/nextjs-simple-dashboard",
      previewUrl: "/",
      techStack:[javaScript,nextjs,tailwind,css]
    },
    {
      id: 6,
      title: "Android Fitness App",
      description: "A basic fitness App built for android , having wokrout , diet and tracking modules",
      image: "/images/projects/gym2.jpg",
      tag: ["All", "Mobile"],
      gitUrl: "https://github.com/AhsanShahzad5/MyFitness",
      previewUrl: "/",
      techStack:[java , androidStudio , css , xml]
    },
  ];