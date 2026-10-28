"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Globe,
  Smartphone,
  Monitor,
  ArrowLeft,
} from "lucide-react";
import { recentProjects } from "@/dto/projects.dto";

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR4SEhwYHDIYGDIdHRkyLR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

const typeIcon: Record<string, typeof Globe> = {
  web: Globe,
  mobile: Smartphone,
  desktop: Monitor,
};

type Project = (typeof recentProjects)[number];

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const sentences = project.description.split(". ");
  const hasMore = sentences.length > 2 && project.description !== "n/a";
  const hasLink = Boolean(project.link);
  const hasDescription = project.description && project.description !== "n/a";
  const TypeIcon = typeIcon[project.type] ?? Globe;

  return (
    <div className="flex flex-col h-full">
      {project.image ? (
        <div className="relative aspect-video mb-4 overflow-hidden rounded-xl border border-border">
          <Image
            src={project.image}
            alt={`Preview of ${project.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
      {children}
    </h2>
  );
}

const Grid = ({ projects }: { projects: Project[] }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {projects.map((project, index) => (
      <ProjectCard key={project.name + index} project={project} />
    ))}
  </div>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const grouped = recentProjects.reduce((acc, project) => {
    (acc[project.type] ||= []).push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  const filters = ["all", "web", "mobile", "desktop"];
  const shown =
    activeFilter === "all"
      ? null
      : grouped[activeFilter] ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-6">
        <Link href="/" className="mb-6 inline-block">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="mb-6 text-3xl font-bold tracking-tight">Projects</h1>

        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by platform">
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${
                  active
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {shown === null ? (
          <div className="space-y-12">
            {(["web", "mobile", "desktop"] as const).map(
              (type) =>
                grouped[type]?.length > 0 && (
                  <section key={type}>
                    <GroupHeading>
                      {type.charAt(0).toUpperCase() + type.slice(1)} Projects
                    </GroupHeading>
                    <Grid projects={grouped[type]} />
                  </section>
                )
            )}
          </div>
        ) : shown.length > 0 ? (
          <Grid projects={shown} />
        ) : (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-sm text-muted-foreground">
              No {activeFilter} projects here yet.{" "}
              <a
                href="https://github.com/ddextroo"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Browse everything on GitHub
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
