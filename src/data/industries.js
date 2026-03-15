export const INDUSTRIES = [
  {
    slug: "construction",
    title: "Digital Marketing for Construction Companies",
    shortTitle: "Construction",
    metaDescription:
      "Hive Media helps construction companies generate more qualified leads through Google Ads, SEO-optimized websites and lead management tools.",
    heroTagline: "More qualified leads for your construction business.",
    heroDescription:
      "Construction companies win jobs by being the first call, not the cheapest bid. We build the marketing engine that puts your business in front of property owners, general contractors and developers when they are actively looking for what you do.",
    painPoints: [
      {
        title: "Leads go cold before your team follows up",
        description:
          "By the time someone fills out a form or calls, they have already contacted two other companies. Without fast follow-up and a system to manage leads, you lose jobs to faster competitors.",
      },
      {
        title: "Your website does not reflect the quality of your work",
        description:
          "Most construction company websites were built five years ago and look like it. Visitors cannot tell what services you offer, what areas you serve, or why they should trust you.",
      },
      {
        title: "You are paying for ads but cannot track results",
        description:
          "You know you are spending money on Google Ads, but you have no idea how many of those clicks turned into estimates, proposals or closed jobs.",
      },
    ],
    solutions: [
      {
        title: "Google Ads campaigns built for construction leads",
        description:
          "We target high-intent keywords like 'commercial contractor near me' and 'construction company [city]' with ads that drive calls and form fills from people ready to hire.",
        serviceSlug: "google-ads",
      },
      {
        title: "A website that sells your expertise",
        description:
          "Fast, modern, mobile-first website that showcases your projects, explains your services clearly, and makes it easy for prospects to request a quote.",
        serviceSlug: "websites",
      },
      {
        title: "SEO that brings organic leads",
        description:
          "We optimize your site for local search terms and service-specific keywords so you show up when people search for contractors in your area.",
        serviceSlug: "seo",
      },
    ],
    relevantServices: ["google-ads", "websites", "seo", "internal-tools"],
  },
  {
    slug: "hvac",
    title: "Digital Marketing for HVAC Companies",
    shortTitle: "HVAC",
    metaDescription:
      "Hive Media helps HVAC companies generate more service calls and installation leads through Google Ads, fast websites and local SEO.",
    heroTagline: "Fill your schedule with high-value HVAC jobs.",
    heroDescription:
      "HVAC is one of the most competitive local service industries. Homeowners search, call the first company that shows up, and book. We make sure that company is yours.",
    painPoints: [
      {
        title: "Seasonal demand swings crush your cash flow",
        description:
          "Summer and winter are busy, but spring and fall can be dead. Without a consistent marketing system, you are either overwhelmed or scrambling for work.",
      },
      {
        title: "You are losing to competitors with worse service but better marketing",
        description:
          "Companies with fewer technicians and worse reviews are outranking you on Google because they invested in their online presence. Quality alone is not enough.",
      },
      {
        title: "Your team wastes time on unqualified leads",
        description:
          "You are getting calls from people outside your service area, tire-kickers asking for free estimates, or leads that go nowhere because there is no follow-up system.",
      },
    ],
    solutions: [
      {
        title: "Google Ads for emergency and scheduled services",
        description:
          "We run campaigns that capture 'AC repair near me' and 'HVAC installation' searches with ads that drive phone calls from homeowners ready to book.",
        serviceSlug: "google-ads",
      },
      {
        title: "A website built to convert HVAC leads",
        description:
          "Clean, fast website with service pages for each offering (repair, installation, maintenance), clear service areas, and prominent call-to-action buttons.",
        serviceSlug: "websites",
      },
      {
        title: "Local SEO for your service area",
        description:
          "We optimize your Google Business Profile, build local citations, and create service area content so you rank organically in your target markets.",
        serviceSlug: "seo",
      },
    ],
    relevantServices: ["google-ads", "websites", "seo", "analytics"],
  },
  {
    slug: "manufacturing",
    title: "Digital Marketing for Manufacturers & Industrial Companies",
    shortTitle: "Manufacturing",
    metaDescription:
      "Hive Media helps manufacturers and industrial companies generate B2B leads through targeted Google Ads, professional websites and lead management systems.",
    heroTagline: "B2B lead generation for manufacturers and industrial companies.",
    heroDescription:
      "Manufacturers sell differently — longer sales cycles, technical buyers, RFQ processes. Your marketing needs to match. We build systems that attract qualified B2B inquiries and help your sales team close them.",
    painPoints: [
      {
        title: "Your online presence does not match your capabilities",
        description:
          "You have millions in equipment and decades of expertise, but your website looks like it was built in 2010. Technical buyers judge your credibility online before they ever call.",
      },
      {
        title: "You rely on word-of-mouth and trade shows for new business",
        description:
          "Referrals and trade shows are great, but they are not scalable or predictable. You need a digital channel that consistently brings in new RFQs and inquiries.",
      },
      {
        title: "Your sales team cannot track where leads come from",
        description:
          "Without proper CRM and attribution, you do not know which marketing efforts are driving real business and which are wasting money.",
      },
    ],
    solutions: [
      {
        title: "Targeted Google Ads for B2B industrial searches",
        description:
          "We target specific manufacturing keywords and industry terms that technical buyers use — 'custom metal fabrication', 'CNC machining services', 'industrial supplier [region]'.",
        serviceSlug: "google-ads",
      },
      {
        title: "A professional website that builds credibility",
        description:
          "Modern, fast website showcasing your capabilities, certifications, equipment and past projects. Built to convert technical visitors into RFQ submissions.",
        serviceSlug: "websites",
      },
      {
        title: "Lead management and CRM tools",
        description:
          "Custom internal tools to track leads from first inquiry through the entire sales pipeline, with quoting, follow-up reminders and reporting.",
        serviceSlug: "internal-tools",
      },
    ],
    relevantServices: ["google-ads", "websites", "internal-tools", "analytics"],
  },
];

export function getIndustryBySlug(slug) {
  return INDUSTRIES.find((i) => i.slug === slug) || null;
}
