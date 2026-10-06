// Non-project copy, from content.md §1-§5, §9-§11. Edit text here, not in the components.

export const siteLinks = {
  github: "https://github.com/AhsanShahzad5",
  linkedin: "https://www.linkedin.com/in/ahsan-shahzad-4ab053283/",
  resume: "/Ahsan-Shahzad-Resume.pdf",
  email: "ahsanshahzad331188@gmail.com",
};

export const navLinks = [
  { title: "About", path: "#about" },
  { title: "Technologies", path: "#stack" },
  { title: "Experience", path: "#experience" },
  { title: "Projects", path: "#projects" },
  { title: "Contact", path: "#contact" },
];

export const hero = {
  greeting: "Hi, I'm",
  name: "Ahsan Shahzad",
  // The middle part is rendered with the gradient.
  headline: ["AI/ML engineer building", "GenAI systems", "that hold up in production."],
  subtitle:
    "I build GenAI systems that hold up in production, RAG pipelines and multi-agent workflows with LangChain and LangGraph, and I know the ML, deep learning and MLOps underneath them.",
  buttons: { contact: "Hire Me", work: "View My Work", resume: "Download Resume" },
};

// Section numbering, titles and short notes (SectionHeader). Experience and projects notes live with their data.
export const sections = {
  about: { index: "01", label: "About", title: "A GenAI engineer who cares what happens after the demo." },
  stack: {
    index: "02",
    label: "Technologies",
    title: "The technologies, drawn as the system they run on.",
    note: "Not a skills list. Hover or tap any technology to see where I've actually used it.",
  },
  experience: { index: "03", label: "Experience", title: "Shipping GenAI systems for real products." },
  projects: { index: "04", label: "Projects", title: "Built just to see how it all works." },
  contact: { index: "05", label: "Contact", title: "Let's talk." },
};

export const about = {
  heading: "About Me",
  paragraphs: [
    "I'm Ahsan, an AI/ML engineer from Lahore. I studied software engineering, and since June 2025 I've been at Folium AI building GenAI systems for real products: retrieval-augmented chatbots, multi-agent document pipelines and tool-calling assistants, mostly in Python with FastAPI, Django, LangChain and LangGraph.",
    "What I enjoy most is the part between a working demo and something you can trust: structured outputs, fallbacks, tracing, tests, and knowing what a pipeline costs per request.",
    "Outside work I've been going deep on the rest of the field: classical ML and deep learning, evaluating LLM applications properly, MCP, and MLOps with DVC and MLflow.",
  ],
};

export const education = {
  heading: "Education",
  items: [
    {
      degree: "B.S. in Software Engineering",
      school: "Comsats University Islamabad, Lahore Campus",
      dates: "Sep 2021 to June 2025",
    },
    {
      degree: "FSc Pre-Engineering",
      school: "Government College University, Lahore",
      dates: "Sep 2019 to June 2021",
    },
  ],
  certifications: [
    {
      name: "LangSmith Essentials",
      issuer: "LangChain Academy",
      url: "https://academy.langchain.com/certificates/eddgusuv4k",
    },
    {
      name: "React Basics",
      issuer: "HackerRank",
      url: "https://res.cloudinary.com/ahsancloudinary/image/upload/v1746439543/react_basic_czwi0j.png",
    },
    {
      name: "NodeJS Intermediate",
      issuer: "HackerRank",
      url: "https://res.cloudinary.com/ahsancloudinary/image/upload/v1746439541/nodejs_intermediate_qgpeg3.png",
    },
  ],
};

export const contact = {
  heading: "Let's Connect",
  body: "I'm open to AI/ML engineering roles. If you're hiring, working on something interesting, or just want to talk shop, my inbox is open and I'll get back to you.",
};

export const footer = {
  name: "Ahsan Shahzad",
  role: "AI/ML Engineer",
  rights: "All rights reserved.",
};
