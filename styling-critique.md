# Styling Critique (alignment and layout only)

Method: viewed the running site at mobile (375), tablet/small desktop (~800-1024) and measured element geometry at 1440. **Colours, fonts and the overall look are not part of this.**

## What's wrong

### A. Sections don't share a common edge (the "weird in the middle" feeling)
Measured at 1440 wide, the left edge of each section's content:

| Section | Content width | Left edge |
|---|---|---|
| Hero, Achievements, Projects, Contact | 1184 | 120 |
| Skills | 1024 | 200 |
| Experience | 896 | 264 |
| Education | 896 | 264 |
| About | 768 | 328 |

So scrolling down, the content steps in and out: wide, narrow, wider, narrowest, wide again. Nothing lines up with the section above or below it.

### B. Mixed alignment inside a section
- **About:** three centered paragraphs. Every line starts at a different x, so the block looks ragged and is hard to read.
- **Experience:** centered header, then left-aligned cards in a single narrow column. Long paragraphs run in one column with a lot of empty page on both sides.
- **Skills:** centered heading, then groups flush left at an odd offset, with icon tiles and text pills mixed on the same row at different heights (e.g. LangChain/LangGraph icons, then "RAG / Agentic Workflows / LLM Evals" pills floating at the top of the row).
- **Achievements:** the numbers are centered but their labels are left-aligned, so a two-line label starts left of its number.

### C. Hero
- The profile circle has a fixed 350px size plus `ml-10`, so at 1024px it pokes 43px **past** the right edge of the content area.
- The typing line changes length ("Ahsan Shahzad" is one line, "an Agent Workflow Developer" is two), so the hero height jumps and pushes the achievements strip up and down while it types.

### D. Projects
- The two featured cards each span the full 1184px but hold only a title, two lines of text and some chips, so they look empty and stretched.
- Cards in a row have different heights because of `items-start`, so row bottoms don't line up.

### E. Footer
- The footer's container isn't centered: at 1440 it starts at x=1 while everything above starts at x=120, so the footer's left text hangs out to the far left and doesn't line up with any section.

### F. Vertical rhythm
- Spacing between sections is inconsistent: Experience/Skills/Education use `pt-16`, Projects `pt-[70px]`, About `md:pt-16`, Contact `my-12 py-24`. The gaps between sections look random.

## Fix plan

1. **One width system.** Everything uses the full content width (1184px) so left and right edges line up from hero to footer. The only exception is the About prose, which stays in a narrower reading column (`max-w-3xl`), left-aligned and centered on the page, because long lines at full width are hard to read.
2. **Experience:** header stays centered; cards go into a two-column grid on `lg` (single column below), equal height per row, so line lengths are readable and the grid fills the same width as Projects.
3. **Skills:** each group becomes a bordered panel in a 2-column grid (1 column on mobile), items vertically centered in a wrapping row. Same surface style as the other cards.
4. **Education:** same full-width grid of two cards, certifications centered below.
5. **Achievements:** three equal columns, all text centered.
6. **About:** left-aligned text in the reading column.
7. **Hero:** profile circle sized responsively and kept inside its column (no overflow); reserve height for the typing text so it doesn't jump.
8. **Projects:** 6-column grid on `lg` so featured cards are two per row (3 columns each) and standard cards three per row (2 columns each); equal card heights per row.
9. **Footer:** same `container mx-auto px-12` as the page, centered links on mobile.
10. **Rhythm:** every section starts with the same top padding.

## Out of scope
Colours, fonts, copy, animations, component behaviour.

## Result (after the fixes)

Measured at 1440 wide: Hero, Achievements, About, Experience, Projects, Skills, Education, Contact and the footer content all sit on the same edges (x=120 to x=1304). Experience cards are 576px wide in two equal-height columns; featured project cards are 576px (two per row) and standard cards 373px (three per row), with equal heights per row. The typing line no longer changes the hero height at 375, 800, 1100 and 1440 wide, and the page has no horizontal overflow. About is the one deliberate exception: a left-aligned reading column (max 768px) centered under its heading.
