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
    <main className="flex flex-col items-center gap-12 sm:gap-20 py-10 sm:py-24 px-4 sm:px-8 w-full max-w-screen-xl mx-auto">
      {/* Hero Section */}
      <section className="text-center w-full max-w-4xl">
        <h1 className="gradient-title text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          Find Your Dream Job And Get Hired
        </h1>
        <p className="text-gray-400 mt-4 text-sm sm:text-lg max-w-xl mx-auto">
          Explore thousands of job listings or find the perfect candidate.
        </p>
      </section>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
        <Link to="/Jobs">
          <Button
            variant="blue"
            size="xl"
            className="px-8 py-4 text-base sm:text-lg font-semibold"
          >
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button
            variant="destructive"
            size="xl"
            className="px-8 py-4 text-base sm:text-lg font-semibold"
          >
            Post Jobs
          </Button>
        </Link>
      </div>

      {/* Companies Carousel */}
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
        <CarouselContent className="flex items-center gap-10 sm:gap-20">
          {companies.map(({ name, id, path }) => (
            <CarouselItem
              key={id}
              className="basis-1/3 sm:basis-1/6 flex items-center justify-center"
            >
              <img
                src={path}
                alt={name}
                className="h-8 sm:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Banner Image */}
      <img
        src="/banner.jpg"
        className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
        alt="Banner"
      />

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-bold text-lg text-blue-600">
              For Job Seekers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-500 text-sm sm:text-base">
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-bold text-lg text-blue-600">
              For Employers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-500 text-sm sm:text-base">
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="w-full mt-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-blue-500 mb-6">
          Frequently Asked Questions
        </h2>
        <Accordion type="multiple" className="w-full space-y-4">
          {faq.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="border rounded-lg shadow-sm"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-medium text-gray-700 px-4 py-3 hover:bg-gray-50 transition">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 px-4 pb-4">
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
