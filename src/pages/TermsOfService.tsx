
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>Terms of Service | SparkStorm</title>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none p-6">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using SparkStorm services, you agree to be bound by these Terms of Service,
              all applicable laws and regulations, and agree that you are responsible for compliance with any
              applicable local laws.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on SparkStorm's website for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>

            <h2>3. Healthcare Information Disclaimer</h2>
            <p>
              The healthcare information provided by SparkStorm is for informational purposes only and is not a
              substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your
              physician or other qualified health provider with any questions you may have.
            </p>

            <h2>4. Data Privacy</h2>
            <p>
              SparkStorm collects and processes personal data in accordance with our Privacy Policy. By using our
              services, you consent to such processing and you warrant that all data provided by you is accurate.
            </p>

            <h2>5. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password and for restricting
              access to your computer.
            </p>

            <h2>6. Limitations</h2>
            <p>
              SparkStorm shall not be liable for any damages arising out of the use or inability to use our services.
            </p>

            <h2>7. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with applicable laws.
            </p>
            
            <h2>8. Changes to Terms</h2>
            <p>
              SparkStorm reserves the right to modify these Terms at any time. By continuing to use our Service, you agree 
              to be bound by the revised terms.
            </p>

            <p className="text-sm text-gray-500 mt-8">Last updated: May 14, 2025</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TermsOfService;
