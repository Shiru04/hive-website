import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

export default function ContactForm({ compact = false }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(
        `${API_URL}/api/public/leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
            source: "organic"
          })
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.message || "We could not submit your message. Please try again."
        );
      }

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message);
    }
  }

  const isSubmitting = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm ${
        compact ? "max-w-md" : "max-w-lg"
      }`}
      aria-describedby="contact-status"
    >
      <div className="grid gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-200 mb-1"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
            placeholder="John Doe"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Phone (WhatsApp)
            </label>
            <input
              id="phone"
              name="phone"
              required
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
              placeholder="+1 (555) 555-5555"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-200 mb-1"
          >
            What do you want to improve?
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={compact ? 3 : 5}
            value={form.message}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow"
            placeholder="Tell us briefly about your business, current marketing and desired results."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full border border-hive-yellow bg-hive-yellow px-5 py-2.5 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>

        <p
          id="contact-status"
          className="text-sm text-slate-400 min-h-[1.25rem]"
        >
          {status === "success" && (
            <span className="text-emerald-400">
              Thank you! We received your message and will follow up shortly.
            </span>
          )}
          {status === "error" && (
            <span className="text-red-400">
              {errorMessage ||
                "Something went wrong. Please try again or contact us directly."}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
