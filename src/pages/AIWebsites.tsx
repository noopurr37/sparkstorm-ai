import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Zap, Search, Shield, Paintbrush, BarChart3, CalendarDays, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-7 h-7 text-yellow-600" />,
    title: "AI-Powered Design",
    description: "Intelligent layouts and content generation that adapt to your brand, audience, and goals.",
  },
  {
    icon: <Search className="w-7 h-7 text-green-600" />,
    title: "SEO Optimized",
    description: "Built-in AI SEO analysis ensuring your website ranks higher and reaches the right audience.",
  },
  {
    icon: <Shield className="w-7 h-7 text-blue-600" />,
    title: "Secure & Fast",
    description: "Enterprise-grade security with lightning-fast performance and 99.9% uptime guarantee.",
  },
  {
    icon: <Paintbrush className="w-7 h-7 text-purple-600" />,
    title: "Custom Branding",
    description: "Pixel-perfect designs that capture your brand identity with AI-assisted creative direction.",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-orange-600" />,
    title: "Analytics & Insights",
    description: "AI-driven analytics dashboard with visitor behavior insights and conversion optimization.",
  },
  {
    icon: <Globe className="w-7 h-7 text-teal-600" />,
    title: "Multi-Language",
    description: "Automatic AI translation and localization to reach global audiences effortlessly.",
  },
];

const packages = [
  {
    name: "Starter",
    description: "Perfect for small businesses and personal brands",
    features: ["Up to 5 pages", "Mobile responsive", "Basic SEO", "Contact form", "1 revision round"],
  },
  {
    name: "Professional",
    description: "For growing businesses that need more functionality",
    features: ["Up to 15 pages", "AI chatbot integration", "Advanced SEO", "CMS integration", "Analytics dashboard", "3 revision rounds"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Full-scale web solutions with AI capabilities",
    features: ["Unlimited pages", "Custom AI features", "E-commerce ready", "Multi-language support", "Priority support", "Ongoing maintenance"],
  },
];

const AIWebsites = () => {
  const handleBookDemo = () => {
    window.open("https://cal.com/noopurr/sparkstormai", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>AI Websites | SparkStorm AI</title>
        <meta name="description" content="AI-powered website development by SparkStorm AI — beautiful, fast, and intelligent websites built with cutting-edge AI technology." />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-3 px-4 py-1.5 bg-blue-50 rounded-full">
            <p className="text-xs sm:text-sm font-medium text-blue-600">AI-Powered Web Development</p>
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            AI Websites by SparkStorm AI
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            We build intelligent, high-performance websites that leverage AI for design, 
            content, SEO, and user engagement — taking your online presence to the next level.
          </p>
        </div>

        {/* CTA Banner */}
        <div className="mb-16 rounded-2xl bg-gradient-primary p-8 text-white shadow-lg flex flex-col md:flex-row items-center">
          <div className="md:w-2/3">
            <h2 className="mb-4 text-3xl font-bold">Websites That Think for Your Business</h2>
            <p className="mb-6 text-lg">
              From AI-generated content to intelligent user experiences, our websites 
              don't just look great — they work smarter to grow your business.
            </p>
            <Button
              onClick={handleBookDemo}
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 flex items-center"
            >
              <CalendarDays className="mr-2 h-5 w-5" /> Get a Free Consultation
            </Button>
          </div>
        </div>

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">AI-Powered Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Website Packages</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`overflow-hidden transition-shadow hover:shadow-lg ${
                  pkg.highlighted ? "border-2 border-blue-500 relative" : ""
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center text-xs py-1 font-medium">
                    Most Popular
                  </div>
                )}
                <CardContent className={`p-6 ${pkg.highlighted ? "pt-10" : ""}`}>
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={handleBookDemo}
                    variant={pkg.highlighted ? "default" : "outline"}
                    className="w-full"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your AI-Powered Website?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Let's discuss your project and create a website that drives results for your business.
          </p>
          <Button onClick={handleBookDemo} size="lg" className="flex items-center mx-auto">
            <CalendarDays className="mr-2 h-5 w-5" /> Schedule a Call
          </Button>
        </section>
      </main>
    </div>
  );
};

export default AIWebsites;
