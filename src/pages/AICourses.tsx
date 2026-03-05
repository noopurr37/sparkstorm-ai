import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Code, TrendingUp, Users, Zap, ArrowRight, CalendarDays } from "lucide-react";

const courses = [
  {
    title: "AI Fundamentals",
    description: "Master the foundations of artificial intelligence, machine learning concepts, and neural networks. Perfect for beginners looking to enter the AI space.",
    duration: "6 Weeks",
    level: "Beginner",
    icon: <Brain className="w-8 h-8 text-blue-600" />,
    topics: ["Introduction to AI & ML", "Neural Networks Basics", "Data Preprocessing", "Model Training & Evaluation"],
  },
  {
    title: "Generative AI & LLMs",
    description: "Deep dive into large language models, prompt engineering, fine-tuning, and building applications with GPT, Claude, and open-source models.",
    duration: "8 Weeks",
    level: "Intermediate",
    icon: <Zap className="w-8 h-8 text-purple-600" />,
    topics: ["LLM Architecture", "Prompt Engineering", "RAG Systems", "Fine-Tuning & Deployment"],
  },
  {
    title: "AI for Business Leaders",
    description: "Strategic AI adoption for executives and managers. Learn to identify AI opportunities, manage AI projects, and drive digital transformation.",
    duration: "4 Weeks",
    level: "All Levels",
    icon: <TrendingUp className="w-8 h-8 text-green-600" />,
    topics: ["AI Strategy & ROI", "Use Case Identification", "AI Project Management", "Ethics & Governance"],
  },
  {
    title: "AI Chatbot Development",
    description: "Build production-ready AI chatbots from scratch. Covers NLP, dialog management, integrations, and deployment best practices.",
    duration: "6 Weeks",
    level: "Intermediate",
    icon: <Code className="w-8 h-8 text-orange-600" />,
    topics: ["NLP & Intent Recognition", "Dialog Flow Design", "API Integrations", "Production Deployment"],
  },
  {
    title: "AI in Healthcare",
    description: "Explore AI applications in healthcare including medical imaging, clinical NLP, drug discovery, and health data analytics with HIPAA compliance.",
    duration: "8 Weeks",
    level: "Advanced",
    icon: <BookOpen className="w-8 h-8 text-red-600" />,
    topics: ["Medical Imaging AI", "Clinical NLP", "Health Data Analytics", "Regulatory Compliance"],
  },
  {
    title: "Corporate AI Training",
    description: "Customized AI training programs for teams. Upskill your workforce with hands-on workshops tailored to your industry and use cases.",
    duration: "Custom",
    level: "Custom",
    icon: <Users className="w-8 h-8 text-teal-600" />,
    topics: ["Custom Curriculum", "Hands-On Workshops", "Industry-Specific Cases", "Team Certification"],
  },
];

const AICourses = () => {
  const handleBookDemo = () => {
    window.open("https://cal.com/noopurr/sparkstormai", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>AI Courses | SparkStorm AI</title>
        <meta name="description" content="Learn AI with SparkStorm AI's comprehensive courses — from fundamentals to advanced generative AI, chatbot development, and corporate training." />
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
            Master artificial intelligence with industry-led courses designed for professionals, 
            developers, and business leaders. Learn by building real-world AI applications.
          </p>
        </div>

        {/* CTA Banner */}
        <div className="mb-16 rounded-2xl bg-gradient-primary p-8 text-white shadow-lg text-center">
          <h2 className="mb-4 text-3xl font-bold">Transform Your Career with AI Skills</h2>
          <p className="mb-6 text-lg max-w-2xl mx-auto">
            Our expert-led courses combine theory with hands-on projects, 
            ensuring you can apply AI in real-world scenarios from day one.
          </p>
          <Button
            onClick={handleBookDemo}
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 flex items-center mx-auto"
          >
            <CalendarDays className="mr-2 h-5 w-5" /> Book a Consultation
          </Button>
        </div>

        {/* Course Listings */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Our Courses</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50">
                      {course.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">{course.duration}</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{course.level}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
                  <div>
                    <p className="text-sm font-medium mb-2">Topics Covered:</p>
                    <ul className="space-y-1">
                      {course.topics.map((topic, i) => (
                        <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-blue-500" /> {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16 rounded-xl bg-blue-50 p-8">
          <h2 className="mb-6 text-center text-3xl font-bold">Why Learn with SparkStorm AI?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Industry Experts", desc: "Learn from practitioners building real AI products." },
              { title: "Hands-On Projects", desc: "Build a portfolio of AI projects during the course." },
              { title: "Flexible Learning", desc: "Self-paced modules with live mentorship sessions." },
              { title: "Career Support", desc: "Job placement assistance and networking opportunities." },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Get in touch to discuss which course is right for you or to arrange corporate training for your team.
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
