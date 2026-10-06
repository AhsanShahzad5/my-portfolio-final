// Copy comes from content.md §6. Client work is described by domain only: no names, code or screenshots.
// Each story: paragraphs (rendered as <p>), patterns and stack (rendered as chips).

export const experience = {
  role: "Associate Software Engineer",
  company: "Folium AI",
  dates: "June 2025 to present",
  // The capabilities behind the stories (shown above the timeline). Only claims the stories below support.
  capabilities: [
    {
      title: "Agent workflows",
      text: "LangGraph routers, ReAct tool calling and parallel fan-out, built into real products.",
    },
    {
      title: "RAG pipelines",
      text: "Ingestion, chunking and retrieval on Pinecone, with web search only when a question needs it.",
    },
    {
      title: "Reliable LLM output",
      text: "Structured outputs, per-item failure isolation, model fallbacks and guardrails.",
    },
    {
      title: "Shipping and observing",
      text: "Docker, CI with mocked-LLM tests, and LangSmith tracing for latency and cost.",
    },
  ],
  stories: [
    {
      id: "rag-chatbot",
      title: "A RAG chatbot that knows when to look things up",
      subtitle: "Crypto education platform",
      paragraphs: [
        "This was an agentic RAG chatbot built inside an existing Django backend, so it plugs into the app's real users and data instead of living off to the side. The platform's learning material came in several formats, so a big part of the work was the ingestion pipeline: preprocessing each format, chunking it sensibly, embedding it, and storing it in Pinecone.",
        'The "agentic" part is that it doesn\'t retrieve blindly. For each question the agent decides whether the knowledge base is enough, whether it needs a web search for something current, or whether the user\'s attached file is what matters. That keeps simple questions fast and cheap, and still lets it answer the ones the knowledge base can\'t.',
        "I traced everything in LangSmith: latency at p50 and p95, token cost, and time-to-first-token, which sits at around 3 seconds. Answer quality came out at 95%+ in manual review.",
      ],
      patterns: ["Agentic RAG", "Conditional web search", "Multi-format ingestion", "File Q&A", "Observability"],
      stack: ["Python", "Django", "LangChain", "Pinecone", "LangSmith"],
    },
    {
      id: "document-intelligence",
      title: "Turning messy billing documents into validated data",
      subtitle: "Medical billing, FastAPI microservice",
      paragraphs: [
        "This one is a multi-agent LangGraph system, running as a FastAPI service, that reads messy billing paperwork (scans, PDFs, photos) and turns it into structured, validated data. Behind it are multiple agents, each a stateful graph with one clear job: ingesting and extracting from documents, validating what was extracted, recommending how to respond, drafting the resulting letter, and reading images directly with a vision model.",
        "The ingestion graph is the interesting part. It fans out into parallel lanes, one per document type, and each lane runs its own OCR, validity check and extraction. The lanes then merge into a cross-document consistency check that asks whether the documents actually agree with each other. Conditional routing sends every case down the right flow, and every LLM step returns Pydantic structured output, so the next step gets validated data and never free text.",
        "I was careful about failure. One bad file never fails the whole request, because errors are isolated per document and the rest of the batch carries on. Where something can be checked without a model, like adding up line items, a deterministic rule checks it alongside the LLM's concurrent evaluation, so a number never rests on a model's word alone.",
        "To be straight about the terminology: most of these graphs are deterministic multi-step workflows rather than fully autonomous agents, and that was a deliberate choice. For document processing, predictable beats clever.",
      ],
      patterns: [
        "Multi-agent LangGraph",
        "Parallel pipelines",
        "Conditional routing",
        "Cross-document validation",
        "Structured outputs",
        "Vision extraction",
      ],
      stack: ["Python", "FastAPI", "LangGraph", "Pydantic", "asyncio", "OpenAI", "Docker"],
    },
    {
      id: "ocr-layer",
      title: "Making OCR output readable for an LLM",
      subtitle: "The document layer of the system above",
      paragraphs: [
        "OCR output from AWS Textract is accurate but flat: a stream of blocks. Feed it straight to an LLM and tables fall apart and form fields lose their labels. So I built a processing layer that runs Textract's asynchronous jobs over documents stored in S3, handles pagination, and then rebuilds the structure: tables become markdown tables, forms become key-value pairs, all in reading order and guided by Textract's confidence scores.",
        "The same layer decides when to stop. If a scan comes back below a confidence threshold, it never reaches the LLM at all, which saves money and avoids confidently wrong answers built on unreadable input. As above, each document's failures are isolated from the rest.",
      ],
      patterns: [
        "OCR post-processing",
        "Table and form reconstruction",
        "Confidence gating",
        "Async jobs",
        "Failure isolation",
      ],
      stack: ["AWS Textract", "S3", "Python", "asyncio"],
    },
    {
      id: "savings-assistant",
      title: "A chat assistant for a savings app",
      subtitle: "Youth savings platform, Django backend",
      paragraphs: [
        'Users of this app ask for very different things in the same chat box, sometimes several at once, sometimes with a photo, a document or a voice note attached. I built the assistant around a LangGraph router. It reads each message, detects multiple intents when there are several ("show my orders and also arts classes near me"), handles one and queues the rest for the following turns instead of dropping them.',
        "The main path is a ReAct tool-calling agent working directly against the Django backend through custom tools: balances, activities, services, location-aware search, interest-based recommendations. One design choice I like: the current user is injected through LangGraph's runtime config, so the model never passes a user ID and can't ask for anyone else's data. Location intent (near me, a radius, a zip code, a city) is parsed by an LLM with a regex fallback for when the parse fails.",
        "Attachments (images, PDF, Word and Excel files, voice) are pulled from S3 and processed in parallel, with a fallback for each so one failed attachment never blocks the reply. A separate savings agent handles goals, with its own router, guardrails that reject irrelevant uploads, goal-management tools, and a planner fed real budget figures so it never guesses numbers.",
        "On cost, I split the work by model: a lighter model picks the tool, a stronger one writes the answer, and token usage is tracked per request, including images and voice.",
      ],
      patterns: [
        "Intent routing",
        "Multi-intent handling",
        "ReAct tool calling",
        "Multimodal input",
        "Guardrails",
        "Model tiering",
      ],
      stack: ["Python", "Django", "LangGraph", "LangChain", "AWS S3"],
    },
    {
      id: "content-suite",
      title: "Content generation that checks its own facts",
      subtitle: "SEO content platform",
      paragraphs: [
        "This is a suite of generation pipelines for an SEO platform: structured briefs pulled from uploaded Word and spreadsheet files, tables of contents, full blog posts, and meta descriptions. A single prompt doesn't produce reliable articles, so each piece is its own pipeline.",
        "For tables of contents, ReAct agents use a SERP search tool to see what already ranks. For blogs, the draft goes through a multi-pass rewrite (structure, wording, voice) and then a fact-check I'm happy with: the pipeline extracts every claim, verifies each one in parallel with a web search, and rewrites the draft with the corrections. That's a map-reduce, built with LangGraph's Send fan-out, so claims are checked independently and quickly. The result exports to PDF or DOCX. Meta descriptions are generated against a schema with validated retries rather than trusting free text.",
        "The system uses both Claude and OpenAI models with automatic fallback, so a provider outage doesn't stop a job, and each run logs which models it used.",
      ],
      patterns: [
        "ReAct agents",
        "Map-reduce fact-checking",
        "Multi-pass rewriting",
        "Model fallback",
        "Schema-validated retries",
      ],
      stack: ["Python", "LangGraph", "LangChain", "Claude", "OpenAI", "Pytest", "ruff", "mypy"],
    },
    {
      id: "how-i-ship",
      title: "How I ship this stuff",
      subtitle: "",
      paragraphs: [
        "Across all of these I follow the same habits. Services run in Docker with health checks. GitHub Actions runs pytest unit and regression tests with mocked LLM calls (fast, deterministic and no API spend in CI), plus coverage, ruff, mypy and pre-commit hooks. Every project is traced in LangSmith so I can see latency, token cost and time-to-first-token instead of guessing.",
      ],
      patterns: ["CI/CD", "Mocked-LLM testing", "Tracing", "Structured outputs", "Fallbacks"],
      stack: [],
    },
  ],
};
