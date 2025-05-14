
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>Privacy Policy | MediWallet</title>
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
              MediWallet ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
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
                <strong>Medical Information:</strong> Any health-related information you choose to store in your
                MediWallet account.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you access and use our service, including your IP
                address, browser type, and device information.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services;</li>
              <li>Process and complete transactions;</li>
              <li>Send you technical notices and support messages;</li>
              <li>Respond to your comments and questions;</li>
              <li>Develop new products and services;</li>
              <li>Monitor and analyze trends, usage, and activities;</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
            </ul>

            <h2>4. Disclosure of Your Information</h2>
            <p>We may disclose your personal information:</p>
            <ul>
              <li>To comply with legal obligations;</li>
              <li>To protect and defend our rights and property;</li>
              <li>With your consent or at your direction;</li>
              <li>To service providers who perform services on our behalf;</li>
              <li>
                If we believe disclosure is necessary to protect the rights, property, or safety of our users or
                others.
              </li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal
              information. However, no method of transmission over the Internet or electronic storage is 100% secure,
              and we cannot guarantee absolute security.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including
              the right to access, correct, or delete your personal data. To exercise these rights, please contact us.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our service is not intended for children under the age of 13, and we do not knowingly collect personal
              information from children under 13.
            </p>

            <h2>8. Changes to Our Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <p className="text-sm text-gray-500 mt-8">Last updated: May 14, 2025</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
