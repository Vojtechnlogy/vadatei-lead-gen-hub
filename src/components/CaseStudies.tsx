import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, DollarSign, Clock, Users } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Fortune 500 Manufacturer Digital Transformation",
      industry: "Manufacturing",
      challenge: "Legacy systems hindering operational efficiency and digital innovation",
      solution: "Comprehensive cloud migration and process automation implementation",
      results: [
        { icon: TrendingUp, metric: "40%", description: "Increase in operational efficiency" },
        { icon: DollarSign, metric: "$2.5M", description: "Annual cost savings achieved" },
        { icon: Clock, metric: "6 months", description: "Faster time-to-market for new products" }
      ],
      technologies: ["AWS Cloud", "Automation Tools", "Analytics Platform", "Security Framework"]
    },
    {
      title: "Healthcare Network Security Overhaul",
      industry: "Healthcare",
      challenge: "Compliance requirements and cybersecurity vulnerabilities across multiple locations",
      solution: "Enterprise-wide security implementation with HIPAA compliance framework",
      results: [
        { icon: TrendingUp, metric: "99.9%", description: "Security incident reduction" },
        { icon: Users, metric: "15k+", description: "Patient records secured" },
        { icon: Clock, metric: "24/7", description: "Continuous monitoring implemented" }
      ],
      technologies: ["Zero Trust Security", "SIEM Platform", "Compliance Tools", "Endpoint Protection"]
    },
    {
      title: "Financial Services Cloud Migration",
      industry: "Financial Services", 
      challenge: "Outdated infrastructure limiting scalability and customer service capabilities",
      solution: "Strategic cloud migration with enhanced security and compliance measures",
      results: [
        { icon: TrendingUp, metric: "300%", description: "Improved system scalability" },
        { icon: DollarSign, metric: "45%", description: "Reduction in IT operational costs" },
        { icon: Users, metric: "98%", description: "Customer satisfaction rating" }
      ],
      technologies: ["Microsoft Azure", "DevOps Pipeline", "API Management", "Data Analytics"]
    }
  ];

  return (
    <section id="case-studies" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            Proven Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            Real-world results from our strategic partnerships with leading organizations across industries.
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <Card key={index} className="border-none shadow-card hover:shadow-corporate transition-all duration-300">
              <CardContent className="p-8 md:p-12">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Case Study Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-body mb-4">
                        {study.industry}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
                        {study.title}
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-heading font-semibold text-primary mb-3">
                          The Challenge
                        </h4>
                        <p className="text-muted-foreground font-body leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-heading font-semibold text-primary mb-3">
                          Our Solution
                        </h4>
                        <p className="text-muted-foreground font-body leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-heading font-semibold text-primary mb-4">
                        Technologies Implemented
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 bg-secondary/20 text-secondary text-sm rounded-full font-body"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-gradient-subtle p-6 rounded-lg">
                    <h4 className="text-lg font-heading font-semibold text-primary mb-6">
                      Results Achieved
                    </h4>
                    <div className="space-y-4">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <result.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-2xl font-heading font-bold text-primary">
                              {result.metric}
                            </div>
                            <div className="text-sm text-muted-foreground font-body">
                              {result.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-corporate-light p-8 md:p-12 rounded-2xl">
            <h3 className="text-3xl font-heading font-bold text-primary mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-body">
              Join the ranks of successful organizations that have transformed their technology landscape with Vadatei.
            </p>
            <Button 
              variant="cta" 
              size="lg"
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start Your Transformation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;