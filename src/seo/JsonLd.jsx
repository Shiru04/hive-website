/**
 * Renders a JSON-LD structured-data script tag.
 * Works in both server and client components.
 */
export default function JsonLd({ schema }) {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
