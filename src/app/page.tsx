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
  Briefcase,
  Users,
  Facebook,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { recentProjects } from "@/dto/projects.dto";
import { techStack } from "@/dto/tech_stack.dto";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
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
      <div className="max-w-6xl mx-auto px-10 lg:px-20 py-8 bg-background transition-colors duration-200">
        {/* Extracted Personal Info Section */}
        <div className="col-span-full md:col-span-2 lg:col-span-3 bg-card rounded-lg py-4 mb-6">
          <div className="flex justify-end mb-2">{themeSwitch}</div>
          <div className="flex flex-col md:flex-row items-center justify-between px-4">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/assets/me.jpg"
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-lg mr-6"
              />
              <div>
                <h1 className="text-2xl font-bold mb-2 text-foreground">
                  Dexter G. Inguito
                </h1>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    Student
                  </Badge>
                  <span className="text-muted-foreground">&</span>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    Freelancer
                  </Badge>
                </div>
                <div className="flex flex-col text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <p className="text-xs">Mandaue City</p>
                  </div>
                  <p className="text-xs ml-6">Cebu, Philippines 6014</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="https://m.me/dexter.inguito.7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="default"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 text-sm font-medium"
                >
                  <Facebook className="mr-2 h-4 w-4" /> Message me
                </Button>
              </a>
              <a href="mailto:dexteringuito3@gmail.com">
                <Button
                  variant="outline"
                  className="text-primary hover:bg-primary/10 px-6 py-2 text-sm font-medium"
                >
                  <Mail className="mr-2 h-4 w-4" /> Send Email
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="mr-2 h-4 w-4" />
                      Unmute Intro
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 h-4 w-4" />
                      Mute Intro
                    </>
                  )}
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
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
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>About Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
              <CardTitle className="text-xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Tech Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {techStack.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-2 text-xs text-foreground">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.techs.map((tech) => {
                        const isMainTech =
                          (category.category === "Frontend" &&
                            tech === "React") ||
                          (category.category === "Backend" &&
                            tech === "Laravel") ||
                          (category.category === "Database" &&
                            tech === "PostgreSQL") ||
                          (category.category === "Desktop" &&
                            tech === "Java Swing") ||
                          (category.category === "AI & Machine Learning" &&
                            tech === "Tensorflow") ||
                          (category.category === "Developer Tools" &&
                            (tech === "Github" || tech === "VS Code"));

                        return (
                          <Badge
                            key={tech}
                            variant="outline"
                            className={`transition-colors duration-200 text-xs ${
                              isMainTech
                                ? "dark:bg-primary/20 dark:border-primary dark:text-primary bg-primary text-primary-foreground font-semibold"
                                : ""
                            }`}
                          >
                            {tech}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Card */}
          <Card className="col-span-full md:col-span-1 lg:col-span-1 bg-card border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-foreground flex items-center">
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
                      <div
                        className={`w-3 h-3 border-2 border-primary rounded-full ${
                          index === 0 ? "bg-primary" : "bg-card"
                        }`}
                      ></div>
                      {index !== 2 && (
                        <div className="w-0.5 h-full bg-primary mt-1"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xs text-foreground">
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

          {/* Achievements Card */}
          <Card className="col-span-full md:col-span-1 bg-card border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "1st Place",
                    description: "Product Innovation and Research Summit",
                    date: "December 13, 2024",
                  },
                  {
                    title: "2nd Runner Up",
                    description: "Hack4Gov 3",
                    date: "July 21, 2024",
                  },
                ].map((achievement, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={`w-3 h-3 border-2 border-primary rounded-full ${
                          index === 0 ? "bg-primary" : "bg-card"
                        }`}
                      ></div>
                      {index !== 2 && (
                        <div className="w-0.5 h-full bg-primary mt-1"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xs text-foreground">
                        {achievement.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-primary">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Freelancing Stats Card */}
          <Card className="col-span-full md:col-span-1 bg-card border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Freelancing
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-around">
              <div className="text-center flex flex-col items-center">
                <Users className="w-8 h-8 mb-2 text-primary" />
                <p className="text-3xl font-bold mb-2 text-primary">30+</p>
                <p className="text-base text-muted-foreground">
                  Satisfied Clients
                </p>
              </div>
              <div className="text-center flex flex-col items-center">
                <Briefcase className="w-8 h-8 mb-2 text-primary" />
                <p className="text-3xl font-bold mb-2 text-primary">50+</p>
                <p className="text-base text-muted-foreground">Projects Made</p>
              </div>
            </CardContent>
          </Card>

          {/* top Projects Card */}
          <Card className="col-span-full bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Top Projects
              </CardTitle>
              <Button variant="link" className="text-primary text-sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                            onClick={() =>
                              setShowFullDescription(!showFullDescription)
                            }
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
            </CardContent>
          </Card>

          {/* Testimonials Card */}
          <Card className="col-span-full md:col-span-1 bg-card border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Testimonials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 border-primary pl-4 italic text-sm text-muted-foreground">
                "Dexter has been a great help throughout our research. His
                skills and talent in app developing really help us through. He's
                been very patient, hands-on, and active on his work. The quality
                of work is excellent, highly recommended!"
                <footer className="text-right mt-2 text-primary text-xs">
                  - Ellen Rose G. Sodoso, Bachelor of Secondary Education major
                  in Science (BSEd Science)
                </footer>
              </blockquote>
            </CardContent>
          </Card>

          {/* Connect Card */}
          <Card className="col-span-full md:col-span-1 bg-card border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-foreground flex items-center">
                <span className="w-1 h-8 bg-primary mr-3"></span>Connect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com/ddextroo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full text-primary hover:bg-primary/10"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </a>
                <a
                  href="https://www.linkedin.com/in/dexter-inguito-b039a827b/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full text-primary hover:bg-primary/10"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>
                <a
                  href="https://www.facebook.com/dexter.inguito.7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full text-primary hover:bg-primary/10"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
