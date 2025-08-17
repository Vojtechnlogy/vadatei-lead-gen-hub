import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Mail, Phone, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  fullDescription: string;
  features: string[];
  icon: any;
}

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    details: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data in the required order
    const submission = {
      timeStamp: new Date().toISOString(),
      service: service.title,
      fullName: formData.fullName,
      email: formData.email,
      companyName: formData.companyName,
      phone: formData.phone,
      details: formData.details,
    };

    const encoded = Object.keys(submission)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(submission[k]))
      .join('&');

    try {
      await fetch('https://script.google.com/macros/s/AKfycbypF2UslTMIJ7p99mf1XsS5v5FB9rWG1uh1DChh3IbTZxwkpEm20_mJIJVEW18kyDE0/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encoded,
      });

      toast({
        title: "Inquiry Submitted Successfully",
        description: `Thank you for your interest in ${service.title}. We'll be in touch within 24 hours.`,
      });

      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        phone: "",
        details: ""
      });

      onClose();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-primary pr-8">
            {service.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8 mt-4">
          {/* Service Information */}
          <div className="space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <service.icon className="h-8 w-8 text-primary" />
            </div>

            <div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Service Overview
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Key Features
              </h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground font-body">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-corporate-light p-6 rounded-lg">
              <h4 className="font-heading font-semibold text-primary mb-2">
                Ready to Get Started?
              </h4>
              <p className="text-sm text-muted-foreground font-body">
                Fill out the contact form to learn more about how {service.title} can benefit your organization.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-subtle p-6 rounded-lg">
            <h3 className="text-xl font-heading font-semibold text-primary mb-6">
              Request More Information
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="font-body">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-body">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName" className="font-body">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-body">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="details" className="font-body">
                  Details (Interest in: {service.title})
                </Label>
                <Textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1"
                  placeholder={`Tell us more about your ${service.title} needs...`}
                />
              </div>

              <Button type="submit" variant="cta" className="w-full">
                Send Inquiry
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>marek.tolasz@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span> +31 6 82 49 46 90 or +420 602 396 416 </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;