# Portfolio Revamp: Final Plan

Inputs: `Spec.md`, `Claude_Chat_Context.md` (source of truth for positioning and what's defensible), the October 2026 resume PDF, the existing site code, and the project folders (read-only).
Companion files: **`content.md`** (every word of copy, final), **`tasks.md`** (implementation checklist), **`CLAUDE.md`** (code conventions).

## 0. Scope

- **Only this repository is edited.** Other project folders (Chest Cancer, RAG, LLM Evals, MLflow, work projects) are read-only reference. Nothing there is fixed, finished, pushed or linked unless it already exists on GitHub.
- The site describes every project **as it exists today**.
- **Focus is content and framing.** Visual design stays: dark theme, existing components and Tailwind tokens. New sections reuse existing patterns.

## 1. Positioning

> AI/ML Engineer with 1+ year of production GenAI experience (RAG, agents), backed by ML/DL fundamentals, LLM-evaluation knowledge, and an MLOps-style personal project.

GenAI is the anchor (paid, production). Personal projects carry ML/DL, MLOps and eval depth. Both vocabularies stay on the page (LangChain/RAG **and** PyTorch/scikit-learn/MLflow).

### Ground rules (every line of copy)

1. Never overclaim; if it can't be defended in an interview, it's out.
2. Human, portfolio-style voice: first person, short stories (problem, approach, what's interesting), with real technical terms. Not resume bullets.
3. "Multiple agents", never "5 agents".
4. No domain jargon (CPT, EOB, denial codes). "Medical billing documents" once, then architecture.
5. Client work: no client/project names, no code, no screenshots; described by domain.
6. Evals were personal-project work, never Folium work.
7. AWS at work = S3 + Textract used in code, never "deployed on AWS". EC2/S3 appear only in the personal MLflow demo.
8. No eval metric numbers from the RAG eval suite.
9. 95%+ = manual review, never an automated eval. ~3 s TTFT from LangSmith.
10. No claim, link or demo for something that doesn't exist in its repo today.

## 2. Decisions (resolved so implementation can start)

These replace the earlier open questions. They are the defaults; any can be flipped before launch by editing `content.md` and the data files.

| # | Decision |
|---|----------|
| D1 | Old web projects (Quick Bites, NextJS dashboard, Newzy, previous portfolio) are **kept**, ordered after the AI work (lower priority). Only the **Android Fitness App** is removed (with its images). |
| D2 | **PsyLink** and **SocialLink** stay, in the Web group at the end of the list. PsyLink is tagged AI and Web. |
| D3 | Achievements strip shows three true numbers: 1+ years, 4 GenAI systems built, 10+ projects on GitHub. |
| D4 | Work-experience cards do **not** show live / not-live status. |
| D5 | Chest Cancer, System Design Mentor: describe only what exists today; "Work in progress" badge; no deployment claims. Chest Cancer links to its existing repo; System Design Mentor and MLflow demo have no link. |
| D6 | Project cards are **text-first** for the new AI work: no image required. The old web projects keep their existing images. No new image production. |
| D7 | Resume PDF is added to `public/` and linked from Hero and Footer. |
| D8 | Contact email shown is the resume email. The EmailJS form is left exactly as is. |
| D9 | HackerRank certificates are dropped; LangSmith Essentials stays. |

## 3. Site structure

| # | Section | Change |
|---|---------|--------|
| 1 | Navbar | Home · About · Experience · Projects · Skills · Contact |
| 2 | Hero | New typing roles, subtitle, add Resume button |
| 3 | Achievements | Three new metrics |
| 4 | About | Rewritten |
| 5 | **Experience** (new) | Header + six story cards (five systems + "how I ship") |
| 6 | Projects | New data, filter tags **All · AI · Web** (was All · Web · Mobile), AI first then Web, status badge, expandable details |
| 7 | Skills | Current-focus groups first, earlier web/mobile skills kept in a lower group, from one data file |
| 8 | **Education** (new) | Degrees + LangSmith Essentials |
| 9 | Contact | New copy, email shown; form untouched |
| 10 | Footer | Name, role, links, resume |

Order on the page: Hero → Achievements → About → Experience → Projects → Skills → Education → Contact → Footer.

All copy is in `content.md`. Do not re-write copy during implementation; if a line needs changing, change it in `content.md` first.

## 4. Technical design

### Data files (`src/data/`)

- `projectData.js` (rewrite). Schema per project:
  `{ id, title, summary, details, tags: ["AI" | "Web"], tier: "featured" | "standard", status?: "wip", links: [{label, url}], techStack: [iconKeys], image? }`
  Keep tech-icon constants; add the missing ones (PyTorch, scikit-learn, DVC, MLflow, Docker, FastAPI, Pinecone, LangChain/LangGraph, Hugging Face, AWS, MCP, Gemini). Store `techStack` as keys resolved through one icon map, so each icon exists once.
- `experience.js` (new): `{ role, company, dates, intro, stories: [{ id, title, subtitle, paragraphs: [], patterns: [], stack: [] }] }`
- `skills.js` (new): `[{ group, items: [{ name, icon? }] }]`. Replaces the duplicated lists in `Skills.jsx` / `SkillsIcons.jsx`.
- `site.js` (new, small): hero strings, achievements, about paragraphs, contact copy, certifications, links. Keeps all non-project text editable in one place.

### Components

- New: `ExperienceSection.jsx`, `ExperienceCard.jsx`, `EducationSection.jsx`.
- Edited: `Navbar`, `HeroSection`, `AchievementsSection`, `AboutSection`, `ProjectsSection`, `ProjectCard`, `ProjectTag`, `Skills`, `EmailSection` (copy only), `Footer`, `page.js`, `layout.js`.
- Deleted: `SkillsIcons.jsx` after its data moves to `skills.js`.
- `ProjectCard`: image optional; status badge; "Details" toggle (local state, accessible button); links rendered from `links[]`; tech icons with `React.Children.toArray`/keys; featured tier gets a wider/taller card. Keep existing colours (`#181818`, `#33353F`, `#ADB7BE`, `primary`/`secondary`).
- `ProjectsSection`: tags become `All · AI · Web`, filter by `tags.includes`. Order: featured AI, remaining AI, then Web projects, preserving data order. Keep the framer-motion entrance, use `project.id` keys.
- `ExperienceCard`: same surface style as project cards; story paragraphs, then "Patterns" chips and "Stack" chips. Mobile-first single column.
- Follow `CLAUDE.md`: default exports, `"use client"` only where hooks/motion are used, `@/` imports, Tailwind only.

### Not changing

Tailwind theme, global CSS, EmailJS logic, `SmoothScrolling.jsx` (separate issue), dependency versions.

## 5. Risks and mitigations

| Risk | Mitigation |
|------|-----------|
| Overclaiming | Copy is pre-written and rule-checked in `content.md`; claim audit task before merge. |
| Client confidentiality | Domain-only framing; no names, code, screenshots, customer figures. |
| Credentials | The MLflow demo folder holds an AWS key CSV and some folders hold API-key text files: never opened, copied or referenced. |
| Broken links | Link check task; only repos that already have a GitHub remote are linked. |
| Dilution by too many projects | Featured first, filters, compact cards, details collapsed by default. |
| Resume drift | Skills and summary mirror the resume (plus the earlier-work group); re-sync when the resume changes. |

## 6. Before launch (needs Ahsan)

Listed at the end of `content.md`. In short: confirm the repos are public (for "10+ projects"), approve the resume PDF to host, confirm the contact email, and add any true extra detail for the RAG chatbot story.
