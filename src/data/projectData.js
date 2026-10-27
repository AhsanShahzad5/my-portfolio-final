// Copy comes from content.md §7. Order = display order (AI work first, earlier web work after).
// Tech names must match keys in icons.jsx; names without an icon render as a text pill.
//
// Schema:
//   id, title, summary, details?, tags: ["AI" | "Web"], tier: "featured" | "standard", (featured: type, role),
//   status?: "wip", links: [{ label, url }], techStack: [name], image?

const gh = (repo) => `https://github.com/AhsanShahzad5/${repo}`;

export const projectTags = ["All", "AI", "Web"];

export const projectsData = [
  // ---------- AI: featured ----------
  {
    id: 1,
    title: "System Design Mentor: Hybrid RAG with an Evaluation Suite",
    summary:
      "A RAG mentor over five system design and AI engineering books, wrapped in an evaluation suite that decides whether a change is allowed to ship.",
    details:
      "I wanted a RAG system I could measure, not just demo. It answers questions from five books: System Design Interview, ML System Design Interview, Designing Data-Intensive Applications, Designing Machine Learning Systems and AI Engineering. Two pipelines keep the slow part separate. One turns the PDFs into layout-aware markdown with chapter and section metadata and saves it as a checkpoint; the other chunks, embeds and indexes it in Pinecone with dense vectors and BM25 side by side. At query time a LangGraph flow decides whether the question is about the books' structure or their content, rewrites follow-ups only when the history is needed, runs dense and keyword search in parallel, fuses them with Reciprocal Rank Fusion and reranks to the top five. The other half of the project, and the part I learned most from, is the evaluation suite around it. The eval structure follows a CampusX course; the implementation is my own.",
    highlights: [
      "Evaluated at every level: the retriever on its own (contextual recall and precision), the generator on its own with golden context (faithfulness and answer relevancy), the full pipeline with the RAG triad, and the application as a user sees it, with G-Eval rubrics for correctness, completeness and a mentor-like style, plus scope, prompt and book-content leakage, PII and toxicity checks. DeepEval runs it with a judge model from a different family than the one generating answers.",
      "Golden datasets written from the books' real pages. Each answer points to its evidence by book, chapter, section and pages rather than chunk IDs, so the labels survive re-chunking, and a script rebuilds the golden passages from those pointers so no verbatim book text goes into the public repo.",
      "Regression testing that works as a CI gate: one command runs the whole suite and writes a snapshot stamped with the git commit, a prompt hash, golden-set hashes and every setting. A registry gives each metric a direction and a role (safety gates block a release, quality and latency guardrails ask for a review), and tolerances come from repeated baseline runs, twice the standard deviation, so judge noise isn't mistaken for a regression.",
      "Guardrails driven by the evals: I wrote the safety policy first and ran the suite before touching the prompt. It caught the assistant writing a full cover letter and continuing a copyrighted paragraph word for word. Only then did I add the rules, and the same suite confirmed the fix without the assistant starting to refuse real questions.",
      "Operational evals that measure what a user feels: time to first token and the latency of each stage (query analysis, retrieval, generation) from a streaming run, and cost per query built from token usage, embeddings and reranking. That's how I found the reranker, not the LLM, is most of what a query costs.",
      "Cleaning the data as a measured change: the evals showed book indexes tagged as the last chapter, bibliographies and PDF markup polluting keyword search, and page breaks leaving tiny fragments. Chapter ranges now come from the table of contents, back matter and references are dropped, sections are merged across pages and every chunk carries a book › chapter › section header. The result is indexed into a separate namespace so it can be compared against the baseline before it replaces it.",
      "Known gaps: images and diagrams aren't indexed, and scoring live LangSmith traces (online evals) is the next step.",
    ],
    tags: ["AI"],
    tier: "featured",
    type: "RAG assistant + evaluation suite",
    role: "Personal project, built solo",
    status: "wip",
    links: [{ label: "GitHub", url: gh("System-Design-Mentor-Hybrid-RAG-with-an-Evals") }],
    techStack: ["Python", "LangGraph", "LangChain", "Pinecone", "OpenAI", "LangSmith", "DeepEval", "PyMuPDF"],
  },
  {
    id: 2,
    title: "Chest Cancer Classification: End-to-End MLOps",
    summary:
      "A CT-scan classifier taken from a config-driven training pipeline all the way to a tested, containerised API that deploys itself to AWS.",
    details:
      "I built this to learn what happens after the notebook. The VGG16 transfer-learning classifier is the smallest part; the interesting work is the system around it. The training side is a configuration-driven pipeline (YAML configs, typed entities, a configuration manager) run as four DVC stages, so when I change a parameter only the stages it affects re-run. Every run is logged to MLflow on DagsHub and registered as a new model version, and the API serves whichever version carries the champion alias, so promoting or rolling back a model is a label change, not a redeploy. It reaches about 88% accuracy on its small test set, which I treat as proof the pipeline works rather than clinical performance. It's a learning project, not a medical tool.",
    highlights: [
      "Reproducible by design: DVC tracks parameters, data and outputs, the evaluation metrics live in Git, and a DVC remote on DagsHub lets any machine restore the exact data and model for a commit.",
      "Serving from the registry: the FastAPI app downloads the champion model from MLflow once at startup and keeps it in memory. If the model can't load, the server refuses to start, so a broken deploy fails loudly instead of looking healthy, and separate liveness and readiness endpoints tell the two situations apart.",
      "Built to be used by strangers: uploads are validated by content (a real JPEG or PNG, with size and pixel limits), a rate limit stops one client from starving the rest, responses carry a confidence score and the model version, and every request gets an ID and a structured JSON log line.",
      "Tested and automated: a pytest suite runs against a stand-in model, so CI needs no model file, and ruff with pre-commit hooks keeps the code clean. On every push, GitHub Actions tests the code, builds the Docker image, pushes it to Amazon ECR and deploys it to an EC2 instance through a self-hosted runner, and the deploy only passes once the model has loaded.",
      "Choosing the champion taught me a lesson: earlier runs had been scored on different test sets, so their numbers couldn't be compared. I re-scored every registered version on one fixed test set before promoting one.",
    ],
    tags: ["AI"],
    tier: "featured",
    type: "Deep learning + MLOps system",
    role: "Personal project, built solo",
    links: [
      { label: "GitHub", url: gh("Chest-Cancer-Classification-Deep-Learning-Project") },
      { label: "Pipeline runs", url: `${gh("Chest-Cancer-Classification-Deep-Learning-Project")}/actions` },
    ],
    techStack: ["Python", "TensorFlow", "Keras", "DVC", "MLflow", "FastAPI", "Docker", "GitHub Actions", "AWS", "Pytest"],
  },

  {
    id: 14,
    title: "PsyLink: A Mental Wellness Platform with an AI Companion",
    summary:
      "My final-year project: a mental health web platform with anonymous therapy sessions, an AI-powered Vent Buddy and a community, built with anonymity and data security in mind.",
    details:
      'PsyLink lets people get mental health support without exposing who they are. Users can join anonymous therapy sessions, talk to an AI "Vent Buddy" powered by Gemini 2.0, and share experiences in a community, while patients and professionals get the tools they need on the same platform.',
    highlights: [
      "Anonymous therapy sessions, an AI-powered Vent Buddy and a community for sharing experiences, with anonymity and data security built in.",
      "Appointment scheduling and calendar management, secure payments, and video, voice and chat sessions between patients and mental health professionals.",
      "Tools for users: mood tracking, therapeutic exercise monitoring, journaling and prescription management, to track progress over time.",
      "Role-based access for patients, doctors and admins, plus real-time notifications and data analytics.",
    ],
    tags: ["AI", "Web"],
    tier: "featured",
    badges: ["FYP"],
    type: "Full-stack web platform with AI features",
    role: "Final-year project",
    links: [
      { label: "Frontend", url: gh("PsyLink-Frontend") },
      { label: "Backend", url: gh("PsyLink-Backend") },
    ],
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Gemini", "Tailwind CSS", "TypeScript", "Shadcn UI"],
  },

  // ---------- AI: agents and LLM tooling ----------
  {
    id: 5,
    title: "Fine-tuned BERT Sentiment App",
    summary: "A FastAPI service and web page that classify movie reviews as positive or negative with a fine-tuned BERT.",
    details:
      "I fine-tuned BERT on IMDb reviews (the model is hosted on Hugging Face), then wrapped it in a FastAPI app with a simple browser UI, a prediction endpoint that returns sentiment and a confidence score, a health check, Pytest tests and Docker Compose.",
    tags: ["AI"],
    tier: "standard",
    links: [{ label: "GitHub", url: gh("Finetuned-BERT-sentiment-analysis") }],
    techStack: ["PyTorch", "Hugging Face", "FastAPI", "Docker", "Pytest"],
  },

  // ---------- AI: machine learning and deep learning ----------
  {
    id: 6,
    title: "House Price Prediction",
    summary: "My most complete classical-ML project: a full regression workflow on California housing data.",
    details:
      "EDA and visualization, preprocessing and scaling, then a comparison of Linear Regression, Random Forest and a histogram-based gradient boosting model, with cross-validation and hyperparameter search, evaluated on proper regression metrics. I wrote it to be reusable, so the same flow can be pointed at other tabular problems.",
    tags: ["AI"],
    tier: "standard",
    links: [{ label: "GitHub", url: gh("House-Price-prediction") }],
    techStack: ["scikit-learn", "pandas", "NumPy", "Matplotlib"],
  },
  {
    id: 7,
    title: "SMS Spam Detection API",
    summary: "A spam classifier taken from a notebook all the way to a tested API.",
    details:
      "A TF-IDF and Multinomial Naive Bayes model served through FastAPI with Pydantic request and response schemas, artifacts loaded once at startup through the lifespan handler, generated OpenAPI docs, API tests and locked dependencies with uv. A simpler notebook-only version is in a separate repo.",
    tags: ["AI"],
    tier: "standard",
    links: [
      { label: "GitHub", url: gh("Spam-Email-Classification-End-to-End") },
      { label: "Notebook version", url: gh("Spam-Email-Classification-Simple") },
    ],
    techStack: ["scikit-learn", "FastAPI", "Pydantic", "uv"],
  },
  {
    id: 8,
    title: "Credit Card Fraud Detection",
    summary: "Fraud detection on a dataset where only 0.17% of transactions are fraud.",
    details:
      "Of 284,807 transactions only 492 are fraudulent, so accuracy alone would be misleading. I balanced a sample, trained Logistic Regression and XGBoost, and compared them on precision, recall, F1 and cross-validation instead.",
    tags: ["AI"],
    tier: "standard",
    links: [{ label: "GitHub", url: gh("Credit-Card-Fraud-Detection") }],
    techStack: ["scikit-learn", "XGBoost", "pandas"],
  },
  {
    id: 9,
    title: "Customer Churn Prediction",
    summary: "Predicts which telecom customers are likely to leave.",
    details:
      "Exploratory analysis, categorical encoding, SMOTE to handle class imbalance, then Decision Tree, Random Forest and XGBoost compared. The Random Forest is evaluated and saved with its encoders for example predictions.",
    tags: ["AI"],
    tier: "standard",
    links: [{ label: "GitHub", url: gh("Customer-Churn-Prediction") }],
    techStack: ["scikit-learn", "imbalanced-learn", "XGBoost"],
  },
  {
    id: 10,
    title: "Recommender Systems",
    summary: "Two recommenders built to compare approaches.",
    details:
      "A content-based movie recommender that turns metadata (genres, keywords, cast, director, overview) into tags and returns the five most similar titles by cosine similarity, and a book recommender with a popularity-based ranking plus item-based collaborative filtering over reader ratings.",
    tags: ["AI"],
    tier: "standard",
    links: [
      { label: "Movies", url: gh("Movie-Recommendation-System") },
      { label: "Books", url: gh("Book-Recommendation-System") },
    ],
    techStack: ["scikit-learn", "pandas"],
  },
  {
    id: 11,
    title: "Fashion-MNIST Classifier in PyTorch",
    summary: "A controlled comparison of activations and optimizers on a small neural network.",
    details:
      "I trained feed-forward networks on Fashion-MNIST, compared ReLU against sigmoid and Adam against SGD, and kept the best model, which reached 87.11% test accuracy.",
    tags: ["AI"],
    tier: "standard",
    links: [{ label: "GitHub", url: gh("Fashion-mnist-pytorch-classifier") }],
    techStack: ["PyTorch"],
  },
  {
    id: 12,
    title: "Deep Learning Practice Projects",
    summary: "Three Keras notebooks that cover the fundamentals.",
    details:
      "Customer churn classification, MNIST digit recognition and graduate-admission regression, built to practice preprocessing, scaling, network design, training and evaluation.",
    tags: ["AI"],
    tier: "standard",
    links: [{ label: "GitHub", url: gh("Practice-Deep-Learning-Projects") }],
    techStack: ["TensorFlow", "Keras", "scikit-learn"],
  },
  {
    id: 3,
    title: "Email Agent with Human Approval",
    summary: "A LangGraph agent that drafts an email, then waits for a human before sending anything.",
    details:
      "Given a recipient, subject and tone, the agent drafts an email and decides for itself whether it needs a web search to get the facts right. When the draft is ready, the graph pauses with an interrupt and saves its state to a SQLite checkpoint. Approving or editing the draft over the API resumes the same conversation thread and only then sends it. Nothing is sent during generation. It's a small project, but it shows human-in-the-loop done properly.",
    tags: ["AI"],
    tier: "standard",
    links: [{ label: "GitHub", url: gh("Langgraph-Email-Sending-Agent") }],
    techStack: ["LangGraph", "FastAPI", "SQLite", "Python"],
  },
  {
    id: 4,
    title: "MCP Servers Project",
    summary: "The same expense-tracking MCP server built two ways, local and remote, plus a custom client.",
    details:
      "A learning project for the Model Context Protocol. The expense server exposes tools to add, list and summarize expenses, once as a local server over stdio and once as a remote HTTP service. A custom FastAPI client connects an LLM to a weather MCP server over stdio and to the remote expense server over HTTP.",
    tags: ["AI"],
    tier: "standard",
    links: [
      { label: "GitHub", url: gh("MCP-Servers-Project") },
      { label: "Remote server practice", url: gh("remote-mcp-server-practice") },
    ],
    techStack: ["MCP", "FastAPI", "Python", "OpenAI"],
  },
  {
    id: 13,
    title: "MLflow Remote Tracking Demo",
    summary: "Experiment tracking three ways: locally, on DagsHub and on my own remote server.",
    details:
      "I connected training code to an MLflow server I ran on an EC2 instance, with an S3 bucket for artifacts, alongside the local and DagsHub setups, to understand how experiment tracking works beyond a laptop.",
    tags: ["AI"],
    tier: "standard",
    links: [{ label: "GitHub", url: gh("mlflow-basics-demo") }],
    techStack: ["MLflow", "AWS", "Python"],
  },

  // ---------- Web and full-stack (earlier work, kept) ----------
  {
    id: 15,
    title: "SocialLink",
    summary: "A full-stack social platform with real-time chat.",
    details: "REST APIs, authentication, profiles, follows, likes and comments, and Socket.io chat on the MERN stack.",
    tags: ["Web"],
    tier: "standard",
    image: "/images/projects/socialLink3.png",
    links: [
      { label: "GitHub", url: gh("Social-Link") },
      { label: "Live", url: "https://social-link-iz2i.onrender.com/" },
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io"],
  },
  {
    id: 16,
    title: "Quick Bites",
    summary: "A full-stack food ordering platform for restaurants and customers.",
    details:
      "Authentication, a restaurant module where owners manage their page and menu, and an ordering module for customers.",
    tags: ["Web"],
    tier: "standard",
    image: "/images/projects/quickbites.png",
    links: [
      { label: "GitHub", url: gh("Quick-Bites-Frontend") },
      { label: "Live", url: "https://quick-bites-frontend-za1k.onrender.com/" },
    ],
    techStack: ["TypeScript", "React.js", "Shadcn UI", "Express.js", "MongoDB", "Node.js"],
  },
  {
    id: 17,
    title: "NextJS Admin Dashboard + Blog",
    summary: "A full-stack web app that combines an admin dashboard with a blog.",
    tags: ["Web"],
    tier: "standard",
    image: "/images/projects/dashboard.png",
    links: [{ label: "GitHub", url: gh("nextjs-simple-dashboard") }],
    techStack: ["JavaScript", "Next.js", "Tailwind CSS", "CSS"],
  },
  {
    id: 18,
    title: "Newzy",
    summary: "A news site built on a news API, with categories like tech and politics.",
    tags: ["Web"],
    tier: "standard",
    image: "/images/projects/newzy.png",
    links: [{ label: "GitHub", url: gh("Newzy") }],
    techStack: ["HTML", "JavaScript", "React.js", "Tailwind CSS"],
  },
];
