# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers and recruiters evaluating Dexter G. Inguito for full-stack developer roles (Philippines-based or PH-remote positions). They scan quickly for evidence of skill, range, and shipped work, and decide whether to start a conversation.

Secondary audience present in the data but not the design driver: freelance clients and peers — the commissioned-work history and testimonials serve them too.

## Product Purpose

dextrolio.tech is the personal portfolio of Dexter G. Inguito, a full-stack developer. Its job is to turn a visit into job offers or interviews: a recruiter should leave able to state, accurately, what Dexter builds, on which platforms, with what proof. Success is measured by recruiter/employer contact and interview conversion, not by traffic.

## Positioning

The claim a neighboring candidate could not truthfully copy: platform range with shipped products on every platform. One developer with real deployments across web (React/Next/Laravel/PHP/ASP.NET), Android mobile (Java, Flutter, React Native), desktop (Java Swing, .NET), and AI-assisted products (OpenAI, TensorFlow, YOLO) — backed by ~44 documented projects, live products (Prezstige, BarangMI capstone, Codiphy), and client testimonials. Specialists can't claim the range; generalists can't claim the shipped proof.

## Operating Context

- Single-page portfolio at `/` plus a full project grid at `/projects`, currently rendered as a shadcn/ui card dashboard.
- Hero demo video (`/assets/vid.mp4`) autoplays as background proof of work in motion.
- Featured slots for the current startup (Prezstige — prezstige.com) and capstone (BarangMI — kalunasan.barangmi.systems / kalunasan.systems).
- Contact paths: email (dexteringuito3@gmail.com), GitHub (ddextroo), LinkedIn, Facebook.
- SEO is an operational part of the site: JSON-LD Person/WebSite schema, OpenGraph, canonical on dextrolio.tech, Google verification file.
- Deployed on Vercel at https://dextrolio.tech.

## Capabilities and Constraints

- Static content site: all project/testimonial/stack data lives in typed DTO files (`src/dto/*.ts`); no backend, no CMS.
- Next.js 15 App Router + React 19 + Tailwind + shadcn/ui; light/dark via next-themes (system default).
- Project catalog: `recentProjects` — name, description, image, link, date, type (web/mobile/desktop), technologies. Some entries carry honest gaps ("n/a" descriptions, empty links) that must not be silently fabricated into claims.
- Tech stack claim set: `techStack` categories (frontend, backend, database, mobile, desktop, AI/ML, tools).
- Undecided: whether freelance work remains a co-equal goal alongside job hunting; no stated availability date or relocation preference.

## Brand Commitments

- Name and role wording are fixed assets: "Dexter G. Inguito", "Full-Stack Developer", domain "dextrolio.tech", dlogo mark (`/assets/dlogo.png`), verified badge imagery, profile photos (`me.jpg`, `me2.jpg`).
- The hero video is a committed core proof asset: future designs must keep it prominent, not replace it.
- Real product names with live URLs: Prezstige, BarangMI, Codiphy — factual links to preserve.

## Evidence on Hand

- ~44 project screenshots in `public/assets/projects/` covering web, mobile, and desktop builds.
- Working demo video: `public/assets/vid.mp4`.
- Two real testimonials with named authors and roles in `src/dto/testimonial.dto.ts` (client BSEd-Science LET passer; Ultima Reviewer founder).
- Experience and achievements sections with inline content in `src/app/page.tsx`.
- OpenGraph/thumbnail assets: `me2.jpg`, `thumbnail.png`, `verified.png`.
- Absences future work must not fabricate: no employer logos, no usage metrics or revenue claims, no additional testimonials, no pricing, no case-study write-ups beyond the DTO descriptions.

## Product Principles

1. Every section must answer a recruiter's question ("what can this person ship, and is it real?") — proof over presentation.
2. Range is the product: web, mobile, desktop, and AI work stays visibly co-equal; no platform gets buried.
3. Honest catalog over inflated catalog: "n/a" and missing links stay honest or get resolved with real facts, never invented ones.
4. First viewport must make the claim (full-stack with shipped proof) legible within seconds, because recruiters skim.
5. Contact is the conversion event: name, role, email, and social paths stay frictionless from any point on the site.

## Accessibility & Inclusion

No formal standard was specified by the owner. Site ships with system-default light/dark theming and reduced expectations for keyboard/assistive paths should be treated as open quality work, not a stated product constraint.
