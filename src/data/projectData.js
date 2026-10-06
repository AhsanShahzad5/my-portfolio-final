// Copy comes from content.md §7. Order = display order (AI work first, earlier web work after).
// Tech names must match keys in icons.jsx; names without an icon render as a text pill.
//
// Schema:
//   id, title, summary, details?, tags: ["AI" | "Web"], tier: "featured" | "standard",
//   status?: "wip", links: [{ label, url }], techStack: [name], image?

const gh = (repo) => `https://github.com/AhsanShahzad5/${repo}`;

export const projectTags = ["All", "AI", "Web"];

export const projectsData = [
  // ---------- AI: featured ----------
  {
    id: 1,
    title: "System Design Mentor: Hybrid RAG with an Evaluation Suite",
    summary:
      "A RAG assistant over five system design and ML books, built with hybrid search and tested with its own evaluation suite.",
    details:
      "I wanted a RAG system I could actually measure, so I built one over five books (system design, ML systems and data-intensive applications). Two decoupled pipelines do the work: one turns the PDFs into layout-aware markdown with chapter and section metadata, the other chunks, embeds and indexes them in Pinecone with both dense vectors and BM25 keyword search. At query time dense and keyword results are fused with Reciprocal Rank Fusion, reranked, and the top five go to a LangGraph flow that rewrites follow-up questions only when history is needed and routes between book lookups and RAG answers. I also built an evaluation suite around it: golden datasets covering retrieval, answer quality, safety, latency and cost, regression checks that compare every change against a baseline and return a pass/review/fail for CI, and online scoring of live LangSmith traces. The eval structure follows a CampusX course; the implementation, registry and tolerance tuning are my own. Known gap: it doesn't index images or diagrams.",
    tags: ["AI"],
    tier: "featured",
    status: "wip",
    links: [{ label: "GitHub", url: gh("System-Design-Mentor-Hybrid-RAG-with-an-Evals") }],
    techStack: ["LangGraph", "Pinecone", "OpenAI", "LangSmith", "PyMuPDF"],
  },
  {
    id: 2,
    title: "Chest Cancer Classification: End-to-End ML Pipeline",
    summary:
      "A CT-scan classifier built the way a production ML project should be structured: config-driven, versioned and reproducible.",
    details:
      "The model is a VGG16 transfer-learning classifier with data augmentation, early stopping and learning-rate scheduling. The part I care about is the structure around it: a configuration-driven design (YAML configs, typed entities, a configuration manager) feeding a four-stage DVC pipeline for ingestion, base-model preparation, training and evaluation. DVC tracks parameters, so when I change one only the stages it affects re-run. Runs are logged to MLflow with their parameters, metrics and models. Serving and deployment are the next steps and not part of what's published here yet.",
    tags: ["AI"],
    tier: "featured",
    status: "wip",
    links: [{ label: "GitHub", url: gh("Chest-Cancer-Classification-Deep-Learning-Project") }],
    techStack: ["TensorFlow", "Keras", "DVC", "MLflow", "Python"],
  },

  // ---------- AI: agents and LLM tooling ----------
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
    id: 14,
    title: "PsyLink",
    summary: "My final-year project: a mental wellness platform with an AI companion.",
    details:
      'Anonymous therapy sessions, an AI "Vent Buddy" powered by Gemini, community, appointments, mood tracking and journaling, with role-based access for patients, doctors and admins. Built on the MERN stack with TypeScript and Shadcn UI.',
    tags: ["AI", "Web"],
    tier: "standard",
    links: [
      { label: "Frontend", url: gh("PsyLink-Frontend") },
      { label: "Backend", url: gh("PsyLink-Backend") },
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Gemini"],
  },
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
