---
target: the homepage
total_score: 22
max_score: 32
na_heuristics: 9,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\inguito.d\\Documents\\projects\\dextrolio_v3\\src\\app\\page.tsx"
target_fingerprint: "sha256:d91fe5c518631faa2aa0b3ce68b33405ceb3dd6a57c8477ee1ca191224f2b481"
target_path: "C:\\Users\\inguito.d\\Documents\\projects\\dextrolio_v3\\src\\app\\page.tsx"
timestamp: 2026-10-27T23-42-57Z
slug: src-app-page-tsx
---
# Design Critique — src/app/page.tsx (dextrolio.tech home)

Method: DEGRADED single-context (sub-agent tool disabled in this session; Assessment A and B ran sequentially in-thread).

Surface mode: Persuade / Experience (recruiter-facing portfolio). Heuristics 9 (Error Recovery) and 10 (Help & Documentation) scored n/a — static content site, no error surfaces, no docs needed. Applicable max = 32.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Theme, tabs, carousel, expand/collapse feedback; no async gaps. |
| 2 | Match System / Real World | 3 | Plain section labels; tech jargon appropriate for audience. |
| 3 | User Control and Freedom | 3 | Tabs, show-all, external links new tab; no section jump. |
| 4 | Consistency and Standards | 3 | Cohesive shadcn; Spotlight vs ProjectCard render similar content two ways. |
| 5 | Error Prevention | 3 | No risky inputs; honest empty states. |
| 6 | Recognition Rather Than Recall | 2 | No section nav on long single page; range claim not visually reinforced. |
| 7 | Flexibility and Efficiency | 2 | No skim path to Projects/Contact. |
| 8 | Aesthetic and Minimalist Design | 3 | Clean but too safe; low distinctiveness. |
| 9 | Error Recovery | n/a | No error states on static site. |
| 10 | Help and Documentation | n/a | Not applicable to a portfolio. |
| Total | | 22/32 (69%) | Acceptable, bordering Good |

Prior run this session: 19/36 (53%).

## Design Specificity Verdict

Reads as a professional, trustworthy developer portfolio but category-interchangeable. The differentiator (shipped range across web/mobile/desktop/AI with live products) is stated and listed but never shown as a single glanceable device. Strongest assets (hero demo video, live Prezstige/Kontak/BarangMI links, 44-project proof) are real but distributed quietly.

Deterministic scan: impeccable detect returned [] across src/app and src/components. Prior 12 gradient-text + side-tab findings gone.

Visual overlays: not presented — native browser view hidden (NATIVE_BROWSER_VIEWPORT_UNAVAILABLE) and detector found zero issues to mark. Fallback = DOM/a11y probes.

## Priority Issues

1. [P1] No in-page navigation on a long single page. Top bar holds only logo + theme toggle; recruiters scroll past About/Experience/Tech to reach Projects/Contact. Fix: compact anchor nav or sticky section rail. Command: $impeccable layout / $impeccable clarify.
2. [P1] Differentiator told, not shown. Fix: lead Projects with a platform-tagged proof strip (Web/Mobile/Desktop/AI tiles with live screenshot + count). Command: $impeccable bolder / $impeccable layout.
3. [P2] Strongest proof hidden behind non-default tab; Spotlight vs ProjectCard inconsistency. Fix: default to strongest proof / unify card grammar. Command: $impeccable polish.
4. [P2] Accessibility nits: verified.png missing alt; 7 tech category headings concatenate counts ("Frontend6"); no skip link; nav landmarks = 0. Fix: alt/aria-hidden, skip link, <nav>. Command: $impeccable harden / $impeccable audit.
5. [P3] About is a mid-page wall (5 paragraphs + list). Fix: tighten and/or move below Projects. Command: $impeccable distill.

## What's Working

- Integrity as a feature: graceful degradation, brand-free honest headline.
- Clean hierarchy: one h1, six h2, h3 items, no skipped levels.
- Proof-in-motion hero: demo video + live product links.

## Persona Red Flags

- Jordan (busy recruiter): no section nav; proof below fold; flagship on non-default tab.
- Sam (screen-reader/keyboard): verified.png no alt; "Frontend6" count; no skip link; zero nav landmarks.
- Casey (mobile): hero stacks at 788px; Contact at very bottom; full narrow-width verification limited (no resize tool).

## Minor Observations

- Hero subline now just "Software Engineer" — accurate but bare.
- videoPlaying read false during inspection but tab was hidden (autoplay policy) — inconclusive.
- Footer availability signal is good; consider echoing higher.

## Questions to Consider

- What single first-viewport visual proves "range with shipped work" without scrolling?
- Should the page lead with proof (projects) then narrative (about/experience)?
