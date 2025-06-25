import { Button } from "../components/ui/button";
import React from "react";
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

function LandingPage() {
  return (
    <main className="flex flex-col items-center gap-12 sm:gap-20 py-10 sm:py-24 px-4 sm:px-8 w-full max-w-screen-xl mx-auto animate-in slide-in-from-bottom duration-1000">
      {/* Hero Section */}
      <section className="text-center w-full max-w-4xl space-y-6">
        <div className="inline-block animate-in zoom-in duration-700">
          <h1 className="gradient-title text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Find Your Dream Job And Get Hired
          </h1>
        </div>
        <p className="text-muted-foreground mt-4 text-sm sm:text-lg max-w-xl mx-auto animate-in fade-in duration-1000 delay-300">
          Explore thousands of job listings or find the perfect candidate.
        </p>
      </section>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center animate-in fade-in duration-1000 delay-500">
        <Link to="/Jobs">
          <Button
            variant="blue"
            size="xl"
            className="px-8 py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button
            variant="destructive"
            size="xl"
            className="px-8 py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300"
          >
            Post Jobs
          </Button>
        </Link>
      </div>

      {/* Companies Carousel */}
      <div className="w-full py-10 bg-gradient-to-b from-transparent to-primary/5 rounded-3xl">
        <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full">
          <CarouselContent className="flex items-center gap-10 sm:gap-20">
            {companies.map(({ name, id, path }) => (
              <CarouselItem
                key={id}
                className="basis-1/3 sm:basis-1/6 flex items-center justify-center"
              >
                <img
                  src={path}
                  alt={name}
                  className="h-8 sm:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>

      {/* Banner Image with gradient overlay */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
        <img
          src="/banner.jpg"
          className="w-full max-h-[400px] object-cover scale-105 hover:scale-100 transition-transform duration-700"
          alt="Banner"
        />
      </div>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card className="hover:shadow-xl transition-all duration-300 hover:shadow-primary/10 group">
          <CardHeader>
            <CardTitle className="font-bold text-lg text-blue-600 group-hover:text-blue-500 transition-colors">
              For Job Seekers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm sm:text-base">
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-all duration-300 hover:shadow-primary/10 group">
          <CardHeader>
            <CardTitle className="font-bold text-lg text-blue-600 group-hover:text-blue-500 transition-colors">
              For Employers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm sm:text-base">
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="w-full mt-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 mb-6">
          Frequently Asked Questions
        </h2>
        <Accordion type="multiple" className="w-full space-y-4">
          {faq.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="border rounded-lg shadow-sm data-[state=open]:shadow-md transition-shadow duration-200"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-medium text-primary px-4 py-3 hover:bg-primary/5 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground px-4 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}

export default LandingPage;
