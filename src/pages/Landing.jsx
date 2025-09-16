import { Button } from "../components/ui/button";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../components/ui/card";
import faq from "../data/faq.json";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import { TypingAnimation } from "../components/ui/typing-animation";
import { Badge } from "../components/ui/badge";
import { Zap, ArrowRight, Briefcase, Plus } from "lucide-react";

// Custom Button Component
const CustomButton = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    // Clean border style for Find Jobs
    outline:
      "shadow-[inset_0_0_0_2px_#60A5FA] text-white bg-transparent hover:bg-[#60A5FA] hover:text-black hover:shadow-lg tracking-widest uppercase focus:ring-blue-400",

    // Magical spinning border for Post Jobs
    magic: "relative inline-flex overflow-hidden focus:ring-blue-400",

    // Gradient style
    gradient:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl focus:ring-blue-400",
  };

  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
    xl: "px-16 py-5 text-xl",
  };

  const shapes = {
    outline: "rounded-full",
    magic: "rounded-full p-[0.1px]",
    gradient: "rounded-lg",
  };

  if (variant === "magic") {
    return (
      <button
        className={`inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${sizes[size]} ${className}`}
        {...props}
      >
        <span className="relative text-white font-semibold tracking-wide">
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${shapes[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Constants for better maintainability
const CAROUSEL_CONFIG = {
  autoplay: { delay: 2000 },
  itemsConfig: {
    mobile: "basis-1/3",
    desktop: "sm:basis-1/6",
  },
};

// Hero Section Component
const HeroSection = () => (
  <section
    className="min-h-screen w-full relative flex items-start justify-center pt-20"
    aria-label="Hero section"
  >
    {/* Hero Content */}
    <div className="relative z-10 flex flex-col items-center gap-4 py-5 sm:py-8 px-4 sm:px-8 w-full max-w-screen-xl mx-auto">
      <div className="text-center w-full max-w-6xl space-y-6">
        {/* Recruiters Button */}
        <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center">
          <a
            href="https://github.com/RaghavCLI/Hirely"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Badge
              variant="secondary"
              className="gap-2 py-2 px-3 sm:px-4 text-xs sm:text-sm rounded-full shadow-lg backdrop-blur-md transition-all duration-300 border bg-black/40 border-white/20 text-white hover:bg-black/50"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="font-medium">5+ New Patterns</span>
              <Zap className="h-3 w-3 text-orange-500" />
              <span className="hidden sm:inline-flex items-center">
                Read More
              </span>
              <ArrowRight className="h-3 w-3" />
            </Badge>
          </a>
        </div>

        <div className="inline-block">
          <h1 className="font-inter-display gradient-title text-5xl md:text-7xl font-bold tracking-tight leading-tight mt-0 break-words w-full max-w-[92vw] md:max-w-[1200px] px-2 mx-auto">
            Find Your Dream Job <br /> <div className="mt-5">And Get Hired</div>
          </h1>
        </div>
        <TypingAnimation
          className="text-gray-300 mt-4 text-xl text-opacity-60 tracking-normal max-w-2xl mx-auto font-normal"
          duration={50}
          delay={1500}
          startOnView={false}
          as="h2"
        >
          Explore thousands of job listings or find the perfect candidate.
        </TypingAnimation>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
        <Button
          size="lg"
          className="cursor-pointer gap-2 px-4 sm:px-8 py-3 text-sm sm:text-base font-medium shadow-lg transition-all duration-300 flex-1 sm:flex-none bg-white text-black hover:bg-gray-100"
          asChild
        >
          <Link to="/Jobs" aria-label="Browse available jobs">
            <Briefcase className="h-4 sm:h-5 w-4 sm:w-5" />
            Find Jobs
          </Link>
        </Button>
        <Button
          size="lg"
          className="cursor-pointer gap-2 px-4 sm:px-8 py-3 text-sm sm:text-base font-medium shadow-lg transition-all duration-300 flex-1 sm:flex-none bg-slate-950 text-white hover:bg-slate-900"
          asChild
        >
          <Link to="/post-job" aria-label="Post a new job">
            <Plus className="h-4 sm:h-5 w-4 sm:w-5" />
            Post Jobs
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

// Companies Carousel Component
const CompaniesCarousel = () => {
  const autoplayPlugin = useMemo(() => Autoplay(CAROUSEL_CONFIG.autoplay), []);

  return (
    <div className="w-full py-10 bg-gradient-to-b from-transparent">
      <Carousel plugins={[autoplayPlugin]} className="w-full">
        <CarouselContent className="flex items-center gap-10 sm:gap-20">
          {companies.map(({ name, id, path }) => (
            <CarouselItem
              key={id}
              className={`${CAROUSEL_CONFIG.itemsConfig.mobile} ${CAROUSEL_CONFIG.itemsConfig.desktop} flex items-center justify-center`}
            >
              <img
                src={path}
                alt={`${name} company logo`}
                className="h-8 sm:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                loading="lazy"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="hidden sm:flex"
          aria-label="Previous company"
        />
        <CarouselNext className="hidden sm:flex" aria-label="Next company" />
      </Carousel>
    </div>
  );
};

// Feature Cards Component
const FeatureCards = () => {
  const features = [
    {
      title: "For Job Seekers",
      description: "Search and apply for jobs, track applications, and more.",
      id: "job-seekers",
    },
    {
      title: "For Employers",
      description:
        "Post jobs, manage applications, and find the best candidates.",
      id: "employers",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {features.map(({ title, description, id }) => (
        <Card
          key={id}
          className="hover:shadow-xl transition-all duration-300 hover:shadow-primary/10 group"
        >
          <CardHeader>
            <CardTitle className="font-bold text-lg text-blue-600 group-hover:text-blue-500 transition-colors">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm sm:text-base">
            {description}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// FAQ Section Component
const FAQSection = () => (
  <section
    className="w-full bg-white dark:bg-gray-950"
    aria-label="Frequently Asked Questions"
  >
    <div className="flex flex-col items-center gap-12 py-10 sm:py-24 px-4 sm:px-8 w-full max-w-screen-xl mx-auto">
      <div className="w-full space-y-6">
        <h2 className="headline-glow text-2xl sm:text-3xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 mb-6">
          Frequently Asked Questions
        </h2>
        <Accordion type="multiple" className="w-full space-y-4">
          {faq.map((faqItem, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`item-${index + 1}`}
              className="border rounded-lg shadow-sm data-[state=open]:shadow-md transition-shadow duration-200"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-medium text-primary px-4 py-3 hover:bg-primary/5 transition-colors">
                {faqItem.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground px-4 pb-4">
                {faqItem.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

function LandingPage() {
  return (
    <main className="w-full" role="main">
      {/* PART 1: Hero Section */}
      <HeroSection />

      {/* PART 2: Companies, Banner, and Features */}
      <section
        className="w-full bg-white dark:bg-gray-950"
        aria-label="Companies and features"
      >
        <div className="flex flex-col items-center gap-12 sm:gap-20 py-10 sm:py-24 px-4 sm:px-8 w-full max-w-screen-xl mx-auto">
          {/* Companies Carousel */}
          <CompaniesCarousel />

          {/* Banner Image */}
          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl z-10">
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"
              aria-hidden="true"
            />
            <img
              src="/banner.jpg"
              className="w-full max-h-[400px] object-cover scale-105 hover:scale-100 transition-transform duration-700"
              alt="Company banner showcasing our job platform"
              loading="lazy"
            />
          </div>

          {/* Feature Cards */}
          <FeatureCards />
        </div>
      </section>

      {/* PART 3: FAQ Section */}
      <FAQSection />
    </main>
  );
}

export default LandingPage;
