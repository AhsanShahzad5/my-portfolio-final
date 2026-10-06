import Image from "next/image";
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJava, FaAws,
} from "react-icons/fa";
import {
  SiTypescript, SiRedux, SiTailwindcss, SiMongodb, SiPostgresql, SiNextdotjs, SiExpress, SiFramer,
  SiAndroidstudio, SiPython, SiCplusplus, SiRecoil, SiShadcnui, SiKeras, SiTensorflow, SiPytorch,
  SiPandas, SiNumpy, SiDvc, SiMlflow, SiFastapi, SiSqlite, SiHuggingface, SiPydantic, SiDjango,
  SiGooglegemini, SiGithubactions, SiJupyter, SiJira, SiSupabase, SiModelcontextprotocol, SiRuff,
  SiPytest, SiSocketdotio, SiUv,
} from "react-icons/si";

/**
 * Tech name -> icon element. Keys are the exact labels used in projectData.js and skills.js.
 * Every icon fills its parent (h-full w-full); TechIcon puts it on a light tile so dark and
 * light logos are both readable on the dark theme.
 *
 * Sources: react-icons (Simple Icons / Font Awesome) for most brands. Logos that react-icons
 * lacks are local files in public/icons/:
 *   OpenAI, Claude, Neo4j, LangChain  - Simple Icons (CC0), recoloured to the brand colour
 *   LangGraph, LangSmith              - LobeHub icon set
 *   Matplotlib, scikit-learn          - Devicon
 *   Pinecone                          - official pinecone.io logo, cropped to the logomark
 *   PyMuPDF                           - official PyMuPDF docs logo
 *   XGBoost                           - official DMLC logo
 *   imbalanced-learn                  - official project logo
 * A name with no entry has no authentic icon, so it is simply not shown as an icon.
 */
const glyph = "h-full w-full";
const file = (src) => (
  <Image src={src} alt="" width={40} height={40} unoptimized className="h-full w-full object-contain" />
);

export const techIcons = {
  // Languages
  Python: <SiPython color="#3776AB" className={glyph} />,
  TypeScript: <SiTypescript color="#3178C6" className={glyph} />,
  JavaScript: <FaJsSquare color="#F7DF1E" className={glyph} />,
  Java: <FaJava color="#007396" className={glyph} />,
  "C/C++": <SiCplusplus color="#00599C" className={glyph} />,
  HTML: <FaHtml5 color="#E34F26" className={glyph} />,
  CSS: <FaCss3Alt color="#1572B6" className={glyph} />,

  // AI, ML and data
  LangChain: file("/icons/langchain.svg"),
  LangGraph: file("/icons/langgraph.svg"),
  LangSmith: file("/icons/langsmith.svg"),
  MCP: <SiModelcontextprotocol color="#000000" className={glyph} />,
  OpenAI: file("/icons/openai.svg"),
  Claude: file("/icons/claude.svg"),
  Gemini: <SiGooglegemini color="#8E75B2" className={glyph} />,
  "Hugging Face": <SiHuggingface color="#FFB000" className={glyph} />,
  PyTorch: <SiPytorch color="#EE4C2C" className={glyph} />,
  TensorFlow: <SiTensorflow color="#FF6F00" className={glyph} />,
  Keras: <SiKeras color="#D00000" className={glyph} />,
  "scikit-learn": file("/icons/scikit-learn.svg"),
  XGBoost: file("/icons/xgboost.png"),
  "imbalanced-learn": file("/icons/imbalanced-learn.png"),
  pandas: <SiPandas color="#150458" className={glyph} />,
  NumPy: <SiNumpy color="#013243" className={glyph} />,
  Matplotlib: file("/icons/matplotlib.svg"),
  Pinecone: file("/icons/pinecone.svg"),
  PyMuPDF: file("/icons/pymupdf.svg"),

  // Frameworks and libraries
  FastAPI: <SiFastapi color="#009688" className={glyph} />,
  Django: <SiDjango color="#092E20" className={glyph} />,
  Pydantic: <SiPydantic color="#E92063" className={glyph} />,
  "React.js": <FaReact color="#00A8D0" className={glyph} />,
  "Next.js": <SiNextdotjs color="#000000" className={glyph} />,
  "Node.js": <FaNodeJs color="#339933" className={glyph} />,
  "Tailwind CSS": <SiTailwindcss color="#06B6D4" className={glyph} />,
  "Express.js": <SiExpress color="#000000" className={glyph} />,
  Redux: <SiRedux color="#764ABC" className={glyph} />,
  Recoil: <SiRecoil color="#3578E5" className={glyph} />,
  "Shadcn UI": <SiShadcnui color="#000000" className={glyph} />,
  "Framer Motion": <SiFramer color="#0055FF" className={glyph} />,
  "Socket.io": <SiSocketdotio color="#010101" className={glyph} />,
  "Android Studio": <SiAndroidstudio color="#3DDC84" className={glyph} />,

  // Databases
  PostgreSQL: <SiPostgresql color="#336791" className={glyph} />,
  MongoDB: <SiMongodb color="#47A248" className={glyph} />,
  SQLite: <SiSqlite color="#003B57" className={glyph} />,
  Supabase: <SiSupabase color="#3ECF8E" className={glyph} />,
  Neo4j: file("/icons/neo4j.svg"),

  // Developer and MLOps tools
  AWS: <FaAws color="#FF9900" className={glyph} />,
  Docker: <FaDocker color="#2496ED" className={glyph} />,
  Git: <FaGitAlt color="#F05032" className={glyph} />,
  "GitHub Actions": <SiGithubactions color="#2088FF" className={glyph} />,
  MLflow: <SiMlflow color="#0194E2" className={glyph} />,
  DVC: <SiDvc color="#13ADC7" className={glyph} />,
  Jupyter: <SiJupyter color="#F37626" className={glyph} />,
  Jira: <SiJira color="#0052CC" className={glyph} />,
  Pytest: <SiPytest color="#0A9EDC" className={glyph} />,
  ruff: <SiRuff color="#261230" className={glyph} />,
  uv: <SiUv color="#DE5FE9" className={glyph} />,
};

export const getTechIcon = (name) => techIcons[name] ?? null;
