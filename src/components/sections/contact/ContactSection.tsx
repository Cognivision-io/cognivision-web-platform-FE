"use client";

import { Mail, Phone, Globe2, Linkedin, Instagram, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const subjectOptions = ["Project demo", "General Inquiry"] as const;
type SubjectOption = (typeof subjectOptions)[number];

const contactSchema = yup
  .object({
    firstName: yup.string().trim().required("First name is required"),
    lastName: yup.string().trim().required("Last name is required"),
    email: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),
    phoneNumber: yup.string().trim().required("Phone number is required"),
    subject: yup
      .mixed<SubjectOption>()
      .oneOf(subjectOptions, "Subject is required")
      .required("Subject is required"),
    message: yup.string().trim().required("Message is required"),
  })
  .required();

type ContactFormValues = yup.InferType<typeof contactSchema>;

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    // Replace this with your API call / action
    console.log("Contact form submitted:", data);
    reset();
  };

  return (
    <section id="contact" className="bg-[#f4f7fe] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-[#f5f7fd] shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="flex flex-col md:flex-row">
          {/* Left: Contact info panel */}
          <div className="w-full rounded-t-[32px] bg-[#5328d4] px-10 py-10 text-white md:w-[38%] md:rounded-l-[32px] md:rounded-tr-none md:px-12 md:py-12">
            <div className="flex h-full flex-col justify-between">
              <div>
                <h2 className="text-[24px] font-semibold leading-tight md:text-[26px]">
                  Contact Information
                </h2>
                <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/80">
                  Connect with us and become part of cognivision&apos;s
                  community and get early updates about our features
                </p>

                <div className="mt-10 space-y-6 text-[14px]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                      <Phone size={16} />
                    </div>
                    <span className="tracking-wide">+1012 3456 789</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                      <Mail size={16} />
                    </div>
                    <span className="tracking-wide">
                      Supportcognivision@gmail.com
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                      <Globe2 size={16} />
                    </div>
                    <span className="tracking-wide">www.cognivision.io</span>
                  </div>
                </div>
              </div>

              {/* Social icons row */}
              <div className="mt-10 flex items-center gap-4 md:mt-16">
                <a
                  href="https://www.linkedin.com/company/meetcognivision/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CogniVision on LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:opacity-95 hover:bg-white hover:text-black"
                >
                  <Linkedin size={16} />
                </a>

                <a
                  href="https://www.instagram.com/cogni_vision/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CogniVision on Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:opacity-95 hover:bg-white hover:text-black"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form panel */}
          <div className="w-full rounded-b-[32px] bg-[#f5f7fd] px-10 py-10 md:w-[62%] md:rounded-r-[32px] md:rounded-bl-none md:px-14 md:py-12">
            <form
              className="flex h-full flex-col justify-between"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-8">
                {/* Name row */}
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-[12px] font-medium text-[#6b7280]">
                      First Name
                    </p>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full border-b border-[#d4d4d8] bg-transparent pb-1 text-[14px] text-[#111827] outline-none placeholder:text-[#d4d4d8]"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-[11px] text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[12px] font-medium text-[#6b7280]">
                      Last Name
                    </p>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full border-b border-[#d4d4d8] bg-transparent pb-1 text-[14px] text-[#111827] outline-none placeholder:text-[#d4d4d8]"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-[11px] text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email / Phone row */}
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-[12px] font-medium text-[#6b7280]">
                      Email
                    </p>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full border-b border-[#d4d4d8] bg-transparent pb-1 text-[14px] text-[#111827] outline-none placeholder:text-[#d4d4d8]"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[12px] font-medium text-[#6b7280]">
                      Phone Number
                    </p>
                    <input
                      type="tel"
                      placeholder="+1 012 3456 789"
                      className="w-full border-b border-[#111827] bg-transparent pb-1 text-[14px] text-[#111827] outline-none placeholder:text-[#d4d4d8]"
                      {...register("phoneNumber")}
                    />
                    {errors.phoneNumber && (
                      <p className="text-[11px] text-red-500">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject radios */}
                <div className="space-y-3">
                  <p className="text-[12px] font-semibold text-[#111827]">
                    Select Subject?
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-[13px]">
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        value="Project demo"
                        {...register("subject")}
                        className="peer sr-only"
                        defaultChecked
                      />
                      <span className="relative flex h-4 w-4 items-center justify-center rounded-full border border-[#111827] bg-white peer-checked:border-[#111827]">
                        <span className="h-2 w-2 rounded-full bg-[#111827] peer-checked:opacity-100" />
                      </span>
                      <span className="text-[#111827]">Project demo</span>
                    </label>

                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        value="General Inquiry"
                        {...register("subject")}
                        className="peer sr-only"
                      />
                      <span className="relative flex h-4 w-4 items-center justify-center rounded-full border border-[#d4d4d8] bg-white peer-checked:border-[#111827]">
                        <span className="h-2 w-2 rounded-full bg-[#d4d4d8] peer-checked:bg-[#111827]" />
                      </span>
                      <span className="text-[#6b7280] peer-checked:text-[#111827]">
                        General Inquiry
                      </span>
                    </label>
                  </div>
                  {errors.subject && (
                    <p className="text-[11px] text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <p className="text-[12px] font-medium text-[#6b7280]">
                    Message
                  </p>
                  <textarea
                    rows={3}
                    placeholder="Write your message..."
                    className="w-full resize-none border-b border-[#d4d4d8] bg-transparent pb-1 text-[14px] text-[#111827] outline-none placeholder:text-[#d4d4d8]"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Button aligned bottom right */}
              <div className="mt-10 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center rounded-full bg-[#5328d4] px-10 py-3 text-[14px] font-semibold text-white shadow-[0_16px_40px_rgba(83,40,212,0.5)] transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
