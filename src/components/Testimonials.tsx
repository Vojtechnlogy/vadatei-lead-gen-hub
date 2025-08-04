import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      title: "CTO",
      company: "TechForward Industries",
      content: "Vadatei transformed our entire IT infrastructure. Their strategic approach and deep expertise helped us modernize our systems while reducing costs by 35%. The team's professionalism and dedication to our success was exceptional.",
      rating: 5,
      industry: "Technology"
    },
    {
      name: "Marcus Rodriguez",
      title: "VP of Operations",
      company: "Global Manufacturing Corp",
      content: "Working with Vadatei was a game-changer for our digital transformation. They didn't just implement solutions—they became true partners in our growth. Our operational efficiency improved dramatically, and we're now positioned for future expansion.",
      rating: 5,
      industry: "Manufacturing"
    },
    {
      name: "Dr. Jennifer Chen",
      title: "Chief Medical Officer",
      company: "Regional Healthcare Network",
      content: "Security and compliance are critical in healthcare, and Vadatei delivered beyond our expectations. Their cybersecurity implementation protected our patient data while improving our operational workflows. Truly professional and reliable.",
      rating: 5,
      industry: "Healthcare"
    },
    {
      name: "David Thompson",
      title: "Chief Financial Officer",
      company: "Premier Financial Services",
      content: "Vadatei's cloud migration strategy was flawless. They managed the entire process with minimal disruption to our operations, and the results speak for themselves—faster performance, better security, and significant cost savings.",
      rating: 5,
      industry: "Financial Services"
    },
    {
      name: "Lisa Park",
      title: "IT Director",
      company: "Education Excellence Group",
      content: "The CIO-as-a-Service model was perfect for our organization. We gained access to executive-level IT leadership without the overhead costs. Vadatei's strategic guidance has been invaluable in modernizing our educational technology platform.",
      rating: 5,
      industry: "Education"
    },
    {
      name: "Robert Chen",
      title: "CEO",
      company: "Innovation Retail Chain",
      content: "Vadatei's performance optimization work revolutionized our e-commerce platform. Page load times improved by 60%, customer satisfaction increased, and our revenue grew significantly. Their expertise in retail technology is unmatched.",
      rating: 5,
      industry: "Retail"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            Don't just take our word for it. Here's what industry leaders say about their experience working with Vadatei.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-card hover:shadow-corporate transition-all duration-300 hover:-translate-y-1 h-full">
              <CardContent className="p-8 h-full flex flex-col">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-4" />

                {/* Testimonial Content */}
                <blockquote className="text-muted-foreground font-body leading-relaxed mb-6 flex-grow">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-heading font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-primary">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground font-body">
                        {testimonial.title}
                      </div>
                      <div className="text-sm font-body text-primary">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-body">
                      {testimonial.industry}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 bg-gradient-corporate rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-heading font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="text-xl text-white/90 font-body">
              Our track record speaks for itself
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-heading font-bold text-white mb-2">500+</div>
              <div className="text-white/90 font-body">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-white mb-2">98%</div>
              <div className="text-white/90 font-body">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-white mb-2">30+</div>
              <div className="text-white/90 font-body">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-white mb-2">24/7</div>
              <div className="text-white/90 font-body">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;