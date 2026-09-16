"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";
import { servicesData } from "@/data/services";
import { trackAiEvent } from "@/lib/analytics/events";
import { CheckCircle2, Send, AlertCircle, Loader2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  description: string;
  _hp: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  budget?: string;
  description?: string;
  general?: string;
}

const BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    service: servicesData[0].title,
    budget: "",
    description: "",
    _hp: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Your name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return undefined;
      case "email":
        if (!value.trim()) return "Work email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address (e.g. name@company.com).";
        }
        return undefined;
      case "service":
        if (!value.trim()) return "Please select a primary service.";
        return undefined;
      case "budget":
        if (!value.trim()) return "Please select an estimated budget range.";
        return undefined;
      case "description":
        if (!value.trim()) return "Project description is required.";
        if (value.trim().length < 20) {
          return `Please provide a bit more detail (${value.trim().length}/20 characters minimum).`;
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const nameErr = validateField("name", formData.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField("email", formData.email);
    if (emailErr) newErrors.email = emailErr;

    const serviceErr = validateField("service", formData.service);
    if (serviceErr) newErrors.service = serviceErr;

    const budgetErr = validateField("budget", formData.budget);
    if (budgetErr) newErrors.budget = budgetErr;

    const descErr = validateField("description", formData.description);
    if (descErr) newErrors.description = descErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (touched[id]) {
      const fieldError = validateField(id, value);
      setErrors((prev) => ({ ...prev, [id]: fieldError }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
    const fieldError = validateField(id, value);
    setErrors((prev) => ({ ...prev, [id]: fieldError }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Mark all required fields as touched
    setTouched({
      name: true,
      email: true,
      service: true,
      budget: true,
      description: true,
    });

    if (!validateAll()) {
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to submit your inquiry at this moment. Please email dinesh@inflixtglobal.com directly."
        );
      }

      trackAiEvent("contact_form_submitted");
      setStatus("success");
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected network error occurred. Please reach out to dinesh@inflixtglobal.com."
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      service: servicesData[0].title,
      budget: "",
      description: "",
      _hp: "",
    });
    setTouched({});
    setErrors({});
    setStatus("idle");
    setErrorMessage("");
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 sm:p-12 rounded-2xl bg-[#0B0717] border border-[#00F5FF]/30 text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent" />
        <div className="w-14 h-14 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/40 flex items-center justify-center text-[#00F5FF] mb-6 shadow-[0_0_20px_rgba(0,245,255,0.25)]">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Project inquiry received.
        </h3>
        <p className="text-sm text-[#9290A3] max-w-md mb-8 leading-relaxed">
          Thanks for reaching out. We&apos;ll review your requirements and get back to you.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-mono uppercase tracking-wider text-[#00F5FF] hover:underline cursor-pointer transition-colors"
        >
          Send another inquiry →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-10 rounded-2xl bg-[#0B0717] border border-white/10 flex flex-col gap-6 shadow-xl relative"
    >
      {/* Honeypot field for bot protection (hidden from screen and screen readers) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <label htmlFor="_hp">Do not fill this field</label>
        <input
          type="text"
          id="_hp"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          value={formData._hp}
          onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-sm flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-white mb-1">Inquiry submission failed</p>
            <p className="text-xs text-red-200/90 leading-relaxed mb-2">
              {errorMessage}
            </p>
            <p className="text-xs text-red-300">
              Direct email:{" "}
              <a
                href="mailto:dinesh@inflixtglobal.com"
                className="underline text-white font-medium hover:text-[#00F5FF]"
              >
                dinesh@inflixtglobal.com
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-mono uppercase tracking-wider text-white mb-2"
          >
            Your Name <span className="text-[#00F5FF]">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            disabled={status === "submitting"}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            className={`w-full px-4 py-3 rounded-xl bg-[#05030D] border ${
              errors.name ? "border-red-500/80 ring-1 ring-red-500/50" : "border-white/15"
            } text-white placeholder-[#9290A3]/50 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] outline-none text-sm transition-colors disabled:opacity-50`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono uppercase tracking-wider text-white mb-2"
          >
            Work Email <span className="text-[#00F5FF]">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            disabled={status === "submitting"}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@company.com"
            className={`w-full px-4 py-3 rounded-xl bg-[#05030D] border ${
              errors.email ? "border-red-500/80 ring-1 ring-red-500/50" : "border-white/15"
            } text-white placeholder-[#9290A3]/50 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] outline-none text-sm transition-colors disabled:opacity-50`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Company and Primary Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="company"
            className="block text-xs font-mono uppercase tracking-wider text-white mb-2"
          >
            Company / Organization
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            disabled={status === "submitting"}
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Studio (Optional)"
            className="w-full px-4 py-3 rounded-xl bg-[#05030D] border border-white/15 text-white placeholder-[#9290A3]/50 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] outline-none text-sm transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="block text-xs font-mono uppercase tracking-wider text-white mb-2"
          >
            Primary Service <span className="text-[#00F5FF]">*</span>
          </label>
          <select
            id="service"
            required
            aria-required="true"
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
            disabled={status === "submitting"}
            value={formData.service}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-xl bg-[#05030D] border ${
              errors.service ? "border-red-500/80" : "border-white/15"
            } text-white focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] outline-none text-sm transition-colors cursor-pointer disabled:opacity-50`}
          >
            {servicesData.map((s) => (
              <option key={s.id} value={s.title} className="bg-[#0B0717] text-white">
                {s.title}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id="service-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.service}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Budget Range */}
      <div>
        <label
          htmlFor="budget"
          className="block text-xs font-mono uppercase tracking-wider text-white mb-2"
        >
          Estimated Budget Range (USD) <span className="text-[#00F5FF]">*</span>
        </label>
        <select
          id="budget"
          required
          aria-required="true"
          aria-invalid={!!errors.budget}
          aria-describedby={errors.budget ? "budget-error" : undefined}
          disabled={status === "submitting"}
          value={formData.budget}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 rounded-xl bg-[#05030D] border ${
            errors.budget ? "border-red-500/80 ring-1 ring-red-500/50" : "border-white/15"
          } text-white focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] outline-none text-sm transition-colors cursor-pointer disabled:opacity-50`}
        >
          <option value="" disabled className="bg-[#0B0717] text-[#9290A3]">
            Select estimated budget range...
          </option>
          {BUDGET_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-[#0B0717] text-white">
              {option}
            </option>
          ))}
        </select>
        {errors.budget && (
          <p id="budget-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.budget}</span>
          </p>
        )}
      </div>

      {/* Row 4: Project Description & Goals */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="description"
            className="block text-xs font-mono uppercase tracking-wider text-white"
          >
            Project Description & Goals <span className="text-[#00F5FF]">*</span>
          </label>
          <span
            className={`text-[11px] font-mono ${
              formData.description.trim().length >= 20 ? "text-[#00F5FF]" : "text-[#9290A3]"
            }`}
          >
            {formData.description.trim().length}/20 min chars
          </span>
        </div>
        <textarea
          id="description"
          rows={5}
          required
          aria-required="true"
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "description-error" : undefined}
          disabled={status === "submitting"}
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Briefly describe what you are building, the problem you are solving, timeline expectations, and technical goals..."
          className={`w-full px-4 py-3 rounded-xl bg-[#05030D] border ${
            errors.description ? "border-red-500/80 ring-1 ring-red-500/50" : "border-white/15"
          } text-white placeholder-[#9290A3]/50 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] outline-none text-sm transition-colors resize-y disabled:opacity-50`}
        />
        {errors.description && (
          <p id="description-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.description}</span>
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        variant="primary"
        className="w-full mt-2"
        disabled={status === "submitting"}
        icon={
          status === "submitting" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )
        }
      >
        {status === "submitting" ? "Transmitting Inquiry..." : "Submit Project Inquiry"}
      </Button>
    </form>
  );
}
