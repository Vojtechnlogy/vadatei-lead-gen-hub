import { Card, CardContent } from "@/components/ui/card";
import { Search, BarChart3, Map, Rocket} from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Audit & Discovery",
      description: "We conduct in depth interviews and assessments to identify your unique priorities, challenges, and opportunities. " +
      "This first step establishes a clear baseline for the rest of our collaboration"
    },
    {
      icon: BarChart3,
      number: "02", 
      title: "Building a Strategy",
      description: "We immerse ourselves in your business to uncover actionable steps that drive your goals forward. " +
        "This stage is about gathering insights that will guide every decision moving forward"
    },
    {
      icon: Map,
      number: "03",
      title: "Roadmap",
      description: "We create a comprehensive, actionable roadmap tailored to your business with implementable changes, projects, and workshops that help you succeed. " +
        "This roadmap serves as a guiding document, ensuring alignment and focus on your key objectives."
    },
    {
      icon: Rocket,
      number: "04",
      title: "Deployment",
      description: "We believe the longest lasting results come when your team owns the execution that's why we empower you and your team with the tools, " +  
      "and confidence to implement effective changes internally, offering ongoing support, coaching and mentoring."
    }
  ];

  return (
    <section id="process" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            Our Proven Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            A systematic approach that ensures every engagement delivers maximum value and lasting results.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-none shadow-card hover:shadow-corporate transition-all duration-300 hover:-translate-y-2 h-full">
                <CardContent className="p-8 text-center relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {/* Connection Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-primary/20"></div>
              )}
            </div>
          ))}

          {/* Guidance & Collaboration Card */}
          <div className="relative">
            <Card className="border-none shadow-card hover:shadow-corporate transition-all duration-300 hover:-translate-y-2 h-full">
              <CardContent className="p-8 text-center relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-lg">
                    &#8734;
                  </div>
                </div>
                {/* Icon (Lucide Users) */}
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                  <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Guidance &amp; Collaboration
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed italic mb-2">
                  Ongoing support, coaching, and mentoring throughout every phase, ensuring you and your team are kept in the loop, empowered, and aligned at all times.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process Benefits */}
        <div className="mt-20 bg-gradient-corporate rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-heading font-bold text-white mb-6">
            Why Our Process Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-heading font-bold text-white mb-2">100%</div>
              <div className="text-white/90 font-body">Transparent Communication</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-white mb-2">30+</div>
              <div className="text-white/90 font-body">Years of Refinement</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-white mb-2">500+</div>
              <div className="text-white/90 font-body">Successful Implementations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;