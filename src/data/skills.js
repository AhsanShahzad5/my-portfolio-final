// Copy comes from content.md §8. Current focus first; earlier web/mobile skills stay in the last group.
// Item names must match keys in icons.jsx to get an icon; others render as a text pill.

export const skillGroups = [
  {
    group: "AI & ML",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Agentic Workflows",
      "LLM Evals",
      "MCP",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Hugging Face",
    ],
  },
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "C/C++", "Java"] },
  {
    group: "Frameworks & Libraries",
    items: ["FastAPI", "Django", "Pydantic", "React.js", "Next.js", "Node.js", "Tailwind CSS"],
  },
  { group: "Databases", items: ["PostgreSQL", "MongoDB", "Pinecone", "Chroma", "Supabase", "Neo4j"] },
  {
    group: "Developer & MLOps Tools",
    items: [
      "AWS (EC2, S3, IAM, Textract)",
      "Docker",
      "Git",
      "GitHub Actions",
      "MLflow",
      "DVC",
      "LangSmith",
      "Jupyter",
      "Jira",
    ],
  },
  {
    group: "Core",
    items: ["REST APIs", "Asynchronous Programming", "OOP", "DSA", "Agile"],
  },
  {
    group: "Web & Mobile (earlier work)",
    items: [
      "HTML",
      "CSS",
      "Express.js",
      "Redux",
      "Recoil",
      "Shadcn UI",
      "Framer Motion",
      "Android Studio",
    ],
  },
];

// "AWS (EC2, S3, IAM, Textract)" should use the AWS icon.
export const skillIconKey = (name) => (name.startsWith("AWS") ? "AWS" : name);
