"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Globe,
  Smartphone,
  Monitor,
  ArrowLeft,
} from "lucide-react";
import { recentProjects } from "@/dto/projects.dto";

const Projects = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Group projects by type
  const groupedProjects = recentProjects.reduce((acc, project) => {
    if (!acc[project.type]) {
      acc[project.type] = [];
    }
    acc[project.type].push(project);
    return acc;
  }, {} as Record<string, typeof recentProjects>);

  const ProjectGrid = ({ projects }: { projects: typeof recentProjects }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project, index) => (
        <div key={index} className="flex flex-col h-full">
          <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={`Preview of ${project.name}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR4SEhwYHDIYGDIdHRkyLR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              quality={90}
            />
            <div className="absolute top-2 right-2">
              {project.type === "web" && (
                <Globe className="h-6 w-6 text-background bg-primary rounded-full p-1" />
              )}
              {project.type === "mobile" && (
                <Smartphone className="h-6 w-6 text-background bg-primary rounded-full p-1" />
              )}
              {project.type === "desktop" && (
                <Monitor className="h-6 w-6 text-background bg-primary rounded-full p-1" />
              )}
            </div>
          </div>
          <h3 className="font-semibold text-base text-foreground mb-2">
            {project.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-4 flex-grow">
            {project.description
              .split(". ")
              .slice(0, showFullDescription ? undefined : 2)
              .join(". ")}
            {project.description.split(". ").length > 2 && (
              <>
                .{" "}
                <button
                  className="text-primary hover:underline"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "See less" : "See more"}
                </button>
              </>
            )}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between mt-auto">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center text-xs"
            >
              View Project <ExternalLink className="ml-1 h-4 w-4" />
            </a>
            <span className="text-xs text-muted-foreground">
              {project.date}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  // Add this function to get filtered projects
  const getFilteredProjects = () => {
    if (activeFilter === "all") {
      return Object.values(groupedProjects).flat();
    }
    return groupedProjects[activeFilter] || [];
  };

  return (
    <div className="max-w-6xl mx-auto px-10 lg:px-20 py-8 bg-background transition-colors duration-200">
      {/* Back Button */}
      <Link href="/" className="inline-block mb-6">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      {/* Filter Badges */}
      <div className="flex gap-2 mb-6">
        {["all", "web", "mobile", "desktop"].map((filter) => (
          <Badge
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            className="cursor-pointer capitalize"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>

      {/* Conditional Rendering based on filter */}
      {activeFilter === "all" ? (
        <>
          {/* Web Projects */}
          {groupedProjects["web"]?.length > 0 && (
            <Card className="mb-8 bg-card border border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-foreground flex items-center">
                  <span className="w-1 h-8 bg-primary mr-3"></span>
                  <span className="bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
                    Web Projects
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectGrid projects={groupedProjects["web"]} />
              </CardContent>
            </Card>
          )}

          {/* Mobile Projects */}
          {groupedProjects["mobile"]?.length > 0 && (
            <Card className="mb-8 bg-card border border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-foreground flex items-center">
                  <span className="w-1 h-8 bg-primary mr-3"></span>
                  <span className="bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
                    Mobile Projects
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectGrid projects={groupedProjects["mobile"]} />
              </CardContent>
            </Card>
          )}

          {/* Desktop Projects */}
          {groupedProjects["desktop"]?.length > 0 && (
            <Card className="bg-card border border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-foreground flex items-center">
                  <span className="w-1 h-8 bg-primary mr-3"></span>
                  <span className="bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
                    Desktop Projects
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectGrid projects={groupedProjects["desktop"]} />
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card className="bg-card border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-foreground flex items-center">
              <span className="w-1 h-8 bg-primary mr-3"></span>
              <span className="bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
                {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}{" "}
                Projects
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectGrid projects={getFilteredProjects()} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Projects;
