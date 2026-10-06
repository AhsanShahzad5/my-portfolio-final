# Portfolio Content (final copy)

This is the single source of truth for every word on the new site. Implementation copies it into `src/data/*.js` and the section components; nothing is written from memory later.

**Voice:** first person, conversational, the way I'd explain it to another engineer over coffee. Real technical terms stay (RAG, LangGraph, FastAPI, Pydantic), but each project is told as a short story: what the problem was, how I approached it, what I'm proud of. No resume bullets, no keyword lists inside prose.

**Hard rules this copy follows** (see `plan.md` §1): no client or project names for work, no code, "multiple" instead of counts of agents, evals described as personal-project work only, AWS described as services used (S3, Textract), never "deployed at work", no eval metric numbers, 95% described as manual review, no claims for things the repos don't have today.

Lines marked **[confirm]** need a yes from Ahsan before launch; they're also listed at the end.

---

## 1. Metadata

- **Title:** Ahsan Shahzad | AI/ML Engineer
- **Description:** Portfolio of Ahsan Shahzad, an AI/ML engineer building production GenAI systems (RAG, LangGraph agents) with hands-on ML, deep learning and MLOps projects.

## 2. Navbar

Home · About · Experience · Projects · Skills · Contact

## 3. Hero

- **Greeting:** Hi, I'm
- **Typing sequence:** `Ahsan Shahzad` → `an AI/ML Engineer` → `a GenAI & RAG builder` → `an Agent Workflow Developer`
- **Subtitle:** I build GenAI systems that hold up in production, RAG pipelines and multi-agent workflows with LangChain and LangGraph, and I back that up with ML, deep learning and MLOps projects of my own.
- **Buttons:** `Hire Me` (to #contact) · `View My Work` (to #projects) · `Download Resume` (PDF)

## 4. Achievements strip

| Metric | Value |
|---|---|
| Years building production GenAI | 1+ |
| GenAI systems built at Folium AI | 4 |
| ML / DL / GenAI projects on GitHub | 10+ **[confirm repos are public]** |

## 5. About

> I'm Ahsan, an AI/ML engineer from Lahore. I studied software engineering, and since June 2025 I've been at Folium AI building GenAI systems for real products: retrieval-augmented chatbots, multi-agent document pipelines and tool-calling assistants, mostly in Python with FastAPI, Django, LangChain and LangGraph.
>
> What I enjoy most is the part between a working demo and something you can trust: structured outputs, fallbacks, tracing, tests, and knowing what a pipeline costs per request.
>
> Outside work I've been going deep on the rest of the field: classical ML and deep learning, evaluating LLM applications properly, MCP, and MLOps with DVC and MLflow. I'll be upfront about where my experience is: my production work is in GenAI. The classical ML and deep learning side lives in the projects below, built end to end on my own, and that's the side I'm actively growing into.

## 6. Experience

### Header

**Associate Software Engineer, Folium AI** · June 2025 to present

> Folium AI is a service-based company, so I've worked on several very different products. The code belongs to the clients, so I describe the systems here at the level of architecture and design decisions, not code or names.

Each story below ends with a one-line **Patterns** list and a **Stack** list, which the UI renders as chips.

---

### 6.1 A RAG chatbot that knows when to look things up
*Crypto education platform*

This was an agentic RAG chatbot built inside an existing Django backend, so it plugs into the app's real users and data instead of living off to the side. The platform's learning material came in several formats, so a big part of the work was the ingestion pipeline: preprocessing each format, chunking it sensibly, embedding it, and storing it in Pinecone.

The "agentic" part is that it doesn't retrieve blindly. For each question the agent decides whether the knowledge base is enough, whether it needs a web search for something current, or whether the user's attached file is what matters. That keeps simple questions fast and cheap, and still lets it answer the ones the knowledge base can't.

I traced everything in LangSmith: latency at p50 and p95, token cost, and time-to-first-token, which sits at around 3 seconds. Answer quality came out at 95%+ in manual review.

**Patterns:** Agentic RAG · conditional web search · multi-format ingestion · file Q&A · observability
**Stack:** Python · Django · LangChain · Pinecone · LangSmith

---

### 6.2 Turning messy billing documents into validated data
*Medical billing, FastAPI microservice*

This one is a multi-agent LangGraph system, running as a FastAPI service, that reads messy billing paperwork (scans, PDFs, photos) and turns it into structured, validated data. Behind it are multiple agents, each a stateful graph with one clear job: ingesting and extracting from documents, validating what was extracted, recommending how to respond, drafting the resulting letter, and reading images directly with a vision model.

The ingestion graph is the interesting part. It fans out into parallel lanes, one per document type, and each lane runs its own OCR, validity check and extraction. The lanes then merge into a cross-document consistency check that asks whether the documents actually agree with each other. Conditional routing sends every case down the right flow, and every LLM step returns Pydantic structured output, so the next step gets validated data and never free text.

I was careful about failure. One bad file never fails the whole request, because errors are isolated per document and the rest of the batch carries on. Where something can be checked without a model, like adding up line items, a deterministic rule checks it alongside the LLM's concurrent evaluation, so a number never rests on a model's word alone.

To be straight about the terminology: most of these graphs are deterministic multi-step workflows rather than fully autonomous agents, and that was a deliberate choice. For document processing, predictable beats clever.

**Patterns:** Multi-agent LangGraph · parallel pipelines · conditional routing · cross-document validation · structured outputs · vision extraction
**Stack:** Python · FastAPI · LangGraph · Pydantic · asyncio · OpenAI · Docker

---

### 6.3 Making OCR output readable for an LLM
*The document layer of the system above*

OCR output from AWS Textract is accurate but flat: a stream of blocks. Feed it straight to an LLM and tables fall apart and form fields lose their labels. So I built a processing layer that runs Textract's asynchronous jobs over documents stored in S3, handles pagination, and then rebuilds the structure: tables become markdown tables, forms become key-value pairs, all in reading order and guided by Textract's confidence scores.

The same layer decides when to stop. If a scan comes back below a confidence threshold, it never reaches the LLM at all, which saves money and avoids confidently wrong answers built on unreadable input. As above, each document's failures are isolated from the rest.

**Patterns:** OCR post-processing · table and form reconstruction · confidence gating · async jobs · failure isolation
**Stack:** AWS Textract · S3 · Python · asyncio

---

### 6.4 A chat assistant for a savings app
*Youth savings platform, Django backend*

Users of this app ask for very different things in the same chat box, sometimes several at once, sometimes with a photo, a document or a voice note attached. I built the assistant around a LangGraph router. It reads each message, detects multiple intents when there are several ("show my orders and also arts classes near me"), handles one and queues the rest for the following turns instead of dropping them.

The main path is a ReAct tool-calling agent working directly against the Django backend through custom tools: balances, activities, services, location-aware search, interest-based recommendations. One design choice I like: the current user is injected through LangGraph's runtime config, so the model never passes a user ID and can't ask for anyone else's data. Location intent (near me, a radius, a zip code, a city) is parsed by an LLM with a regex fallback for when the parse fails.

Attachments (images, PDF, Word and Excel files, voice) are pulled from S3 and processed in parallel, with a fallback for each so one failed attachment never blocks the reply. A separate savings agent handles goals, with its own router, guardrails that reject irrelevant uploads, goal-management tools, and a planner fed real budget figures so it never guesses numbers.

On cost, I split the work by model: a lighter model picks the tool, a stronger one writes the answer, and token usage is tracked per request, including images and voice.

**Patterns:** Intent routing · multi-intent handling · ReAct tool calling · multimodal input · guardrails · model tiering
**Stack:** Python · Django · LangGraph · LangChain · AWS S3

---

### 6.5 Content generation that checks its own facts
*SEO content platform*

This is a suite of generation pipelines for an SEO platform: structured briefs pulled from uploaded Word and spreadsheet files, tables of contents, full blog posts, and meta descriptions. A single prompt doesn't produce reliable articles, so each piece is its own pipeline.

For tables of contents, ReAct agents use a SERP search tool to see what already ranks. For blogs, the draft goes through a multi-pass rewrite (structure, wording, voice) and then a fact-check I'm happy with: the pipeline extracts every claim, verifies each one in parallel with a web search, and rewrites the draft with the corrections. That's a map-reduce, built with LangGraph's `Send` fan-out, so claims are checked independently and quickly. The result exports to PDF or DOCX. Meta descriptions are generated against a schema with validated retries rather than trusting free text.

The system uses both Claude and OpenAI models with automatic fallback, so a provider outage doesn't stop a job, and each run logs which models it used.

**Patterns:** ReAct agents · map-reduce fact-checking · multi-pass rewriting · model fallback · schema-validated retries
**Stack:** Python · LangGraph · LangChain · Claude · OpenAI · pytest · ruff · mypy

---

### 6.6 How I ship this stuff

Across all of these I follow the same habits. Services run in Docker with health checks. GitHub Actions runs pytest unit and regression tests with mocked LLM calls (fast, deterministic and no API spend in CI), plus coverage, ruff, mypy and pre-commit hooks. Every project is traced in LangSmith so I can see latency, token cost and time-to-first-token instead of guessing.

**Patterns:** CI/CD · mocked-LLM testing · tracing · structured outputs · fallbacks

---

## 7. Projects

**Section heading:** My Projects
**Sub-heading:** The GenAI work above is client work, so it isn't public. These are the projects I built on my own, to learn the rest of the field properly.

**Filter tags:** All · AI · Web (previously All · Web · Mobile). Every ML, deep learning, GenAI and MLOps project is tagged **AI**; the web projects are tagged **Web**; PsyLink is tagged both.

**Priority:** the current AI/ML work comes first. The earlier full-stack projects are all kept, just lower down the list (cards 14 onwards).

**Card format:** title, one-line summary, an expandable "details" paragraph, tech chips, tag(s), optional links, optional **Work in progress** badge, optional image. Cards with no image render text-first. Order below is display order.

### Featured

**1. System Design Mentor: Hybrid RAG with an Evaluation Suite** · tags: AI · badge: Work in progress · link: GitHub (`System-Design-Mentor-Hybrid-RAG-with-an-Evals`)
*Summary:* A RAG assistant over five system design and ML books, built with hybrid search and tested with its own evaluation suite.
*Details:* I wanted a RAG system I could actually measure, so I built one over five books (system design, ML systems and data-intensive applications). Two decoupled pipelines do the work: one turns the PDFs into layout-aware markdown with chapter and section metadata, the other chunks, embeds and indexes them in Pinecone with both dense vectors and BM25 keyword search. At query time dense and keyword results are fused with Reciprocal Rank Fusion, reranked, and the top five go to a LangGraph flow that rewrites follow-up questions only when history is needed and routes between book lookups and RAG answers. I also built an evaluation suite around it: golden datasets covering retrieval, answer quality, safety, latency and cost, regression checks that compare every change against a baseline and return a pass/review/fail for CI, and online scoring of live LangSmith traces. The eval structure follows a CampusX course; the implementation, registry and tolerance tuning are my own. Known gap: it doesn't index images or diagrams.
*Tech:* LangGraph · Pinecone · OpenAI · LangSmith · PyMuPDF

**2. Chest Cancer Classification: End-to-End ML Pipeline** · tags: AI · badge: Work in progress · link: GitHub (`Chest-Cancer-Classification-Deep-Learning-Project`)
*Summary:* A CT-scan classifier built the way a production ML project should be structured: config-driven, versioned and reproducible.
*Details:* The model is a VGG16 transfer-learning classifier with data augmentation, early stopping and learning-rate scheduling. The part I care about is the structure around it: a configuration-driven design (YAML configs, typed entities, a configuration manager) feeding a four-stage DVC pipeline for ingestion, base-model preparation, training and evaluation. DVC tracks parameters, so when I change one only the stages it affects re-run. Runs are logged to MLflow with their parameters, metrics and models. Serving and deployment are the next steps and not part of what's published here yet.
*Tech:* TensorFlow/Keras · DVC · MLflow · Python

### Agents and LLM tooling

**3. Email Agent with Human Approval** · tags: AI · link: GitHub (`Langgraph-Email-Sending-Agent`)
*Summary:* A LangGraph agent that drafts an email, then waits for a human before sending anything.
*Details:* Given a recipient, subject and tone, the agent drafts an email and decides for itself whether it needs a web search to get the facts right. When the draft is ready, the graph pauses with an interrupt and saves its state to a SQLite checkpoint. Approving or editing the draft over the API resumes the same conversation thread and only then sends it. Nothing is sent during generation. It's a small project, but it shows human-in-the-loop done properly.
*Tech:* LangGraph · FastAPI · SQLite · Python

**4. MCP Servers Project** · tags: AI · links: GitHub (`MCP-Servers-Project`), Remote server practice (`remote-mcp-server-practice`)
*Summary:* The same expense-tracking MCP server built two ways, local and remote, plus a custom client.
*Details:* A learning project for the Model Context Protocol. The expense server exposes tools to add, list and summarize expenses, once as a local server over stdio and once as a remote HTTP service. A custom FastAPI client connects an LLM to a weather MCP server over stdio and to the remote expense server over HTTP.
*Tech:* MCP · FastAPI · Python · OpenAI

**5. Fine-tuned BERT Sentiment App** · tags: AI · link: GitHub (`Finetuned-BERT-sentiment-analysis`)
*Summary:* A FastAPI service and web page that classify movie reviews as positive or negative with a fine-tuned BERT.
*Details:* I fine-tuned BERT on IMDb reviews (the model is hosted on Hugging Face), then wrapped it in a FastAPI app with a simple browser UI, a prediction endpoint that returns sentiment and a confidence score, a health check, Pytest tests and Docker Compose.
*Tech:* PyTorch · Hugging Face · FastAPI · Docker · Pytest

### Machine learning and deep learning

**6. House Price Prediction** · tags: AI · link: GitHub (`House-Price-prediction`)
*Summary:* My most complete classical-ML project: a full regression workflow on California housing data.
*Details:* EDA and visualization, preprocessing and scaling, then a comparison of Linear Regression, Random Forest and a histogram-based gradient boosting model, with cross-validation and hyperparameter search, evaluated on proper regression metrics. I wrote it to be reusable, so the same flow can be pointed at other tabular problems.
*Tech:* scikit-learn · pandas · NumPy · Matplotlib

**7. SMS Spam Detection API** · tags: AI · link: GitHub (`Spam-Email-Classification-End-to-End`); also the notebook version (`Spam-Email-Classification-Simple`)
*Summary:* A spam classifier taken from a notebook all the way to a tested API.
*Details:* A TF-IDF and Multinomial Naive Bayes model served through FastAPI with Pydantic request and response schemas, artifacts loaded once at startup through the lifespan handler, generated OpenAPI docs, API tests and locked dependencies with `uv`. A simpler notebook-only version is in a separate repo.
*Tech:* scikit-learn · FastAPI · Pydantic · uv

**8. Credit Card Fraud Detection** · tags: AI · link: GitHub (`Credit-Card-Fraud-Detection`)
*Summary:* Fraud detection on a dataset where only 0.17% of transactions are fraud.
*Details:* Of 284,807 transactions only 492 are fraudulent, so accuracy alone would be misleading. I balanced a sample, trained Logistic Regression and XGBoost, and compared them on precision, recall, F1 and cross-validation instead.
*Tech:* scikit-learn · XGBoost · pandas

**9. Customer Churn Prediction** · tags: AI · link: GitHub (`Customer-Churn-Prediction`)
*Summary:* Predicts which telecom customers are likely to leave.
*Details:* Exploratory analysis, categorical encoding, SMOTE to handle class imbalance, then Decision Tree, Random Forest and XGBoost compared. The Random Forest is evaluated and saved with its encoders for example predictions.
*Tech:* scikit-learn · imbalanced-learn · XGBoost

**10. Recommender Systems** · tags: AI · links: GitHub (`Movie-Recommendation-System`, `Book-Recommendation-System`)
*Summary:* Two recommenders built to compare approaches.
*Details:* A content-based movie recommender that turns metadata (genres, keywords, cast, director, overview) into tags and returns the five most similar titles by cosine similarity, and a book recommender with a popularity-based ranking plus item-based collaborative filtering over reader ratings.
*Tech:* scikit-learn · pandas

**11. Fashion-MNIST Classifier in PyTorch** · tags: AI · link: GitHub (`Fashion-mnist-pytorch-classifier`)
*Summary:* A controlled comparison of activations and optimizers on a small neural network.
*Details:* I trained feed-forward networks on Fashion-MNIST, compared ReLU against sigmoid and Adam against SGD, and kept the best model, which reached 87.11% test accuracy.
*Tech:* PyTorch

**12. Deep Learning Practice Projects** · tags: AI · link: GitHub (`Practice-Deep-Learning-Projects`)
*Summary:* Three Keras notebooks that cover the fundamentals.
*Details:* Customer churn classification, MNIST digit recognition and graduate-admission regression, built to practice preprocessing, scaling, network design, training and evaluation.
*Tech:* TensorFlow/Keras · scikit-learn

**13. MLflow Remote Tracking Demo** · tags: AI · link: GitHub (`mlflow-basics-demo`)
*Summary:* Experiment tracking three ways: locally, on DagsHub and on my own remote server.
*Details:* I connected training code to an MLflow server I ran on an EC2 instance, with an S3 bucket for artifacts, alongside the local and DagsHub setups, to understand how experiment tracking works beyond a laptop.
*Tech:* MLflow · AWS EC2 · S3 · Python

### Web and full-stack (earlier work, kept)

**14. PsyLink** · tags: AI · Web · links: GitHub frontend (`PsyLink-Frontend`), backend (`PsyLink-Backend`)
*Summary:* My final-year project: a mental wellness platform with an AI companion.
*Details:* Anonymous therapy sessions, an AI "Vent Buddy" powered by Gemini, community, appointments, mood tracking and journaling, with role-based access for patients, doctors and admins. Built on the MERN stack with TypeScript and Shadcn UI.
*Tech:* React · Node · Express · MongoDB · TypeScript · Gemini

**15. SocialLink** · tags: Web · links: GitHub (`Social-Link`), Live (`social-link-iz2i.onrender.com`) · image: `/images/projects/socialLink3.png`
*Summary:* A full-stack social platform with real-time chat.
*Details:* REST APIs, authentication, profiles, follows, likes and comments, and Socket.io chat on the MERN stack.
*Tech:* React · Node · Express · MongoDB · Socket.io

**16. Quick Bites** · tags: Web · links: GitHub (`Quick-Bites-Frontend`), Live (`quick-bites-frontend-za1k.onrender.com`) · image: `/images/projects/quickbites.png`
*Summary:* A full-stack food ordering platform for restaurants and customers.
*Details:* Authentication, a restaurant module where owners manage their page and menu, and an ordering module for customers.
*Tech:* TypeScript · React · Shadcn UI · Express · MongoDB · Node

**17. NextJS Admin Dashboard + Blog** · tags: Web · link: GitHub (`nextjs-simple-dashboard`) · image: `/images/projects/dashboard.png`
*Summary:* A full-stack web app that combines an admin dashboard with a blog.
*Tech:* JavaScript · Next.js · Tailwind CSS · CSS

**18. Newzy** · tags: Web · link: GitHub (`Newzy`) · image: `/images/projects/newzy.png`
*Summary:* A news site built on a news API, with categories like tech and politics.
*Tech:* HTML · JavaScript · React · Tailwind CSS

> *Removed:* the Android Fitness App and the Previous Portfolio card. Everything else from the old site stays, ordered after the AI work, with its existing images, links and live demos.

## 8. Skills

**Heading:** Skills & Tools
**Order:** current focus first; earlier web skills stay, shown lower under their own group.

| Group | Items |
|---|---|
| AI & ML | LangChain, LangGraph, RAG, Agentic Workflows, LLM Evals, MCP, PyTorch, TensorFlow, Scikit-learn, Hugging Face |
| Languages | Python, TypeScript, JavaScript, SQL, C/C++, Java |
| Frameworks & Libraries | FastAPI, Django, Pydantic, React.js, Next.js, Node.js, Tailwind CSS |
| Databases | PostgreSQL, MongoDB, Pinecone, Chroma, Supabase, Neo4j |
| Developer & MLOps Tools | AWS (EC2, S3, IAM, Textract), Docker, Git, GitHub Actions, MLflow, DVC, LangSmith, Jupyter, Jira |
| Core | REST APIs, Asynchronous Programming, OOP, DSA, Agile |
| Web & Mobile (earlier work) | HTML, CSS, Express.js, Redux, Recoil, Shadcn UI, Framer Motion, Android Studio |

## 9. Education & Certifications

**Heading:** Education
- **B.S. in Software Engineering**: Comsats University Islamabad, Lahore Campus · Sep 2021 to June 2025
- **FSc Pre-Engineering**: Government College University, Lahore · Sep 2019 to June 2021

**Certifications:** LangSmith Essentials (LangChain Academy) · link: https://academy.langchain.com/certificates/eddgusuv4k
*(React Basics and NodeJS Intermediate from HackerRank are left off. **[confirm]**)*

## 10. Contact

- **Heading:** Let's Connect
- **Body:** I'm open to AI/ML engineering roles, especially GenAI, RAG and agent systems. If you're hiring, working on something interesting, or just want to talk shop, my inbox is open and I'll get back to you.
- No separate email line (contact is through the form and the social icons).
- Form fields and labels stay as they are. Social icons: GitHub, LinkedIn.

## 11. Footer

`Ahsan Shahzad · AI/ML Engineer` · GitHub · LinkedIn · Resume · © All rights reserved.

---

## Sign-off list (status after implementation)

1. **Repos public:** verified. All 19 GitHub links returned 200, so "10+ projects on GitHub" holds. **Done.**
2. **Resume PDF:** `public/Ahsan-Shahzad-Resume.pdf` is the October 2026 PDF as-is (certifications spill onto page 2, small typos such as "Fsc"). Swap in a cleaned file under the same name if you have one. **Needs Ahsan.**
3. **Contact email:** the site shows ahsanshahzad331188@gmail.com; the EmailJS form delivers to whatever its template is set to. **Needs Ahsan to confirm they match.**
4. **Certifications:** HackerRank certificates dropped, LangSmith Essentials kept. **Needs Ahsan's OK.**
5. **Old web projects:** kept, lower priority; Android Fitness App removed. **Done.**
6. **Live / not-live labels:** none shown (savings-assistant title no longer says "live"). **Done.**
7. **Chest Cancer / System Design Mentor / MLflow demo:** as-they-exist-today copy, Work in progress badge on the first two, no deployment claims, no link for the last two. **Done.**
8. **RAG chatbot story (6.1):** still the thinnest; add any true extra details (model tier, chunking approach, whether answers stream). **Optional, needs Ahsan.**
9. **Contact form test message:** not sent (it emails a real inbox). **Needs Ahsan's go-ahead.**
10. **Commit / merge / deploy:** nothing is committed. **Ahsan's call.**

> *Tech chips:* only technologies with an authentic icon are shown on cards. DeepEval, NLTK, torchvision and cosine similarity have no icon in any standard set or on their official sites, so they are mentioned in the text only.
