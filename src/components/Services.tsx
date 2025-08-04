import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Route, 
  Users, 
  Cloud, 
  Lock, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import ServiceModal from "./ServiceModal";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "health-check",
      icon: Shield,
      title: "IT Health Check",
      description: "Comprehensive assessment of your current technology infrastructure to identify risks, inefficiencies, and opportunities for improvement.",
      features: ["Security Assessment", "Performance Analysis", "Cost Optimization", "Risk Evaluation"],
      fullDescription: "Our comprehensive IT Health Check provides a thorough analysis of your technology infrastructure, identifying potential vulnerabilities, performance bottlenecks, and cost-saving opportunities. We evaluate your systems, security posture, and operational efficiency to deliver actionable insights that improve your IT performance and reduce risk."
    },
    {
      id: "digital-transformation",
      icon: Route,
      title: "Digital Transformation Roadmap",
      description: "Strategic planning and implementation guidance to modernize your technology stack and business processes for the digital age.",
      features: ["Strategic Planning", "Technology Modernization", "Process Optimization", "Change Management"],
      fullDescription: "Transform your business with our comprehensive Digital Transformation Roadmap service. We help you navigate the complex journey of modernizing your technology infrastructure, optimizing business processes, and implementing digital solutions that drive growth and efficiency. Our strategic approach ensures successful adoption and measurable business outcomes."
    },
    {
      id: "cio-service",
      icon: Users,
      title: "CIO-as-a-Service",
      description: "Executive-level technology leadership and strategic guidance without the overhead of a full-time Chief Information Officer.",
      features: ["Strategic Leadership", "Technology Planning", "Vendor Management", "Budget Optimization"],
      fullDescription: "Access executive-level IT leadership with our CIO-as-a-Service offering. Our experienced technology executives provide strategic guidance, oversee your IT operations, and ensure technology investments align with business objectives. Perfect for organizations that need senior IT leadership without the cost of a full-time CIO."
    },
    {
      id: "cloud-migration",
      icon: Cloud,
      title: "Cloud Migration & Strategy",
      description: "Expert guidance for migrating to cloud platforms with minimal disruption and maximum efficiency gains.",
      features: ["Migration Planning", "Cloud Architecture", "Cost Optimization", "Security Implementation"],
      fullDescription: "Accelerate your cloud journey with our expert Cloud Migration & Strategy service. We provide end-to-end support for planning, executing, and optimizing your cloud migration. Our proven methodology minimizes downtime, reduces costs, and ensures your cloud infrastructure is secure, scalable, and aligned with your business needs."
    },
    {
      id: "cybersecurity",
      icon: Lock,
      title: "Cybersecurity Consulting",
      description: "Protect your organization with comprehensive security assessments, compliance guidance, and incident response planning.",
      features: ["Security Assessment", "Compliance Management", "Incident Response", "Risk Mitigation"],
      fullDescription: "Strengthen your cybersecurity posture with our comprehensive Cybersecurity Consulting service. We assess your current security landscape, identify vulnerabilities, and implement robust protection strategies. Our services include security policy development, compliance management, and incident response planning to keep your organization secure."
    },
    {
      id: "performance-optimization",
      icon: TrendingUp,
      title: "Performance Optimization",
      description: "Enhance system performance, reduce costs, and improve user experience through targeted optimization strategies.",
      features: ["Performance Analysis", "System Tuning", "Cost Reduction", "User Experience"],
      fullDescription: "Maximize your IT performance with our Performance Optimization service. We analyze your systems, identify bottlenecks, and implement targeted improvements that enhance speed, reliability, and user satisfaction while reducing operational costs. Our data-driven approach ensures measurable performance gains."
    }
  ];

  return (
    <section id="services" className="py-20 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            Comprehensive IT consulting services designed to transform your technology landscape and drive business success.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="border-none shadow-card hover:shadow-corporate transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-body"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="corporate-outline" 
                  className="w-full group-hover:bg-primary group-hover:text-white transition-all"
                  onClick={() => setSelectedService(service.id)}
                >
                  More Information
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-corporate rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-heading font-bold text-white mb-4">
              Ready to Transform Your IT?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-body">
              Let's discuss how our expertise can help your organization achieve its technology goals.
            </p>
            <Button 
              variant="corporate-outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start Your Transformation
            </Button>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={services.find(s => s.id === selectedService)!}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};

export default Services;