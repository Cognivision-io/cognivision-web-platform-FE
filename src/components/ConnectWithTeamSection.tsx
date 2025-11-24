import React from "react";
import { ArrowUpRight } from "lucide-react";

const ConnectWithTeamSection: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Replace with your API call / action
    console.log("Form data:", Object.fromEntries(formData.entries()));
  };

  return (
    <section className="bg-white px-6 py-16 md:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-start">
        {/* Left column */}
        <div className="w-full space-y-10 lg:w-[40%]">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
              Connect with
              <br />
              our team
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Learn about product card */}
            <article className="flex h-full flex-col justify-between rounded-3xl border border-[#e5e7eb] bg-white px-6 py-6 shadow-sm">
              <div>
                <h3 className="text-[18px] font-semibold text-black">
                  Learn about
                  <br />
                  product
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[#6b7280]">
                  Have questions about our developer friendly product admin
                  panel?
                </p>
              </div>
              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#4f46e5]"
              >
                <span>View Demo Video</span>
                <ArrowUpRight size={16} />
              </button>
            </article>

            {/* Submit a support ticket card */}
            <article className="flex h-full flex-col justify-between rounded-3xl border border-[#e5e7eb] bg-white px-6 py-6 shadow-sm">
              <div>
                <h3 className="text-[18px] font-semibold text-black">
                  Submit a
                  <br />
                  support ticket
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[#6b7280]">
                  If you have an Cognivision account, submit a ticket directly
                  from our portal.
                </p>
              </div>
              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#4f46e5]"
              >
                <span>Visit Support tickets</span>
                <ArrowUpRight size={16} />
              </button>
            </article>
          </div>
        </div>

        {/* Right column – form */}
        <div className="w-full lg:w-[60%]">
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 text-[12px] text-[#111827]"
          >
            {/* First / Last name */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#111827]">
                  <span className="mr-1 text-red-500">*</span>First Name:
                </label>
                <input
                  name="firstName"
                  type="text"
                  className="w-full rounded-md bg-[#f5f7ff] px-4 py-3 text-sm text-[#111827] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#111827]">
                  <span className="mr-1 text-red-500">*</span>Last Name:
                </label>
                <input
                  name="lastName"
                  type="text"
                  className="w-full rounded-md bg-[#f5f7ff] px-4 py-3 text-sm text-[#111827] outline-none"
                />
              </div>
            </div>

            {/* Email / Company */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#111827]">
                  <span className="mr-1 text-red-500">*</span>Email Address:
                </label>
                <input
                  name="email"
                  type="email"
                  className="w-full rounded-md bg-[#f5f7ff] px-4 py-3 text-sm text-[#111827] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#111827]">
                  <span className="mr-1 text-red-500">*</span>Company:
                </label>
                <input
                  name="company"
                  type="text"
                  className="w-full rounded-md bg-[#f5f7ff] px-4 py-3 text-sm text-[#111827] outline-none"
                />
              </div>
            </div>

            {/* Title / Phone */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#111827]">
                  <span className="mr-1 text-red-500">*</span>Title:
                </label>
                <input
                  name="title"
                  type="text"
                  className="w-full rounded-md bg-[#f5f7ff] px-4 py-3 text-sm text-[#111827] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#111827]">
                  <span className="mr-1 text-red-500">*</span>Phone Number:
                </label>
                <input
                  name="phoneNumber"
                  type="tel"
                  className="w-full rounded-md bg-[#f5f7ff] px-4 py-3 text-sm text-[#111827] outline-none"
                />
              </div>
            </div>

            {/* Country */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#111827]">
                <span className="mr-1 text-red-500">*</span>Country:
              </label>
              <select
                name="country"
                defaultValue=""
                className="w-full rounded-md bg-[#f5f7ff] px-4 py-3 text-sm text-[#111827] outline-none"
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="PK">Pakistan</option>
                <option value="CA">Canada</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* How may we help you */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#111827]">
                <span className="mr-1 text-red-500">*</span>How may we help
                you?:
              </label>
              <textarea
                name="helpMessage"
                rows={3}
                className="w-full rounded-md bg-[#f5f7ff] px-4 py-3 text-sm text-[#111827] outline-none"
              />
            </div>

            {/* How did you learn */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#111827]">
                <span className="mr-1 text-red-500">*</span>
                How did you learn about Cognivision?:
              </label>
              <textarea
                name="referral"
                rows={3}
                className="w-full rounded-md bg-[#f5f7ff] px-4 py-3 text-sm text-[#111827] outline-none"
              />
            </div>

            {/* Checkboxes */}
            <div className="mt-4 space-y-3 text-[12px] text-[#4b5563]">
              <label className="flex items-start gap-2">
                <input
                  name="agreePrivacy"
                  type="checkbox"
                  className="mt-[2px] h-[14px] w-[14px] rounded border border-[#9ca3af]"
                  required
                />
                <span>
                  By checking this box you agree to our{" "}
                  <button
                    type="button"
                    className="text-[#4f46e5] underline underline-offset-2"
                  >
                    Privacy Policy
                  </button>
                  <span className="ml-0.5 text-red-500">*</span>
                </span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  name="getUpdates"
                  type="checkbox"
                  className="mt-[2px] h-[14px] w-[14px] rounded border border-[#9ca3af]"
                />
                <span>Check this box to get updates about Cognivision.</span>
              </label>
            </div>

            {/* Submit button */}
            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-[#5b2fe8] px-10 py-3 text-[14px] font-semibold text-white shadow-[0_14px_30px_rgba(91,47,232,0.5)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConnectWithTeamSection;
