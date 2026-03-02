import SeoHead from "../seo/SeoHead.jsx";
import ContactForm from "../components/ContactForm.jsx";

export default function Contact() {
  return (
    <>
      <SeoHead
        title="Contact"
        description="Contact Hive Media to discuss performance marketing, web development or internal tools for your service business."
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact | Hive Media",
          "url": "https://hivemediastop.com/contact",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hivemediastop.com/" },
              { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://hivemediastop.com/contact" }
            ]
          }
        }}
      />
      <section className="pt-4 pb-10 grid gap-8 md:grid-cols-[3fr,2fr] items-start">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
            Contact Hive Media
          </h1>
          <p className="text-base text-slate-300 mb-4">
            Tell us about your business, your current marketing and what you
            want to improve. We will review your information and reply with
            next steps or a proposal for a strategy call.
          </p>
          <ul className="text-sm text-slate-400 space-y-1 mb-4">
            <li>• Answer within 1–2 business days.</li>
            <li>• No obligation. No spam.</li>
            <li>• We can communicate in English or Spanish.</li>
          </ul>
          <ContactForm />
        </div>

        <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
          <h2 className="text-base font-semibold text-slate-50 mb-2">
            What happens after you contact us?
          </h2>
          <ol className="list-decimal list-inside space-y-1 mb-4">
            <li>We read your message and check if we are a good fit.</li>
            <li>
              We may request access to your current website or ad account (view
              only) for context.
            </li>
            <li>
              We schedule a call to walk through priorities and potential next
              steps.
            </li>
          </ol>
          <p className="text-slate-400">
            If you prefer, we can also coordinate via email or WhatsApp after
            the first contact.
          </p>
        </aside>
      </section>
    </>
  );
}
