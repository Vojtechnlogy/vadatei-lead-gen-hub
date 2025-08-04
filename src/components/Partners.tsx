import { Card, CardContent } from "@/components/ui/card";

const Partners = () => {
  const partners = [
    { name: "Microsoft", logo: "Microsoft", category: "Cloud Solutions" },
    { name: "Amazon Web Services", logo: "AWS", category: "Cloud Infrastructure" },
    { name: "Google Cloud", logo: "Google", category: "Cloud Platform" },
    { name: "Cisco", logo: "Cisco", category: "Networking" },
    { name: "VMware", logo: "VMware", category: "Virtualization" },
    { name: "Salesforce", logo: "Salesforce", category: "CRM Solutions" },
    { name: "Oracle", logo: "Oracle", category: "Database Solutions" },
    { name: "IBM", logo: "IBM", category: "Enterprise Solutions" },
    { name: "Red Hat", logo: "Red Hat", category: "Open Source" },
    { name: "ServiceNow", logo: "ServiceNow", category: "IT Service Management" },
    { name: "Fortinet", logo: "Fortinet", category: "Cybersecurity" },
    { name: "Palo Alto Networks", logo: "Palo Alto", category: "Network Security" }
  ];

  return (
    <section id="partners" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            Technology Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            We collaborate with industry-leading technology partners to deliver best-in-class solutions for our clients.
          </p>
        </div>

        {/* Partner Categories */}
        <div className="mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☁️</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                Cloud Platforms
              </h3>
              <p className="text-muted-foreground font-body">
                Leading cloud infrastructure and platform providers
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                Security Solutions
              </h3>
              <p className="text-muted-foreground font-body">
                Advanced cybersecurity and network protection
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                Enterprise Software
              </h3>
              <p className="text-muted-foreground font-body">
                Business-critical applications and platforms
              </p>
            </div>
          </div>
        </div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/5 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-heading font-bold text-sm">
                    {partner.logo}
                  </span>
                </div>
                <div className="text-sm font-body text-muted-foreground">
                  {partner.category}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 bg-corporate-light p-8 md:p-12 rounded-2xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-heading font-bold text-primary mb-4">
              Certified Expertise
            </h3>
            <p className="text-xl text-muted-foreground font-body">
              Our team holds industry certifications from leading technology partners
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-3xl font-heading font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground font-body">Active Certifications</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-primary mb-2">12</div>
              <div className="text-muted-foreground font-body">Technology Partners</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground font-body">Certified Engineers</div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground font-body">Partner Support</div>
            </div>
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mt-16">
          <h3 className="text-2xl font-heading font-bold text-primary text-center mb-8">
            Benefits of Our Technology Partnerships
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-heading font-bold">1</span>
              </div>
              <h4 className="text-lg font-heading font-semibold text-primary mb-2">
                Best-in-Class Solutions
              </h4>
              <p className="text-muted-foreground font-body">
                Access to the latest technologies and innovations from industry leaders
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-heading font-bold">2</span>
              </div>
              <h4 className="text-lg font-heading font-semibold text-primary mb-2">
                Preferential Pricing
              </h4>
              <p className="text-muted-foreground font-body">
                Partner-level pricing and licensing benefits passed on to our clients
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-heading font-bold">3</span>
              </div>
              <h4 className="text-lg font-heading font-semibold text-primary mb-2">
                Expert Support
              </h4>
              <p className="text-muted-foreground font-body">
                Direct access to vendor technical support and resources
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;