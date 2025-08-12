import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-heading font-bold">Terms of Service</h1>
          <p className="text-white/90 mt-2">Last updated: January 2025</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none font-body">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Agreement to Terms</h2>
            <p className="text-foreground leading-relaxed mb-4">
              By accessing and using Vadatei's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Services</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Vadatei provides IT consulting services including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>IT Health Checks and assessments</li>
              <li>Digital transformation roadmaps</li>
              <li>CIO-as-a-Service</li>
              <li>Cloud migration and strategy</li>
              <li>Cybersecurity consulting</li>
              <li>Performance optimization</li>
            </ul>
            <p className="text-foreground leading-relaxed mb-4">
              All services are provided subject to the terms of individual service agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Use License</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials on Vadatei's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on our website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Service Terms</h2>
            <h3 className="text-xl font-heading font-semibold text-primary mb-3">Consultations and Discovery Calls</h3>
            <p className="text-foreground leading-relaxed mb-4">
              Discovery calls and initial consultations are provided free of charge for qualification purposes. Detailed assessments and ongoing consulting services require separate agreements.
            </p>

            <h3 className="text-xl font-heading font-semibold text-primary mb-3">Payment Terms</h3>
            <p className="text-foreground leading-relaxed mb-4">
              Payment terms for consulting services will be specified in individual service agreements. Generally, payments are due within 30 days of invoice date unless otherwise specified.
            </p>

            <h3 className="text-xl font-heading font-semibold text-primary mb-3">Confidentiality</h3>
            <p className="text-foreground leading-relaxed mb-4">
              We maintain strict confidentiality regarding all client information and business processes. Detailed confidentiality terms are covered in individual service agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Disclaimer</h2>
            <p className="text-foreground leading-relaxed mb-4">
              The materials on Vadatei's website are provided on an 'as is' basis. Vadatei makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Limitations</h2>
            <p className="text-foreground leading-relaxed mb-4">
              In no event shall Vadatei or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if Vadatei or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Governing Law</h2>
            <p className="text-foreground leading-relaxed mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of New York, United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Changes to Terms</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Vadatei reserves the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Contact Information</h2>
            <p className="text-foreground leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-foreground">
                <strong>Vadatei</strong><br />
                Email: legal@vadatei.com<br />
                Phone: (555) 123-4567<br />
                Address: 123 Business Plaza, Suite 500, New York, NY 10001
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;