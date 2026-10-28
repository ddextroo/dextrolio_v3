---
target: home page (src/app/page.tsx)
total_score: 19
max_score: 36
na_heuristics: 10
p0_count: 1
p1_count: 3
target_identity: "file:C:\\Users\\inguito.d\\Documents\\projects\\dextrolio_v3\\src\\app\\page.tsx"
target_fingerprint: "sha256:e2f732586979a72d2ab0a5d7879f861f6002431f7a4a324a5a81b6061a7ab9df"
target_path: "C:\\Users\\inguito.d\\Documents\\projects\\dextrolio_v3\\src\\app\\page.tsx"
timestamp: 2026-10-27T23-13-30Z
slug: src-app-page-tsx
---
Method: degraded single-context (sub-agent spawning disabled; detector + overlay ran independently).

# Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No nav/anchors/orientation on a ~5-screen page |
| 2 | Match System / Real World | 2 | "Student & Freelancer" undersells to recruiters; "Hello World 👋🏻" reads junior |
| 3 | User Control and Freedom | 3 | Video/carousel/theme controls work; overlay buttons can block video content |
| 4 | Consistency and Standards | 3 | Accent tick sometimes rounded, sometimes square; gradient titles undercut system |
| 5 | Error Prevention | 2 | Dead links when project.link=""; /placeholder.svg missing; "n/a" renders literally |
| 6 | Recognition Rather Than Recall | 3 | Everything visible and labeled |
| 7 | Flexibility and Efficiency | 1 | No resume download; no jump links for a 60-second recruiter skim |
| 8 | Aesthetic and Minimalist Design | 1 | ~60 equal badges, 3 nested cards, 9 identical gradient titles |
| 9 | Error Recovery | 1 | Dead ends with no fallback (GitHub search, mailto) |
| 10 | Help and Documentation | n/a | Portfolio surface |
Total: 19/36 (53%) — Acceptable. n/a: #10.

# Design Specificity
Generic shadcn dashboard wearing a portfolio's clothes; only the demo video is authored. First viewport cannot answer "what does this person build?" in 5 seconds — violates PRODUCT.md principle 4.

# Deterministic scan
CLI: 13 findings — 12x gradient-text (page.tsx L231,266,402,444,484,546,768,834; projects/page.tsx L147,164,181,197), 1x side-tab (page.tsx L783). No false positives.
Overlay (29 marked elements): skipped-heading (h1->h3, CardTitle renders h3), low-contrast 4.4:1 #71717a on #f4f4f5 (inactive tab), nested-cards x3, line-length ~89-90ch x2, straggler x5.
Runtime console: me2.jpg width/height CSS mismatch warning; layout="fill" images missing sizes on /projects.

# Priority Issues
- [P0] No resume/CV path for hiring managers (stated primary audience). Fix: Download Resume primary action; PDF is user-provided; interim: LinkedIn link. Command: harden.
- [P1] First viewport makes no claim; "Student & Freelancer" framing wrong for recruiters. Fix: fact-built positioning line (role + platform range + Prezstige/BarangMI), video as evidence. Command: bolder/layout.
- [P1] Flat hierarchy: 9 identical gradient titles, uniform grid, 60-badge wall. Fix: solid h2 titles with type scale, Tech Stack collapsed to platform categories with counts, single accent. Commands: typeset, colorize, distill.
- [P1] Dead ends: empty links render "View Project", missing placeholder.svg, literal "n/a". Fix: conditional action + real empty states. Command: harden.
- [P2] Zero entrance/scroll motion; page lands as an undifferentiated wall. Fix: GSAP ScrollTrigger staggered reveals, matchMedia prefers-reduced-motion, video-card entrance beat. Command: animate.
- [P2] h1->h3 heading skips; 4.4:1 inactive tab contrast; icon-only carousel arrows unlabeled. Fix: CardTitle asChild h2, contrast bump, aria-labels. Command: audit.

# Persona Red Flags
Jordan (recruiter, 60s): no claim in first viewport, no takeaway artifact, no anchor nav.
Sam (screen reader): h1->h3 skips, out-of-context buttons, 4.4:1 tab text, unlabeled carousel arrows.
Casey (mobile, metered data): autoplay video on cellular, fill images without sizes, no sticky contact CTA on a ~10-screen page.

# Minor Observations
Duplicate ThemeProvider (page.tsx L92 inside layout's); single showFullDescription boolean toggles all cards; index!==2/1 timeline magic numbers; decorative animate-pulse arrows on stats; invalid pt-[-4px] class (L515); over-precise achievement dates.

# Questions to Consider
If a recruiter opens exactly one link from this site, what should it be? What proves platform range in five seconds? What does a confident version lead with instead of "Student & Freelancer"?
