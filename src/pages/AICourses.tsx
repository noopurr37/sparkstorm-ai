import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, CalendarDays, ArrowRight, Sparkles, Star } from "lucide-react";

const AICourses = () => {
  const handleBookDemo = () => {
    window.open("https://cal.com/noopurr/sparkstormai", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>AI Courses | SparkStorm AI</title>
        <meta name="description" content="Master AI for your business — from basics to advanced tools. Learn prompting, content creation, website building, chatbots, and cinematic video generation." />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-3 px-4 py-1.5 bg-blue-50 rounded-full">
            <p className="text-xs sm:text-sm font-medium text-blue-600">AI Education</p>
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            AI Courses by SparkStorm AI
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Transform your business with AI — from mastering the basics to building 
            landing pages, chatbots, and cinematic videos. No tech experience needed.
          </p>
        </div>

        {/* ============ BASIC COURSE ============ */}
        <section className="mb-20">
          <div className="rounded-2xl bg-gradient-primary p-8 text-white shadow-lg text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-white/20 rounded-full">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Basic Course</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Reserve Your Spot — Basic</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Learn the foundations of AI and start using it to create content, save time, and grow your business.
            </p>
          </div>

          {/* Modules */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {[
              { num: 1, title: "AI Basics", desc: "What it really is & why it matters" },
              { num: 2, title: "Prompting 101", desc: "How to talk to AI & get results" },
              { num: 3, title: "Context & Framework", desc: "Teach AI your voice" },
              { num: 4, title: "Practical Practice", desc: "Write blogs & eBooks" },
              { num: 5, title: "Choosing Your AI Tools", desc: "ChatGPT & more" },
              { num: "★", title: "Bonus", desc: "Live Q&A + Marie's secret spiritual prompts!" },
            ].map((mod, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold text-sm flex-shrink-0">
                    {mod.num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{mod.title}</h3>
                    <p className="text-sm text-gray-500">{mod.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* What You'll Be Able to Do */}
          <div className="rounded-xl bg-gray-50 p-8 mb-10">
            <h3 className="text-2xl font-bold text-center mb-6">What You'll Be Able to Do</h3>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
              {[
                "Write blogs in minutes",
                "Draft eBooks and workbooks",
                "Get marketing ideas instantly",
                "Have AI as a 'team member'",
                "Save hours of time for your purpose",
                "Video replays included",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ ADVANCED COURSE ============ */}
        <section className="mb-20">
          <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-white shadow-lg mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-white/20 rounded-full">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">AI Advanced</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Advanced Course — Next Level</h2>
                <p className="text-lg opacity-90 max-w-xl">
                  Ready for the next level? Join us after your basic training to master advanced AI tools for your spiritual business.
                </p>
              </div>
              <div className="text-center md:text-right flex-shrink-0">
                <div className="text-lg line-through opacity-60">$998</div>
                <div className="text-4xl font-bold">$498</div>
                <div className="inline-block mt-1 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                  Save $500 Early Bird
                </div>
              </div>
            </div>
          </div>

          {/* Live Sessions */}
          <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 mb-10 text-center">
            <h3 className="text-lg font-semibold mb-2 text-purple-800">Live Sessions</h3>
            <p className="text-purple-700 font-medium">Nov 11, 18, 25 &bull; Dec 2, 9</p>
            <p className="text-purple-600 text-sm">9:00–11:30 AM PDT</p>
          </div>

          {/* What You'll Learn */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {[
              { num: 1, title: "Build Landing Pages", desc: "Create high-converting AI-powered landing pages" },
              { num: 2, title: "Build Custom Websites", desc: "Design and deploy professional websites with AI" },
              { num: 3, title: "PowerPoint Decks", desc: "Professional grade presentations with AI assistance" },
              { num: 4, title: "Chatbots for Business", desc: "Build and deploy chatbots for your website" },
              { num: 5, title: "Cinematic Video Generation", desc: "Hyper realistic AI-generated video content" },
            ].map((mod, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow border-purple-100">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 font-bold text-sm flex-shrink-0">
                    {mod.num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{mod.title}</h3>
                    <p className="text-sm text-gray-500">{mod.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Advanced Training Includes */}
          <div className="rounded-xl bg-gray-50 p-8 mb-10">
            <h3 className="text-2xl font-bold text-center mb-6">Advanced Training Includes</h3>
            <div className="grid gap-3 md:grid-cols-2 max-w-2xl mx-auto">
              {[
                "Build AI-powered landing pages & websites",
                "Create your own chatbot for your site",
                "Generate beautiful images & videos",
                "Marie & Noopur's proven business templates",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Get in touch to reserve your spot or learn more about our upcoming cohorts.
          </p>
          <Button onClick={handleBookDemo} size="lg" className="flex items-center mx-auto">
            <CalendarDays className="mr-2 h-5 w-5" /> Schedule a Call
          </Button>
        </section>
      </main>
    </div>
  );
};

export default AICourses;
