"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Monitor,
  Volume2,
  VolumeX,
  MapPin,
  Facebook,
  Download,
  Brain,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { recentProjects } from "@/dto/projects.dto";
import { techStack } from "@/dto/tech_stack.dto";
import { testimonials } from "@/dto/testimonial.dto";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// One shared low-res placeholder instead of the same base64 pasted six times.
const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR4SEhwYHDIYGDIdHRkyLR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

// Set to "/resume.pdf" once the PDF is committed to public/ to swap the
// recruiter takeaway from the LinkedIn profile to a direct download.
const RESUME_HREF = "https://www.linkedin.com/in/dexter-inguito-b039a827b/";
const RESUME_IS_PDF = false;

const experience = [
  {
    role: "Software Engineer",
    company: "Sprobe Inc.",
    period: "February 2026 – October 2026",
    description:
      "Led a team building an agentic AI itinerary system — one orchestrator plus web-search, weather, and map tools cut generation time by 80%. Shipped it on Laravel + React in Dockerized containers (Nginx, Caddy), server-sent events for AI workers, and Reverb WebSocket API sync for 50+ users on an AWS EC2 instance, with a GitHub Actions CI/CD pipeline.",
  },
  {
    role: "Chief Technology Officer",
    company: "Prezstige",
    period: "July 2025 – Present",
    description:
      "Driving end-to-end development of web and mobile solutions that help Filipino MSMEs scale. Own the platform architecture and the design of scalable, reliable systems.",
  },
  {
    role: "Mobile & Web Developer",
    company: "Freelance",
    period: "2020 – Present",
    description:
      "Delivering tailored web and mobile solutions for clients, from architecture to deployment.",
  },
  {
    role: "Full Stack Developer",
    company: "Ultima Reviewer",
    period: "2021 – 2024",
    description:
      "Built full-stack applications and managed the technical infrastructure.",
  },
  {
    role: "Product Lead Developer",
    company: "Unirises",
    period: "2020 – 2021",
    description: "Led product development and the technical team.",
  },
];

const education = {
  role: "BS Information Technology",
  school: "Cebu Technological University – Main Campus",
  period: "2021 – 2026",
  note: "Coding since 2017.",
};

const achievements = [
  {
    title: "2nd Place",
    description: "Product Innovation and Research Summit",
    date: "December 2024",
  },
  {
    title: "2nd Runner Up",
    description: "Hack4Gov 3",
    date: "July 2024",
  },
];

const featuredProjectNames = ["Libratech", "Codiphy", "Iskolar ng Bayan"];

type Project = (typeof recentProjects)[number];

const AI_TOKENS = [
  "tensorflow",
  "openai",
  "gemini",
  "pytorch",
  "keras",
  "yolo",
  "scikit",
  "agentic",
  "fastapi",
  "ollama",
  "agno",
  "gpt",
  "llm",
  "machine learning",
  "neural",
];

const isAIProject = (p: Project) =>
  p.technologies.some((t) =>
    AI_TOKENS.some((tok) => t.toLowerCase().includes(tok))
  ) ||
  /\bAI\b|agentic|machine learning|neural|GPT|LLM|YOLO|TensorFlow/i.test(
    p.description
  );

const platformTiles = [
  {
    key: "web",
    label: "Web",
    icon: Globe,
    match: (p: Project) => p.type === "web",
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: Smartphone,
    match: (p: Project) => p.type === "mobile",
  },
  {
    key: "desktop",
    label: "Desktop",
    icon: Monitor,
    match: (p: Project) => p.type === "desktop",
  },
  {
    key: "ai",
    label: "AI",
    icon: Brain,
    match: isAIProject,
  },
].map((t) => {
  const list = recentProjects.filter(t.match);
  return { ...t, count: list.length, hero: list.find((p) => p.image) };
});

type Spotlight = {
  name: string;
  tag: string;
  role: string;
  description: string;
  techs: string[];
  link: string;
  image: string;
};

