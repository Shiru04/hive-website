import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  service: "",
};

const SERVICE_OPTIONS = [
  { value: "", label: "¿En qué te ayudamos?" },
  { value: "Rediseño Web", label: "Rediseño Web" },
  { value: "Google Ads", label: "Google Ads" },
  { value: "SEO", label: "SEO" },
  { value: "Automatización", label: "Automatización / Herramientas internas" },
  { value: "Consultoría", label: "Consultoría general" },
];

// WhatsApp number — reemplazar con el número real (solo dígitos, sin +)
const WA_NUMBER = "15005550000";

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
      const res = await fetch(`${API_URL}/api/public/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: `Servicio de interés: ${form.service}`,
          source: "organic",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "No pudimos enviar tu mensaje. Intentá de nuevo.");
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

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-base text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-hive-yellow transition-colors";

  return (
    <div className={compact ? "max-w-md" : "max-w-lg"}>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm"
        aria-describedby="contact-status"
      >
        <div className="grid gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-1">
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              required
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="María García"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-1">
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
                className={inputClass}
                placeholder="vos@empresa.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-200 mb-1">
                Teléfono (WhatsApp)
              </label>
              <input
                id="phone"
                name="phone"
                required
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="+54 9 11 0000-0000"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-slate-200 mb-1">
              ¿Qué querés mejorar?
            </label>
            <select
              id="service"
              name="service"
              required
              value={form.service}
              onChange={handleChange}
              className={inputClass + " cursor-pointer"}
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full border border-hive-yellow bg-hive-yellow px-5 py-2.5 text-base font-semibold text-slate-950 shadow-hive-glow hover:brightness-105 disabled:opacity-60 transition-all duration-200"
          >
            {isSubmitting ? "Enviando…" : "Quiero mi hoja de ruta gratuita"}
          </button>

          <p id="contact-status" className="text-sm text-slate-400 min-h-[1.25rem]">
            {status === "success" && (
              <span className="text-emerald-400">
                ¡Recibimos tu mensaje! Te respondemos en 1–2 días hábiles.
              </span>
            )}
            {status === "error" && (
              <span className="text-red-400">
                {errorMessage || "Algo salió mal. Intentá de nuevo o escribinos por WhatsApp."}
              </span>
            )}
          </p>
        </div>
      </form>

      {/* WhatsApp CTA */}
      <a
        href={`https://wa.me/${WA_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 w-full rounded-full border border-green-500 bg-green-500/10 px-5 py-3 text-base font-semibold text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200 no-underline"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        ¿Tenés prisa? Escribinos por WhatsApp
      </a>

      {/* Sin contratos badge */}
      <p className="mt-3 text-center text-xs text-slate-400">
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1">
          🔒 <strong className="text-slate-200">Sin contratos a largo plazo</strong> — solo trabajo que rinde
        </span>
      </p>
    </div>
  );
}
