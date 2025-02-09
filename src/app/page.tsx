"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ThemeProvider } from "next-themes";
import {
  Calendar,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Play,
  Pause,
  ChevronRight,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Monitor,
  Volume2,
  VolumeX,
  MapPin,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { recentProjects } from "@/dto/projects.dto";
import { techStack } from "@/dto/tech_stack.dto";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.log("Video play failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const themeSwitch = (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      {mounted && (
        <Switch
          checked={theme === "dark"}
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      )}
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-background transition-colors duration-200">
        {/* Extracted Personal Info Section */}
        <div className="col-span-full md:col-span-2 lg:col-span-3 bg-card rounded-lg py-6 mb-6">
          <div className="flex justify-end mb-4">{themeSwitch}</div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/assets/me.jpg"
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-lg mr-6 "
              />
              <div>
                <h1 className="text-3xl font-bold mb-2 text-foreground">
                  Dexter G. Inguito
                </h1>
                <p className="text-lg text-primary">Student x Freelancer</p>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-5 w-5" />
                  <p className="text-sm">Mandaue, Cebu, Philippines</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                variant="default"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Calendar className="mr-2 h-4 w-4" /> Schedule a Call
              </Button>
              <Button
                variant="outline"
                className="text-primary hover:bg-primary/10"
              >
                <Mail className="mr-2 h-4 w-4" /> Send Email
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Video Intro Card */}
          <Card className="col-span-full lg:col-span-2 bg-card border border-border overflow-hidden">
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/placeholder.svg?height=720&width=1280"
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/assets/vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="mr-2 h-4 w-4" />
                      Unmute
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 h-4 w-4" />
                      Mute
                    </>
                  )}
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={toggleVideo}
                >
                  {isPlaying ? (
                    <Pause className="mr-2 h-4 w-4" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  {isPlaying ? "Pause" : "Play"} Intro
                </Button>
              </div>
            </div>
          </Card>

          {/* About Card */}
          <Card className="col-span-full lg:col-span-1 bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>About Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                I'm a self-taught developer with five years of experience in app
                development, freelancing, and startup innovation. Passionate
                about coding and problem-solving, I stay ahead of industry
                trends by continuously adapting to emerging technologies. My
                expertise spans full-stack development, mobile and web
                applications, and scalable solutions that drive efficiency and
                innovation.
                <br />
                <br />
                Throughout my journey, I have led a team to build a startup app,
                enhancing my skills in development, leadership, and
                collaboration. This experience has deepened my understanding of
                product development and user experience. Driven by curiosity and
                a commitment to excellence, I strive to push the boundaries of
                technology while working toward becoming a senior developer.
              </p>
            </CardContent>
          </Card>

          {/* Tech Stack Card */}
          <Card className="col-span-full md:col-span-1 bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Tech Stack
              </CardTitle>
              <Button variant="link" className="text-primary">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {techStack.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-2 text-sm text-foreground">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.techs.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="transition-colors duration-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Card */}
          <Card className="col-span-full md:col-span-1 lg:col-span-1 bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    role: "Mobile App Developer and Web Developer",
                    company: "Freelancer",
                    period: "2020 - Present",
                  },
                  {
                    role: "Full Stack Developer",
                    company: "Ultima Reviewer",
                    period: "2021 - 2024",
                  },
                  {
                    role: "Product Lead Developer",
                    company: "Unirises",
                    period: "2020 - 2021",
                  },
                ].map((job, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 border-2 border-primary rounded-full bg-card"></div>
                      {index !== 2 && (
                        <div className="w-0.5 h-full bg-primary mt-1"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-foreground">
                        {job.role}
                      </h3>
                      <p className="text-xs text-primary">{job.company}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects Card */}
          <Card className="col-span-full bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Recent Projects
              </CardTitle>
              <Button variant="link" className="text-primary">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map((project, index) => (
                  <div key={index} className="flex flex-col h-full">
                    <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={`Preview of ${project.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-105"
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
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <Link
                        href={project.link}
                        className="text-primary hover:underline flex items-center text-sm"
                      >
                        View Project <ExternalLink className="ml-1 h-4 w-4" />
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {project.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Freelancing Stats Card */}
          <Card className="col-span-full md:col-span-1 bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center justify-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Freelancing
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl font-bold mb-2 text-primary">30+</p>
                <p className="text-xl text-muted-foreground">
                  Satisfied Clients
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials Card */}
          <Card className="col-span-full md:col-span-1 bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Testimonials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                "Your Name is an exceptional developer across web, mobile, and
                desktop platforms. Their work consistently exceeds expectations,
                delivering innovative solutions that drive real business value."
                <footer className="text-right mt-2 text-primary">
                  - Sarah Johnson, CTO at TechForward
                </footer>
              </blockquote>
            </CardContent>
          </Card>

          {/* Connect Card */}
          <Card className="col-span-full md:col-span-1 bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center justify-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Connect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-4">
                {[Github, Linkedin, Twitter].map((Icon, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="rounded-full text-primary hover:bg-primary/10"
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
