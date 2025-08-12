import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-heading font-bold">Privacy Policy</h1>
          <p className="text-white/90 mt-2">Last updated: January 2025</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none font-body">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Introduction</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Vadatei ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Information We Collect</h2>
            <h3 className="text-xl font-heading font-semibold text-primary mb-3">Personal Information</h3>
            <p className="text-foreground leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>Contact us through our website or email</li>
              <li>Schedule a discovery call or consultation</li>
              <li>Subscribe to our newsletter</li>
              <li>Request information about our services</li>
            </ul>
            <p className="text-foreground leading-relaxed mb-4">
              This information may include your name, email address, phone number, company name, job title, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-heading font-semibold text-primary mb-3">Automatically Collected Information</h3>
            <p className="text-foreground leading-relaxed mb-4">
              We may automatically collect certain information about your device and usage patterns, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>IP address and geographic location</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website and search terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">How We Use Your Information</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>Provide and improve our consulting services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Schedule and conduct discovery calls and consultations</li>
              <li>Send you relevant information about our services</li>
              <li>Analyze website usage and improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Information Sharing</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>With your explicit consent</li>
              <li>To trusted service providers who assist us in operating our website and conducting our business</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Data Security</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Your Rights</h2>
            <p className="text-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>Access and update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your personal information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Contact Us</h2>
            <p className="text-foreground leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-foreground">
                <strong>Vadatei</strong><br />
                Email: privacy@vadatei.com<br />
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

export default PrivacyPolicy;