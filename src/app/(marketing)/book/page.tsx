"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m } from "motion/react";
import { submissionsService } from "@/services/submissions.service";
import {
  vehicleTypesService,
  type VehicleType,
} from "@/services/vehicle-types.service";
import {
  Calendar,
  MapPin,
  Users,
  Car,
  Phone,
  Mail,
  User,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { CustomSelect, type Option } from "@/components/ui/custom-select";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { toast } from "sonner";
import { format } from "date-fns";
import { siteConfig, whatsappBookingUrl } from "@/constants";

// Booking Form Schema
const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z
    .string()
    .email("Valid email is required")
    .optional()
    .or(z.literal("")),
  pickupLocation: z.string().min(2, "Pickup location is required"),
  dropLocation: z.string().min(2, "Drop location is required"),
  travelDate: z.string().min(1, "Travel date is required"),
  travelTime: z.string().min(1, "Travel time is required"),
  passengers: z.string().min(1, "Number of passengers is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  tripType: z.enum(["one-way", "round-trip", "multi-day"]),
  specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const POPULAR_DESTINATIONS = [
  "Somnath Temple",
  "Dwarka",
  "Gir National Park",
  "Diu",
  "Junagadh",
  "Ambaji",
  "Kutch",
  "Ahmedabad",
  "Rajkot",
  "Surat",
];

export default function BookNowPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);

  // Fetch vehicle types on mount
  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const types = await vehicleTypesService.getActive();
        setVehicleTypes(types);
      } catch (error) {
        console.error("Failed to fetch vehicle types:", error);
        toast.error("Failed to load vehicle types");
      } finally {
        setIsLoadingVehicles(false);
      }
    };

    fetchVehicleTypes();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tripType: "one-way",
      passengers: "4",
      vehicleType: "",
    },
  });

  // Set default vehicle type when vehicle types are loaded
  useEffect(() => {
    if (vehicleTypes.length > 0 && !watch("vehicleType")) {
      setValue("vehicleType", vehicleTypes[0].id);
    }
  }, [vehicleTypes, setValue, watch]);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      // Find the selected vehicle type to get its name
      const selectedVehicle = vehicleTypes.find(
        (v) => v.id === data.vehicleType,
      );
      const vehicleTypeName = selectedVehicle?.name || data.vehicleType;

      // Submit booking to backend with vehicle type name
      await submissionsService.create({
        type: "booking",
        data: {
          ...data,
          vehicleTypeName, // Add vehicle type name for display
        },
        name: data.name,
        email: data.email || undefined,
        phone: data.phone,
      });

      setIsSuccess(true);
      toast.success("Booking request submitted successfully!");

      // Redirect to WhatsApp with booking details
      const message = `Hi! I want to book a cab:\n\nName: ${data.name}\nPhone: ${data.phone}\nFrom: ${data.pickupLocation}\nTo: ${data.dropLocation}\nDate: ${data.travelDate}\nTime: ${data.travelTime}\nPassengers: ${data.passengers}\nVehicle: ${vehicleTypeName}\nTrip Type: ${data.tripType}`;

      setTimeout(() => {
        window.open(whatsappBookingUrl(message), "_blank");
      }, 2000);

      reset();
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Booking Submitted!</h2>
            <p className="text-muted-foreground">
              We&apos;ve received your booking request. Our team will contact
              you shortly to confirm the details.
            </p>
          </div>
          <div className="space-y-3">
            <Button
              onClick={() => setIsSuccess(false)}
              className="w-full"
              size="lg"
            >
              Make Another Booking
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Back to Home
            </Button>
          </div>
        </m.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Ride
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill in the details below and we&apos;ll get back to you with the
            best options for your journey
          </p>
        </m.div>

        {/* Booking Form */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border rounded-2xl p-6 md:p-8 shadow-lg"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <PhoneInput
                    value={watch("phone")}
                    onChange={(value) => setValue("phone", value || "")}
                    placeholder="Enter phone number"
                    defaultCountry="IN"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Trip Details
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation">Pickup Location *</Label>
                  <Input
                    id="pickupLocation"
                    {...register("pickupLocation")}
                    placeholder="Enter pickup location"
                    list="pickup-suggestions"
                  />
                  <datalist id="pickup-suggestions">
                    {POPULAR_DESTINATIONS.map((dest) => (
                      <option key={dest} value={dest} />
                    ))}
                  </datalist>
                  {errors.pickupLocation && (
                    <p className="text-sm text-destructive">
                      {errors.pickupLocation.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dropLocation">Drop Location *</Label>
                  <Input
                    id="dropLocation"
                    {...register("dropLocation")}
                    placeholder="Enter drop location"
                    list="drop-suggestions"
                  />
                  <datalist id="drop-suggestions">
                    {POPULAR_DESTINATIONS.map((dest) => (
                      <option key={dest} value={dest} />
                    ))}
                  </datalist>
                  {errors.dropLocation && (
                    <p className="text-sm text-destructive">
                      {errors.dropLocation.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="travelDate">Travel Date *</Label>
                  <Controller
                    name="travelDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) =>
                          field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                        }
                        placeholder="Select travel date"
                      />
                    )}
                  />
                  {errors.travelDate && (
                    <p className="text-sm text-destructive">
                      {errors.travelDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="travelTime">Travel Time *</Label>
                  <Controller
                    name="travelTime"
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select travel time"
                      />
                    )}
                  />
                  {errors.travelTime && (
                    <p className="text-sm text-destructive">
                      {errors.travelTime.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Vehicle & Passengers */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Car className="w-5 h-5" />
                Vehicle & Passengers
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tripType">Trip Type *</Label>
                  <Controller
                    name="tripType"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={[
                          { value: "one-way", label: "One Way" },
                          { value: "round-trip", label: "Round Trip" },
                          { value: "multi-day", label: "Multi-Day" },
                        ]}
                        value={
                          field.value
                            ? {
                                value: field.value,
                                label:
                                  field.value === "one-way"
                                    ? "One Way"
                                    : field.value === "round-trip"
                                      ? "Round Trip"
                                      : "Multi-Day",
                              }
                            : null
                        }
                        onChange={(option: Option | null) =>
                          field.onChange(option?.value)
                        }
                        placeholder="Select trip type"
                      />
                    )}
                  />
                  {errors.tripType && (
                    <p className="text-sm text-destructive">
                      {errors.tripType.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers">Passengers *</Label>
                  <Input
                    id="passengers"
                    type="number"
                    min="1"
                    max="50"
                    {...register("passengers")}
                    placeholder="Enter number of passengers"
                  />
                  {errors.passengers && (
                    <p className="text-sm text-destructive">
                      {errors.passengers.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type *</Label>
                  <Controller
                    name="vehicleType"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={vehicleTypes.map((type) => ({
                          value: type.id,
                          label: `${type.name} (${type.seats} Seater)`,
                        }))}
                        value={
                          field.value
                            ? vehicleTypes
                                .map((type) => ({
                                  value: type.id,
                                  label: `${type.name} (${type.seats} Seater)`,
                                }))
                                .find((opt) => opt.value === field.value)
                            : null
                        }
                        onChange={(option: Option | null) =>
                          field.onChange(option?.value)
                        }
                        isLoading={isLoadingVehicles}
                        isDisabled={isLoadingVehicles}
                        placeholder={
                          isLoadingVehicles
                            ? "Loading..."
                            : "Select vehicle type"
                        }
                      />
                    )}
                  />
                  {errors.vehicleType && (
                    <p className="text-sm text-destructive">
                      {errors.vehicleType.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="specialRequests">
                Special Requests (Optional)
              </Label>
              <textarea
                id="specialRequests"
                {...register("specialRequests")}
                placeholder="Any special requirements or requests..."
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>Submit Booking Request</>
              )}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              By submitting this form, you agree to our terms and conditions.
              We&apos;ll contact you within 24 hours to confirm your booking.
            </p>
          </form>
        </m.div>

        {/* Contact Info */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center space-y-4"
        >
          <p className="text-muted-foreground">
            Need immediate assistance? Contact us directly:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {siteConfig.contact.phoneDisplay}
            </a>
            <a
              href={whatsappBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </m.div>
      </div>
    </div>
  );
}
