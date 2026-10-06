# Tasks (implementation checklist)

Read first: `plan.md` (decisions and design), `content.md` (all copy), `CLAUDE.md` (conventions).
**Rules:** only this repo is edited; other project folders are never modified; copy comes from `content.md` verbatim (change it there first if it needs to change); run `npm run lint` and `npm run build` at the end of each phase.

## Phase A: Setup

- [x] A1 Create branch `portfolio-revamp` from the current branch.
- [x] A2 Copy the resume PDF to `public/Ahsan-Shahzad-Resume.pdf` (no spaces in the name). Source: `D:\Projects\1-Practice and Learning\9- Personal Files\AhsanShahzadResume - OCTOBER 2026.docx.pdf`. Replace later if a cleaner PDF exists.

## Phase B: Data layer

- [x] B1 `src/data/icons.js` (or within `projectData.js`): one icon map keyed by name, covering existing icons plus PyTorch, scikit-learn, DVC, MLflow, Docker, FastAPI, Pinecone, LangChain, LangGraph, Hugging Face, AWS, MCP, Gemini, XGBoost, pandas, SQLite. Check each exists in `react-icons`; where a brand icon doesn't exist, use a neutral text chip instead of a wrong icon.
- [x] B2 Rewrite `src/data/projectData.js` with the 19 projects from `content.md` §7 (AI first, Web after) using the schema in `plan.md` §4, tags only `AI` / `Web`. Keep existing image paths for the old web projects. Do not add the Android Fitness App. Statuses: System Design Mentor and Chest Cancer = `wip`. Links only for repos listed in `content.md`.
- [x] B3 Create `src/data/experience.js` from `content.md` §6.
- [x] B4 Create `src/data/skills.js` from `content.md` §8.
- [x] B5 Create `src/data/site.js` (hero, achievements, about, contact, education, certifications, footer links).

## Phase C: Components

- [x] C1 `Navbar.jsx`: new `navLinks` (Home, About, Experience, Projects, Skills, Contact).
- [x] C2 `HeroSection.jsx`: typing sequence, subtitle, buttons incl. Download Resume.
- [x] C3 `AchievementsSection.jsx`: three new metrics from `site.js`.
- [x] C4 `AboutSection.jsx`: new paragraphs (render as multiple `<p>`).
- [x] C5 `ExperienceSection.jsx` + `ExperienceCard.jsx` (new), `id="experience"`.
- [x] C6 `ProjectCard.jsx`: optional image, status badge, details toggle, links array, featured variant.
- [x] C7 `ProjectsSection.jsx` / `ProjectTag.jsx`: tags All · AI · Web, filtering, subheading, stable keys.
- [x] C8 `Skills.jsx`: grouped rendering from `skills.js`, including the lower "Web & Mobile (earlier work)" group; delete `SkillsIcons.jsx` once unused (grep first).
- [x] C9 `EducationSection.jsx` (new) with certification link.
- [x] C10 `EmailSection.jsx`: heading/body copy and shown email only; do not touch form logic or EmailJS call.
- [x] C11 `Footer.jsx`: name, role, links, resume.
- [x] C12 `layout.js`: new title and description.
- [x] C13 `page.js`: final order: Hero, Achievements, About, Experience, Projects, Skills, Education, Contact, Footer.

## Phase D: Cleanup

- [x] D1 Delete only the Android project's images (`gym.jpg`, `gym2.jpg`) after grep confirms nothing else uses them. Keep all other images.
- [x] D2 Replace the boilerplate `README.md` with a short real one (what the site is, how to run, where the content lives).
- [x] D3 Update `CLAUDE.md`: new sections, data files, filter tags, schema.
- [x] D4 Leave `SmoothScrolling.jsx` alone.

## Phase E: Verification

- [x] E1 `npm run lint` and `npm run build` pass.
- [x] E2 Browser check at mobile / tablet / desktop: every section renders, nav anchors scroll correctly, every filter tag works, details toggles open and close, no layout overflow.
- [x] E3 Link check: GitHub repos, SocialLink live site, LinkedIn, certificate, resume download.
- [x] E4 **Claim audit** against the ten ground rules in `plan.md` §1: grep the built content for client names (BillWell, Seed Fund, content tool, Textract-as-"deployed"), "5 agents", eval numbers, "deployed on AWS", demo/EC2 claims on Chest Cancer.
- [ ] E5 Contact form: send one test message.
- [x] E6 Consistency with resume: summary, skills, project names, dates.

## Phase F: Hand-off

- [ ] F1 Walk through the "Needs a yes from Ahsan" list at the end of `content.md`; apply any changes in `content.md` first, then the data files.
- [ ] F2 Ahsan commits / merges / deploys (existing Vercel project). Nothing is committed or pushed without his say-so.
