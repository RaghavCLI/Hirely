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
import { RetroGrid } from "../components/ui/retro-grid";
import { TypingAnimation } from "../components/ui/typing-animation";

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
const HERO_ANIMATION_CONFIG = {
  slideIn: "animate-in slide-in-from-bottom duration-1000",
  zoomIn: "animate-in zoom-in duration-700",
  fadeIn: "animate-in fade-in duration-1000 delay-300",
  fadeInDelayed: "animate-in fade-in duration-1000 delay-500",
};

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
    {/* Dark Horizon Glow Background */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
      }}
      aria-hidden="true"
    />

    {/* RetroGrid Background */}
    <RetroGrid
      className="z-[1]"
      angle={65}
      cellSize={60}
      opacity={0.7}
      lightLineColor="#3B82F6"
      darkLineColor="#3B82F6"
    />

    {/* Hero Content */}
    <div
      className={`relative z-10 flex flex-col items-center gap-4 py-5 sm:py-8 px-4 sm:px-8 w-full max-w-screen-xl mx-auto ${HERO_ANIMATION_CONFIG.slideIn}`}
    >
      <div className="text-center w-full max-w-6xl space-y-6">
        <div className={`inline-block ${HERO_ANIMATION_CONFIG.zoomIn}`}>
          <h1 className="font-inter-display gradient-title text-5xl md:text-7xl font-bold tracking-tight leading-tight mt-16 break-words w-full max-w-[92vw] md:max-w-[1200px] px-2 mx-auto">
            Find Your Dream Job And Get Hired
          </h1>
        </div>
        <TypingAnimation
          className={`text-gray-300 mt-4 text-xl text-opacity-60 tracking-normal max-w-2xl mx-auto font-normal ${HERO_ANIMATION_CONFIG.fadeIn}`}
          duration={50}
          delay={1500}
          startOnView={false}
          as="h2"
        >
          Explore thousands of job listings or find the perfect candidate.
        </TypingAnimation>
      </div>

      {/* CTA Buttons */}
      <div
        className={`flex flex-col sm:flex-row gap-3 sm:gap-6 items-center mt-8 ${HERO_ANIMATION_CONFIG.fadeInDelayed}`}
      >
        <Link to="/Jobs" aria-label="Browse available jobs">
          <CustomButton
            variant="outline"
            size="lg"
            className="shadow-2xl h-12 px-8 text-lg leading-none transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Find Jobs
          </CustomButton>
        </Link>
        <Link to="/post-job" aria-label="Post a new job">
          <CustomButton
            variant="magic"
            size="lg"
            className="shadow-2xl h-12 px-8 text-lg leading-none transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Post Jobs
          </CustomButton>
        </Link>
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
