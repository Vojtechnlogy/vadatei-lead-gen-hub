import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseBusiness , ChartSpline,Zap, Handshake} from "lucide-react";
import teamImage from "@/assets/team-collaboration.jpg";
import marekTolasz from '../assets/marekTolasz.jpg';

// Bubbles at the bottom of the about section that display core values
// Each bubble contains an icon, title, and description
// The bubbles are styled to be visually appealing and consistent with the corporate theme
const About = () => {
  const values = [
    {
      icon: BriefcaseBusiness, // chanage this to a briefcase or another relevant icon
      title: "30+ Years Experience",
      description: "Decades of proven results leading IT teams and transformation projects accross multiple industries"
    },
    {
      icon: ChartSpline, // change this to a rocket ship a graph going up or another relevant icon
      title: "Measurable Business Impact",
      description: "Solutions designed to cut costs, imporve efficiency and drive sustainable growth"
    },
    {
      icon: Zap,// change this to a lightning bolt or another relevant icon
      title: "Fast Insightful Diagnosis",
      description: "We pinpoint the real issues quickly, so every improvment is targeted and effective"
    },
    {
      icon: Handshake, // change this to hads shaking or another relevant icon
      title: "Low Risk first Step",
      description: "Start with a focused discovery phase before commiting to larger projects"
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
            Experience you can trust results you can measure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-[2.1rem] md:text-[3.3rem] font-heading font-semibold text-primary mb-7">
              Your Strategic Technology Partner
            </h3>
            <p className="text-[1.21rem] text-foreground mb-7 font-body leading-relaxed">
              With over 30 years in IT leadership and transformation, Marek Tolasz has helped organizations streamline operations, cut costs, and unlock growth.
            </p>
            <p className="text-[1.21rem] text-foreground mb-9 font-body leading-relaxed">
              Vadatei was created to bring that expertise to businesses that want IT to be a strategic advantage, 
              not just a support function. We identify the real challenges, design practical solutions, and help you implement them for lasting results.
            </p>
          </div>

          <div className="relative">
            <img
              src={marekTolasz}
              alt="Marek Tolasz"
              className="rounded-lg shadow-corporate w-full h-[660px] object-cover" // 10% bigger than 600px
            />
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