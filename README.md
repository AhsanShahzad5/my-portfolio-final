# Ahsan Shahzad | Portfolio

Personal portfolio of Ahsan Shahzad, an AI/ML engineer: production GenAI experience (RAG, LangGraph agents), plus ML, deep learning and MLOps projects.

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and Framer Motion.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Where things live

- `content.md`: all of the site's copy (source of truth).
- `src/data/`: the same content as data (`site.js`, `experience.js`, `projectData.js`, `skills.js`, `icons.jsx`). Edit these to change what the site says.
- `src/components/`: one component per section or UI piece.
- `public/`: images and the resume PDF.
- `CLAUDE.md`: code conventions. `plan.md` and `tasks.md`: revamp plan and checklist.

## Contact form

The contact form uses EmailJS (`@emailjs/browser`). Its IDs are set in `src/components/EmailSection.jsx`.
