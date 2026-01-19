import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Phone, Video } from "lucide-react";
import { useTranslation } from "react-i18next";
import { trackGenerateLead, trackOutboundClick } from "@/lib/analytics";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const { t } = useTranslation();

  const calendarUrl = "https://calendar.app.google/3Gr57kHkBUGkHsgS9";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-primary">
            {t("bookingModal.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8 mt-4">
          {/* Information Panel */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                {t("bookingModal.whatToExpect")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary font-heading">{t("bookingModal.consultationTitle")}</div>
                    <div className="text-muted-foreground font-body text-sm">
                      {t("bookingModal.consultationDesc")}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Video className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary font-heading">{t("bookingModal.formatTitle")}</div>
                    <div className="text-muted-foreground font-body text-sm">
                      {t("bookingModal.formatDesc")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary font-heading">{t("bookingModal.noObligationTitle")}</div>
                    <div className="text-muted-foreground font-body text-sm">
                      {t("bookingModal.noObligationDesc")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-corporate-light p-6 rounded-lg">
              <h4 className="font-heading font-semibold text-primary mb-3">
                {t("bookingModal.weWillDiscussTitle")}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-body">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  {t("bookingModal.discussItem1")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  {t("bookingModal.discussItem2")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  {t("bookingModal.discussItem3")}
                </li>
              </ul>
            </div>

            <div className="bg-gradient-corporate p-6 rounded-lg text-white">
              <h4 className="font-heading font-semibold mb-2">
                {t("bookingModal.readyTitle")}
              </h4>
              <p className="text-white/90 font-body text-sm">
                {t("bookingModal.readyBody")}
              </p>
            </div>
          </div>

          {/* Calendar Booking Button */}
          <div className="bg-gradient-subtle p-6 rounded-lg flex flex-col items-center justify-center">
            <h3 className="text-xl font-heading font-semibold text-primary mb-6 text-center">
              {t("bookingModal.chooseTimeTitle")}
            </h3>
            <p className="text-center text-muted-foreground mb-6">
              {t("bookingModal.chooseTimeDesc")}
            </p>
            <a
              href={calendarUrl}
              rel="noopener noreferrer"
              onClick={() => {
                trackOutboundClick(calendarUrl, "booking_modal", "calendar_booking");
                // Count ONLY the booking calendar click as a lead
                trackGenerateLead("booking_calendar", {
                  click_location: "booking_modal",
                  url: calendarUrl,
                  label: "calendar_booking",
                });
              }}
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:bg-primary-dark transition"
            >
              {t("bookingModal.bookButton")}
            </a>
            <div className="mt-6 text-center">
              <div className="text-sm text-muted-foreground font-body">
                {t("bookingModal.availability")}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
