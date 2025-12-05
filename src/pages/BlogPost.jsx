import { useParams, Link } from "react-router-dom";
import SeoHead from "../seo/SeoHead.jsx";

const POSTS = [
  {
    slug: "designing-a-lead-engine-for-service-businesses",
    title: "Designing a Lead Engine for Service Businesses",
    date: "2025-01-10",
    readTime: "7 min",
    body: [
      "A lead engine is the combination of your website, campaigns, tracking and internal processes that takes a stranger from first click to signed agreement.",
      "Most service businesses treat each piece in isolation: the website is one project, the ads are another, and the way leads are handled is left to spreadsheets and chat messages.",
      "At Hive Media, we prefer to design the entire path: where the traffic comes from, what people see and read, how they contact you, and how your team handles that lead in the next hours and days."
    ]
  },
  {
    slug: "google-ads-for-hvac-and-home-services",
    title: "Google Ads for HVAC and Home Services: What Actually Matters",
    date: "2025-01-18",
    readTime: "6 min",
    body: [
      "For HVAC and home services, Google Ads works best when it is treated as a system, not a set of isolated campaigns.",
      "The most important elements are: clear targeting of service areas, proper call and form tracking, and alignment between ad copy, landing pages and what your team actually delivers.",
      "We often start by cleaning the account, removing low-quality keywords and tightening match types before introducing any advanced bidding strategies."
    ]
  },
  {
    slug: "why-your-website-isnt-converting-and-how-to-fix-it",
    title: "Why Your Website Is Not Converting (and How to Fix It)",
    date: "2025-02-02",
    readTime: "8 min",
    body: [
      "Many websites receive enough traffic to generate consistent leads, but conversions stay low because visitors are confused or distracted.",
      "We look at clarity first: above-the-fold messaging, service explanation, social proof and visible calls to action.",
      "Then we fix technical issues: page speed, mobile rendering and tracking. Only after that we start testing new sections or layouts."
    ]
  }
];

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <SeoHead
          title="Article not found"
          description="The article you are looking for could not be found."
        />
        <section className="pt-4 pb-10 max-w-3xl">
          <h1 className="text-xl font-semibold mb-2">Article not found</h1>
          <p className="text-base text-slate-300 mb-4">
            The article you tried to open does not exist or has been moved.
          </p>
          <Link to="/blog" className="text-base text-hive-yellow">
            ← Back to blog
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <SeoHead
        title={post.title}
        description={post.body[0]}
        ogType="article"
      />
      <section className="pt-4 pb-10 max-w-3xl">
        <Link
          to="/blog"
          className="text-sm text-slate-400 hover:text-hive-yellow"
        >
          ← Back to blog
        </Link>
        <h1 className="text-2xl sm:text-3xl font-semibold mt-3 mb-2">
          {post.title}
        </h1>
        <p className="text-[11px] text-slate-400 mb-4">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span className="mx-1">•</span>
          <span>{post.readTime} read</span>
        </p>
        <div className="space-y-3 text-base text-slate-300">
          {post.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
