// Where each technology is actually used, derived from the data files so nothing is invented.
// Used by the Stack section's inspector.
import { projectsData } from "./projectData";
import { experience } from "./experience";
import { skillIconKey } from "./skills";

const shortTitle = (title) => title.split(":")[0];

// Domain label per work story (client work is described by domain only).
const workLabels = {
  "rag-chatbot": "Crypto education platform",
  "document-intelligence": "Medical billing system",
  "ocr-layer": "Medical billing system",
  "savings-assistant": "Youth savings platform",
  "content-suite": "SEO content platform",
};

// Experience stacks use a few names that differ from the skill names.
const aliases = {
  AWS: ["AWS", "AWS Textract", "AWS S3", "S3"],
};

// Concepts have no logo or stack entry, so their usage is stated explicitly (and honestly).
const conceptUsage = {
  RAG: {
    work: ["Crypto education platform"],
    projects: ["System Design Mentor"],
  },
  "Agentic Workflows": {
    work: ["Crypto education platform", "Medical billing system", "Youth savings platform", "SEO content platform"],
    projects: ["Email Agent with Human Approval"],
  },
  "LLM Evals": {
    work: [],
    projects: ["System Design Mentor"],
    note: "Personal project work, not part of my work at Folium.",
  },
};

export const getUsage = (name) => {
  if (conceptUsage[name]) return { note: "", ...conceptUsage[name] };

  const key = skillIconKey(name);
  const names = aliases[key] ?? [key];

  const work = [
    ...new Set(
      experience.stories
        .filter((story) => story.stack.some((item) => names.includes(item)))
        .map((story) => workLabels[story.id])
        .filter(Boolean)
    ),
  ];
  const projects = projectsData
    .filter((project) => project.techStack.some((item) => names.includes(item)))
    .map((project) => shortTitle(project.title));

  return { work, projects, note: "" };
};
