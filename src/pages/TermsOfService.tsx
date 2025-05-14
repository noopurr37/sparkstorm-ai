
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>Terms of Service | MediWallet</title>
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
              By accessing and using MediWallet services, you agree to be bound by these Terms of Service,
              all applicable laws and regulations, and agree that you are responsible for compliance with any
              applicable local laws. If you do not agree with any of these terms, you are prohibited from using or
              accessing this service.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on MediWallet's website for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under
              this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose;</li>
              <li>Attempt to decompile or reverse engineer any software contained on MediWallet's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <h2>3. Medical Information Disclaimer</h2>
            <p>
              The medical information stored in MediWallet is provided for informational purposes only and is not a
              substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your
              physician or other qualified health provider with any questions you may have regarding a medical
              condition.
            </p>

            <h2>4. Data Privacy</h2>
            <p>
              MediWallet collects and processes personal data in accordance with our Privacy Policy. By using our
              services, you consent to such processing and you warrant that all data provided by you is accurate.
            </p>

            <h2>5. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password and for restricting
              access to your computer. You agree to accept responsibility for all activities that occur under your
              account or password.
            </p>

            <h2>6. Limitations</h2>
            <p>
              In no event shall MediWallet be liable for any damages arising out of the use or inability to use the
              materials on MediWallet's website, even if MediWallet or a MediWallet authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </p>

            <h2>7. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably
              submit to the exclusive jurisdiction of the courts in that location.
            </p>
            
            <h2>8. Changes to Terms</h2>
            <p>
              MediWallet reserves the right, at its sole discretion, to modify or replace these Terms at any time. By
              continuing to access or use our Service after those revisions become effective, you agree to be bound by
              the revised terms.
            </p>

            <p className="text-sm text-gray-500 mt-8">Last updated: May 14, 2025</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TermsOfService;
