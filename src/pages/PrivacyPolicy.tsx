
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>Privacy Policy | SparkStorm</title>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none p-6">
            <h2>1. Introduction</h2>
            <p>
              SparkStorm ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you use our service.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our service, including:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> This includes your name, email address, and other information
                you provide when creating an account.
              </li>
              <li>
                <strong>Health Information:</strong> Any health-related information you choose to store in your
                SparkStorm account.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you access and use our service.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Process your requests and transactions</li>
              <li>Send you important notifications</li>
              <li>Respond to your inquiries</li>
              <li>Develop new features</li>
            </ul>

            <h2>4. Disclosure of Your Information</h2>
            <p>We may disclose your personal information:</p>
            <ul>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and property</li>
              <li>With your consent</li>
              <li>To service providers who perform services on our behalf</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              You may have rights regarding your personal information, including the right to access, correct, or delete your data.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our service is not intended for children under the age of 13.
            </p>

            <h2>8. Changes to Our Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page.
            </p>

            <p className="text-sm text-gray-500 mt-8">Last updated: May 14, 2025</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
