import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Lightbulb, Target } from "lucide-react";
import teamImage from "@/assets/team-collaboration.jpg";

const About = () => {
  const values = [
    {
      icon: CheckCircle,
      title: "Proven Expertise",
      description: "Three decades of technology leadership across industries"
    },
    {
      icon: Users,
      title: "Strategic Partnership",
      description: "We become an extension of your team, not just a vendor"
    },
    {
      icon: Lightbulb,
      title: "Innovation Focus",
      description: "Cutting-edge solutions tailored to your business needs"
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "Measurable outcomes that directly impact your bottom line"
    }
  ];

  return (
    <section id="about" className="py-20 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            About Vadatei
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            We don't just provide IT solutions—we forge strategic partnerships that drive transformation and growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-heading font-semibold text-primary mb-6">
              Your Strategic Technology Partner
            </h3>
            <p className="text-lg text-foreground mb-6 font-body leading-relaxed">
              For over 30 years, Vadatei has been at the forefront of enterprise technology consulting. 
              We understand that technology is not just about systems and software—it's about enabling 
              your business to reach its full potential.
            </p>
            <p className="text-lg text-foreground mb-8 font-body leading-relaxed">
              Our approach combines deep technical expertise with strategic business acumen. We don't 
              just solve today's problems; we architect solutions that position your organization for 
              sustained success in an ever-evolving digital landscape.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-primary font-heading">30+ Years</div>
                  <div className="text-sm text-muted-foreground font-body">Industry Experience</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-primary font-heading">Fortune 500</div>
                  <div className="text-sm text-muted-foreground font-body">Trusted by Leaders</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src={teamImage} 
              alt="Vadatei team collaboration" 
              className="rounded-lg shadow-corporate w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-card">
              <div className="text-2xl font-heading font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground font-body">Successful Projects</div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="border-none shadow-card hover:shadow-corporate transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-heading font-semibold text-primary mb-3">
                  {value.title}
                </h4>
                <p className="text-muted-foreground font-body">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;