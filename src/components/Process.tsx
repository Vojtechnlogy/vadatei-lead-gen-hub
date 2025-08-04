import { Card, CardContent } from "@/components/ui/card";
import { Search, BarChart3, Map, Handshake } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Discovery",
      description: "We deep-dive into your current technology landscape, business objectives, and challenges to understand your unique needs."
    },
    {
      icon: BarChart3,
      number: "02", 
      title: "Analysis",
      description: "Our experts analyze your systems, processes, and goals to identify opportunities for optimization and growth."
    },
    {
      icon: Map,
      number: "03",
      title: "Roadmap",
      description: "We create a comprehensive, actionable roadmap tailored to your business priorities and technical requirements."
    },
    {
      icon: Handshake,
      number: "04",
      title: "Partnership",
      description: "We work alongside your team to implement solutions, providing ongoing support and strategic guidance."
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

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
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