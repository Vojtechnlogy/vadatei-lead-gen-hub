import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Phone, Video } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-primary">
            Book Your Discovery Call
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8 mt-4">
          {/* Information Panel */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                What to Expect
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary font-heading">30-Minute Consultation</div>
                    <div className="text-muted-foreground font-body text-sm">
                      Focused discussion on your technology challenges and goals
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Video className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary font-heading">Video or Phone</div>
                    <div className="text-muted-foreground font-body text-sm">
                      Choose your preferred meeting format
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary font-heading">No Obligation</div>
                    <div className="text-muted-foreground font-body text-sm">
                      Free consultation with no strings attached
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-corporate-light p-6 rounded-lg">
              <h4 className="font-heading font-semibold text-primary mb-3">
                We'll Discuss:
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-body">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Your current technology challenges
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Strategic technology goals and priorities
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Potential solutions and approaches
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Next steps and recommendations
                </li>
              </ul>
            </div>

            <div className="bg-gradient-corporate p-6 rounded-lg text-white">
              <h4 className="font-heading font-semibold mb-2">
                Ready to Transform Your IT?
              </h4>
              <p className="text-white/90 font-body text-sm">
                Become another successful organization that has partnered with Vadatei to achieve their technology goals.
              </p>
            </div>
          </div>

          {/* Calendar Booking Button */}
          <div className="bg-gradient-subtle p-6 rounded-lg flex flex-col items-center justify-center">
            <h3 className="text-xl font-heading font-semibold text-primary mb-6 text-center">
              Choose Your Preferred Time
            </h3>
            <p className="text-center text-muted-foreground mb-6">
              Click the button below to select an available time slot and schedule your call instantly.
            </p>
            <a
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2R-61xrnPdxo4iPyGj1izkHRM7J7FDe1ST16P2QYHEallprHTR5lBnBFBZ2Dhf4zZtUqYnZ2JD?gv=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:bg-primary-dark transition"
            >
              Book a Time Slot
            </a>
            <div className="mt-6 text-center">
              <div className="text-sm text-muted-foreground font-body">
                Available Monday - Friday, 8:00 - 16:00 CET
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;