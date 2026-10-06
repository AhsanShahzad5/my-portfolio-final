// Non-project copy, from content.md §1-§5, §9-§11. Edit text here, not in the components.

export const siteLinks = {
  github: "https://github.com/AhsanShahzad5",
  linkedin: "https://www.linkedin.com/in/ahsan-shahzad-4ab053283/",
  resume: "/Ahsan-Shahzad-Resume.pdf",
  email: "ahsanshahzad331188@gmail.com",
};

export const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "#about" },
  { title: "Experience", path: "#experience" },
  { title: "Projects", path: "#projects" },
  { title: "Skills", path: "#skills" },
  { title: "Contact", path: "#contact" },
];

export const hero = {
  greeting: "Hi, I'm",
  // TypeAnimation sequence entries (text, pause in ms)
  roles: ["Ahsan Shahzad", "an AI/ML Engineer", "a GenAI & RAG builder", "an Agent Workflow Developer"],
  subtitle:
    "I build GenAI systems that hold up in production, RAG pipelines and multi-agent workflows with LangChain and LangGraph, and I back that up with ML, deep learning and MLOps projects of my own.",
  buttons: { contact: "Hire Me", work: "View My Work", resume: "Download Resume" },
};

export const achievements = [
  { metric: "Years building production GenAI", value: "1", postfix: "+" },
  { metric: "GenAI systems built at Folium AI", value: "4" },
  { metric: "ML / DL / GenAI projects on GitHub", value: "10", postfix: "+" },
];

export const about = {
  heading: "About Me",
  paragraphs: [
    "I'm Ahsan, an AI/ML engineer from Lahore. I studied software engineering, and since June 2025 I've been at Folium AI building GenAI systems for real products: retrieval-augmented chatbots, multi-agent document pipelines and tool-calling assistants, mostly in Python with FastAPI, Django, LangChain and LangGraph.",
    "What I enjoy most is the part between a working demo and something you can trust: structured outputs, fallbacks, tracing, tests, and knowing what a pipeline costs per request.",
    "Outside work I've been going deep on the rest of the field: classical ML and deep learning, evaluating LLM applications properly, MCP, and MLOps with DVC and MLflow. I'll be upfront about where my experience is: my production work is in GenAI. The classical ML and deep learning side lives in the projects below, built end to end on my own, and that's the side I'm actively growing into.",
  ],
};

export const projectsIntro = {
  heading: "My Projects",
  subheading:
    "The GenAI work above is client work, so it isn't public. These are the projects I built on my own, to learn the rest of the field properly.",
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
  ],
};

export const contact = {
  heading: "Let's Connect",
  body: "I'm open to AI/ML engineering roles, especially GenAI, RAG and agent systems. If you're hiring, working on something interesting, or just want to talk shop, my inbox is open and I'll get back to you.",
};

export const footer = {
  name: "Ahsan Shahzad",
  role: "AI/ML Engineer",
  rights: "All rights reserved.",
};