const startups: Spotlight[] = [
  {
    name: "Kontak",
    tag: "Service Platform",
    role: "Contributor",
    description:
      "Contributed to the development of a home-services platform, including mobile applications for customers and service providers, web-based management interfaces, and backend services.\n\nImplemented features supporting service bookings, job tracking, payment workflows, and digital wallet functionality.\n\nContributed to the deployment and release of mobile applications for iOS and Android, supporting a live product with 50+ users.",
    techs: [],
    link: "https://kontak-app.com/",
    image: "/assets/projects/kontak_web.png",
  },
  {
    name: "Prezstige",
    tag: "Loyalty Platform",
    role: "CTO · March 2025",
    description:
      "A loyalty management platform helping MSMEs in the Philippines grow sales through digital and physical loyalty cards — paper, QR, and NFC — tailored for partner merchants.",
    techs: ["Next.js", "React Native", "Expo", "Supabase", "TypeScript", "TailwindCSS"],
    link: "https://prezstige.com/",
    image: "/assets/projects/prezstige_web.png",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
      {children}
    </h2>
  );
}

function Spotlight({ item }: { item: Spotlight }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">{item.name}</h3>
          <Badge variant="secondary" className="font-medium">
            {item.tag}
          </Badge>
        </div>
        <div className="max-w-prose space-y-3 text-sm leading-relaxed text-muted-foreground">
          {item.description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {item.techs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.techs.map((t) => (
              <Badge key={t} variant="outline" className="text-[11px] font-normal">
                {t}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between pt-2">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="gap-2">
              View Project <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
          <span className="text-xs text-muted-foreground">{item.role}</span>
        </div>
      </div>
      {item.image ? (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR}
            quality={90}
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-muted">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Smartphone className="h-4 w-4" />
            {item.name} preview coming soon
          </span>
        </div>
      )}
    </div>
  );
}

const typeIcon: Record<string, typeof Globe> = {
  web: Globe,
  mobile: Smartphone,
  desktop: Monitor,
};

function ProjectCard({
  project,
  sizes,
}: {
  project: (typeof recentProjects)[number];
  sizes: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const sentences = project.description.split(". ");
  const hasMore = sentences.length > 2 && project.description !== "n/a";
  const TypeIcon = typeIcon[project.type] ?? Globe;
  const hasLink = Boolean(project.link);
  const hasDescription = project.description && project.description !== "n/a";

  return (
    <div className="flex flex-col h-full">
      {project.image ? (
        <div className="relative aspect-video mb-4 overflow-hidden rounded-xl border border-border">
          <Image
            src={project.image}
            alt={`Preview of ${project.name}`}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-300 hover:scale-[1.03]"
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR}
            quality={90}
          />
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-foreground/85 px-2 py-1 text-[11px] font-medium text-background">
            <TypeIcon className="h-3.5 w-3.5" />
            <span className="capitalize">{project.type}</span>
          </span>
        </div>
      ) : (
        <div className="mb-4 flex aspect-video items-center justify-center rounded-xl border border-border bg-muted">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <TypeIcon className="h-4 w-4" />
            {project.name} preview coming soon
          </span>
        </div>
      )}
      <h3 className="mb-2 text-base font-semibold text-foreground">
        {project.name}
      </h3>
      {hasDescription ? (
        <p className="mb-4 flex-grow text-sm leading-relaxed text-muted-foreground">
          {sentences.slice(0, expanded ? undefined : 2).join(". ")}
          {hasMore && (
            <>
              .{" "}
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {expanded ? "See less" : "See more"}
              </button>
            </>
          )}
        </p>
      ) : (
        <p className="mb-4 flex-grow text-sm italic text-muted-foreground">
          Details being written up.
        </p>
      )}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="outline" className="text-[11px] font-normal">
            {tech}
          </Badge>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between">
        {hasLink ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            View Project <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <a
            href={`https://github.com/ddextroo?q=${encodeURIComponent(project.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Find on GitHub <ExternalLink className="h-4 w-4" />
          </a>
        )}
        {project.date && project.date !== "n/a" && (
          <span className="text-xs text-muted-foreground">{project.date}</span>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllStack, setShowAllStack] = useState(false);
  const { theme, setTheme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
    setIsPlaying(!v.paused);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.defaults({ ease: "power3.out" });

        // Focal moment: the claim assembles, then the demo video wipes in.
        const hero = gsap.timeline();
        hero
          .from("[data-hero='media']", {
            autoAlpha: 0,
            scale: 0.98,
            duration: 0.6,
          })
          .from(
            "[data-hero='claim']",
            { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.08 },
            "-=0.35"
          )
          .from(
            "[data-hero='cta'] > *",
            { autoAlpha: 0, y: 12, duration: 0.45, stagger: 0.07 },
            "-=0.3"
          );

        gsap.from("[data-hero='video']", {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.9,
          ease: "power4.out",
          clearProps: "clipPath",
          scrollTrigger: { trigger: "[data-hero='video']", start: "top 85%" },
        });

        // Quiet supporting reveals — distinct from the hero choreography.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 24,
            duration: 0.6,
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        // One list stagger, for the featured project cards (only when mounted).
        const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
        if (cards.length) {
          gsap.from(cards, {
            autoAlpha: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: { trigger: "[data-project-grid]", start: "top 82%" },
          });
        }

        // Signature moment: the range proof tiles rise in sequence.
        const tiles = gsap.utils.toArray<HTMLElement>("[data-proof-tile]");
        if (tiles.length) {
          gsap.from(tiles, {
            autoAlpha: 0,
            y: 28,
            scale: 0.97,
            duration: 0.55,
            stagger: 0.1,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: "[data-proof-grid]", start: "top 86%" },
          });
        }
      });

      // Reduced motion: keep content visible, drop spatial movement.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>(
          "[data-reveal], [data-hero='video'], [data-project-card], [data-proof-tile]"
        ).forEach((el) => gsap.set(el, { clearProps: "all" }));
      });
    },
    { scope: rootRef, dependencies: [] }
  );

  const themeSwitch = (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      {mounted && (
        <Switch
          checked={theme === "dark"}
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle dark mode"
        />
      )}
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  );

  const mainTech = (category: string, tech: string) =>
    (category === "Frontend" && tech === "React") ||
    (category === "Backend" && tech === "Laravel") ||
    (category === "Database" && tech === "PostgreSQL") ||
    (category === "Desktop" && tech === "Java Swing") ||
    (category === "AI & Machine Learning" &&
      ["Tensorflow", "Agentic AI", "Agno", "FastAPI", "Flask", "Ollama"].includes(
        tech
      )) ||
    (category === "Mobile" &&
      (tech === "Flutter" || tech === "Android" || tech === "React Native")) ||
    (category === "Developer Tools" &&
      ["Github", "VS Code", "AWS", "Claude"].includes(tech));

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-background text-foreground"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
      >
        Skip to content
      </a>
      <div
        id="main"
        className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-6"
      >
        {/* Top bar: identity + sections + theme */}
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/dlogo.png"
              alt="Dextrolio logo"
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
            <span className="text-sm font-semibold tracking-tight">
              dextrolio.tech
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <nav aria-label="Sections" className="hidden items-center gap-1 sm:flex">
              <a
                href="#projects"
                className="rounded-md px-2.5 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Work
              </a>
              <a
                href="#experience"
                className="rounded-md px-2.5 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Experience
              </a>
              <a
                href="#contact"
                className="rounded-md px-2.5 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </a>
            </nav>
            {themeSwitch}
          </div>
        </div>

        {/* Hero — makes the claim in the first viewport */}
        <section className="mb-14">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div data-hero="media" className="mb-6 flex items-center gap-4">
                <Image
                  src="/assets/me2.jpg"
                  alt="Dexter Inguito"
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] rounded-xl object-cover"
                  priority
                />
                <Image
                  src="/assets/verified.png"
                  alt=""
                  width={18}
                  height={18}
                  className="hidden"
                  aria-hidden
                />
              </div>

              <h1
                data-hero="claim"
                className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
              >
                Dexter G. Inguito
              </h1>
              <p
                data-hero="claim"
                className="mt-3 text-lg font-medium text-muted-foreground"
              >
                Software Engineer
              </p>
              <p
                data-hero="claim"
                className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
              >
                I ship full-stack products across{" "}
                <span className="font-semibold text-foreground">web</span>,{" "}
                <span className="font-semibold text-foreground">mobile</span>,{" "}
                <span className="font-semibold text-foreground">desktop</span>{" "}
                and{" "}
                <span className="font-semibold text-foreground">AI</span>.
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Cebu City, Cebu, Philippines
              </p>

              <div data-hero="cta" className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://m.me/dexter.inguito.7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="gap-2">
                    <Facebook className="h-4 w-4" /> Message me
                  </Button>
                </a>
                <a href="mailto:dexteringuito3@gmail.com">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" /> Send Email
                  </Button>
                </a>
                <a href={RESUME_HREF} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="ghost" className="gap-2 underline-offset-4 hover:underline">
                    <Download className="h-4 w-4" />
                    {RESUME_IS_PDF ? "Download Résumé" : "Full profile"}
                  </Button>
                </a>
              </div>
            </div>

            {/* Committed proof asset — kept prominent */}
            <div
              data-hero="video"
              className="relative w-full overflow-hidden rounded-2xl border border-border lg:max-w-md"
            >
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  poster="/assets/thumbnail.png"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src="/assets/vid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute bottom-3 right-3 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="gap-1.5 text-xs"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                  {isMuted ? "Unmute" : "Mute"}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="gap-1.5 text-xs"
                  onClick={toggleVideo}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What I ship — range proof + featured work */}
        <section id="projects" data-reveal className="mb-14">
          <div className="flex items-center justify-between">
            <SectionHeading>What I ship</SectionHeading>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div
            data-proof-grid
            className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          >
            {platformTiles.map(({ key, label, icon: Icon, count, hero }) => (
              <div
                key={key}
                data-proof-tile
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {hero?.image ? (
                    <Image
                      src={hero.image}
                      alt={`${label} project: ${hero.name}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR}
                      quality={80}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-foreground/85 px-2 py-0.5 text-[11px] font-medium text-background">
                    <Icon className="h-3 w-3" />
                    {label}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-2 px-3 py-2.5">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {hero?.name ?? label}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {count} shipped
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Tabs defaultValue="startup" className="mt-8 w-full">
            <TabsList className="mb-5">
              <TabsTrigger value="startup" className="data-[state=inactive]:text-foreground/75">
                Startup
              </TabsTrigger>
              <TabsTrigger value="capstone" className="data-[state=inactive]:text-foreground/75">
                Capstone
              </TabsTrigger>
              <TabsTrigger value="top" className="data-[state=inactive]:text-foreground/75">
                Top Projects
              </TabsTrigger>
            </TabsList>

            <TabsContent value="top">
              <div
                data-project-grid
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {recentProjects
                  .filter((p) => featuredProjectNames.includes(p.name))
                  .map((project, i) => (
                    <div data-project-card key={i}>
                      <ProjectCard
                        project={project}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="startup">
              <div className="space-y-8">
                {startups.map((s) => (
                  <Spotlight key={s.name} item={s} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="capstone">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">BarangMI</h3>
                    <Badge variant="secondary" className="font-medium">
                      Community Project
                    </Badge>
                  </div>
                  <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                    An AI-powered, multi-tenant platform that automates
                    administrative processes, improves transparency, and
                    strengthens citizen services within barangays.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["React", "Laravel", "PostgreSQL", "TypeScript", "Python", "Flask", "React Native"].map(
                      (t) => (
                        <Badge key={t} variant="outline" className="text-[11px] font-normal">
                          {t}
                        </Badge>
                      )
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <a
                      href="https://kalunasan.barangmi.systems"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="gap-2">
                        View Project <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                    <span className="text-xs text-muted-foreground">
                      Lead Developer · October 2025
                    </span>
                  </div>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
                  <Image
                    src="/assets/projects/barangmi_web.png"
                    alt="BarangMI"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    quality={90}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* About */}
        <section data-reveal className="mb-14">
          <SectionHeading>About</SectionHeading>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            I&rsquo;m a Software Engineer who builds practical applications that
            solve real-world problems across web, mobile, and AI-powered systems
            &mdash; from Laravel and Next.js backends to Flutter apps and agentic
            AI workflows. I&rsquo;m open to Software Engineer, Full-Stack, Mobile,
            and AI-focused roles (PH / remote) where I can contribute to a product
            and grow with a team that values knowledge sharing.
          </p>
        </section>

        {/* Experience + Education */}
        <section id="experience" data-reveal className="mb-14">
          <SectionHeading>Experience</SectionHeading>
          <ol className="mt-6 space-y-6">
            {experience.map((job, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-foreground ${
                      i === 0 ? "bg-foreground" : "bg-background"
                    }`}
                  />
                  {i < experience.length - 1 && (
                    <span className="mt-1 w-px flex-grow bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-[15px] font-semibold">{job.role}</h3>
                    <span className="text-xs text-muted-foreground">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {job.company}
                  </p>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {job.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Education
              </h3>
              <p className="mt-2 text-sm font-semibold">{education.role}</p>
              <p className="text-sm text-muted-foreground">{education.school}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {education.period} · {education.note}
              </p>
            </div>
            <div className="rounded-xl border border-border p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Achievements
              </h3>
              <ul className="mt-2 space-y-2">
                {achievements.map((a, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-semibold">{a.title}</span>
                    <span className="text-muted-foreground"> — {a.description}</span>
                    <span className="block text-xs text-muted-foreground">{a.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tech Stack — grouped, tiered, collapsible */}
        <section data-reveal className="mb-14">
          <div className="flex items-center justify-between">
            <SectionHeading>Tech Stack</SectionHeading>
            <button
              type="button"
              onClick={() => setShowAllStack((v) => !v)}
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {showAllStack ? "Show core only" : "Show all"}
            </button>
          </div>
          <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {techStack.map((category, index) => {
              const core = category.techs.filter((t) =>
                mainTech(category.category, t)
              );
              const rest = category.techs.filter(
                (t) => !mainTech(category.category, t)
              );
              return (
                <div key={index}>
                  <h3 className="mb-2 flex items-center justify-between text-sm font-semibold">
                    <span>{category.category}</span>
                    <span
                      aria-hidden="true"
                      className="text-xs font-normal text-muted-foreground"
                    >
                      {category.techs.length}
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {core.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-foreground text-[11px] font-semibold text-background"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {(showAllStack ? rest : []).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-[11px] font-normal"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials + Connect */}
        <section className="mb-8 grid gap-10 lg:grid-cols-2">
          <div data-reveal>
            <SectionHeading>What clients say</SectionHeading>
            <div className="relative mt-4 pr-2">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {testimonials.map((t, i) => (
                    <figure
                      key={i}
                      className="w-full flex-shrink-0"
                      aria-hidden={currentSlide !== i}
                    >
                      <blockquote className="text-[15px] leading-relaxed text-foreground">
                        “{t.text}”
                      </blockquote>
                      <figcaption className="mt-3 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {t.author}
                        </span>
                        , {t.role}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() =>
                    setCurrentSlide((p) =>
                      p === 0 ? testimonials.length - 1 : p - 1
                    )
                  }
                  className="rounded-full border border-border p-2 hover:bg-muted"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() =>
                    setCurrentSlide((p) =>
                      p === testimonials.length - 1 ? 0 : p + 1
                    )
                  }
                  className="rounded-full border border-border p-2 hover:bg-muted"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="ml-1 flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        currentSlide === i ? "bg-foreground" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div id="contact" data-reveal>
            <SectionHeading>Connect</SectionHeading>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://github.com/ddextroo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 py-6"
                >
                  <Github className="h-5 w-5" /> Follow on GitHub
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/in/dexter-inguito-b039a827b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 py-6"
                >
                  <Linkedin className="h-5 w-5" /> Connect on LinkedIn
                </Button>
              </a>
              <a
                href="https://www.facebook.com/dexter.inguito.7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 py-6"
                >
                  <Facebook className="h-5 w-5" /> Find me on Facebook
                </Button>
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            Built with Next.js · Open to full-stack roles (PH / remote).{" "}
            <a
              href="mailto:dexteringuito3@gmail.com"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              dexteringuito3@gmail.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
