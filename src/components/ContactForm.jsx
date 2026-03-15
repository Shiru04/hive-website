import { useState, useRef, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const SERVICE_OPTIONS = [
  "Google Ads",
  "Website redesign",
  "SEO",
  "Internal tools",
  "Full strategy",
  "Not sure yet"
];

const STEPS = [
  { key: "name", question: "What's your name?", placeholder: "Your name", type: "text", autoComplete: "name" },
  { key: "email", question: "And your email?", placeholder: "you@company.com", type: "email", autoComplete: "email" },
  { key: "services", question: "What are you looking for?", hint: "Select all that apply" },
  { key: "message", question: "Anything else you'd like us to know?", placeholder: "Tell us briefly about your business, goals, or questions.", type: "textarea" },
];

export default function ContactForm({ compact = false }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", services: [], message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [answered, setAnswered] = useState([]); // tracks which steps are "locked in"
  const inputRef = useRef(null);

  const currentStep = STEPS[step];
  const isLastStep = step === STEPS.length - 1;
  const isServiceStep = currentStep?.key === "services";
  const isTextarea = currentStep?.type === "textarea";

  // Auto-focus input on step change
  useEffect(() => {
    if (status !== "success") {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [step, status]);

  function canAdvance() {
    if (currentStep.key === "message") return true; // optional
    if (currentStep.key === "services") return form.services.length > 0;
    const val = form[currentStep.key]?.trim();
    return val && val.length > 0;
  }

  function toggleService(service) {
    setForm((prev) => {
      const has = prev.services.includes(service);
      return {
        ...prev,
        services: has
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service]
      };
    });
  }

  function handleNext() {
    if (!canAdvance()) return;
    const value = currentStep.key === "services"
      ? form.services.join(", ")
      : form[currentStep.key];
    setAnswered((prev) => [...prev.slice(0, step), { ...currentStep, value }]);
    if (isLastStep) {
      handleSubmit();
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !isTextarea && !isServiceStep) {
      e.preventDefault();
      handleNext();
    }
  }

  function handleEditStep(i) {
    setStep(i);
    setAnswered((prev) => prev.slice(0, i));
  }

  async function handleSubmit() {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/api/public/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.services.length
            ? `[${form.services.join(", ")}] ${form.message}`
            : form.message,
          source: "organic"
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "We could not submit your message. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message);
    }
  }

  // Compact mode: simplified for homepage
  if (compact) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm max-w-md">
        {status === "success" ? (
          <SuccessMessage />
        ) : (
          <CompactForm
            form={form}
            setForm={setForm}
            status={status}
            onSubmit={handleSubmit}
            setStatus={setStatus}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        )}
      </div>
    );
  }

  // --- Full conversational form ---
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm max-w-lg">
      {status === "success" ? (
        <SuccessMessage />
      ) : (
        <div className="space-y-4">
          {/* Previous answers */}
          {answered.map((a, i) => (
            <div key={a.key} className="group">
              <p className="text-xs text-slate-400 mb-1">{a.question}</p>
              <button
                type="button"
                onClick={() => handleEditStep(i)}
                className="text-sm text-slate-200 hover:text-hive-yellow transition-colors flex items-center gap-2"
              >
                {a.value || <span className="text-slate-400 italic">Skipped</span>}
                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                </svg>
              </button>
            </div>
          ))}

          {/* Current question */}
          <div className="pt-1">
            <p className="text-base font-medium text-slate-50 mb-3">
              {currentStep.question}
            </p>

            {isServiceStep ? (
              /* Service selector — multi-select */
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{currentStep.hint}</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Select services">
                  {SERVICE_OPTIONS.map((service) => {
                    const selected = form.services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium border transition-colors ${
                          selected
                            ? "border-hive-yellow bg-hive-yellow/15 text-hive-yellow"
                            : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500"
                        }`}
                      >
                        {selected && (
                          <svg className="w-3 h-3 inline-block mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                        {service}
                      </button>
                    );
                  })}
                </div>
                <StepActions
                  canAdvance={canAdvance()}
                  onNext={handleNext}
                  isLast={isLastStep}
                  isLoading={status === "loading"}
                />
              </div>
            ) : isTextarea ? (
              /* Textarea step */
              <div className="space-y-3">
                <label htmlFor="field-message" className="sr-only">{currentStep.question}</label>
                <textarea
                  id="field-message"
                  ref={inputRef}
                  rows={3}
                  value={form[currentStep.key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [currentStep.key]: e.target.value }))}
                  placeholder={currentStep.placeholder}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-base text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow resize-none"
                />
                <StepActions
                  canAdvance={true}
                  onNext={handleNext}
                  isLast={isLastStep}
                  isLoading={status === "loading"}
                  skipLabel="Skip & send"
                  showSkip={!form[currentStep.key]?.trim()}
                />
              </div>
            ) : (
              /* Text / email input */
              <div className="flex gap-2">
                <label htmlFor={`field-${currentStep.key}`} className="sr-only">{currentStep.question}</label>
                <input
                  id={`field-${currentStep.key}`}
                  ref={inputRef}
                  type={currentStep.type}
                  autoComplete={currentStep.autoComplete}
                  value={form[currentStep.key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [currentStep.key]: e.target.value }))}
                  onKeyDown={handleKeyDown}
                  placeholder={currentStep.placeholder}
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-base text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
                />
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canAdvance()}
                  aria-label="Next step"
                  className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-hive-yellow text-slate-950 hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            )}

            {status === "error" && (
              <p className="text-sm text-red-400 mt-2">
                {errorMessage || "Something went wrong. Please try again."}
              </p>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5 pt-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i <= step ? "bg-hive-yellow w-6" : "bg-slate-700 w-4"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step action buttons                                                 */
/* ------------------------------------------------------------------ */

function StepActions({ canAdvance, onNext, isLast, isLoading, skipLabel, showSkip }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onNext}
        disabled={!canAdvance || isLoading}
        className="inline-flex items-center gap-2 rounded-full border border-hive-yellow bg-hive-yellow px-5 py-2 text-sm font-semibold text-slate-950 hover:brightness-105 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? "Sending..." : isLast ? "Send message" : "Continue"}
        {!isLoading && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        )}
      </button>
      {showSkip && (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1 rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 hover:border-hive-yellow/50 hover:text-hive-yellow transition-colors"
        >
          {skipLabel || "Skip"}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Success state                                                       */
/* ------------------------------------------------------------------ */

function SuccessMessage() {
  return (
    <div className="text-center py-6 space-y-3">
      <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto">
        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-50">Message sent!</h3>
      <p className="text-sm text-slate-400 max-w-xs mx-auto">
        We received your message and will follow up within 1–2 business days.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Compact form (for homepage)                                         */
/* ------------------------------------------------------------------ */

function CompactForm({ form, setForm, status, onSubmit, setStatus, setErrorMessage, errorMessage }) {
  const isSubmitting = status === "loading";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/api/public/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.services?.length
            ? `[${form.services.join(", ")}] ${form.message || ""}`
            : form.message || "Interested in learning more",
          source: "organic"
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "We could not submit your message. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <label htmlFor="compact-name" className="sr-only">Your name</label>
      <input
        id="compact-name"
        name="name"
        required
        type="text"
        autoComplete="name"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
        placeholder="Your name"
      />
      <label htmlFor="compact-email" className="sr-only">Email</label>
      <input
        id="compact-email"
        name="email"
        required
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
        placeholder="you@company.com"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full border border-hive-yellow bg-hive-yellow px-5 py-2 text-sm font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Get my free roadmap"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400">{errorMessage || "Something went wrong."}</p>
      )}
    </form>
  );
}
