// ================================================================
//  ARTICLES DATA
//  This is the ONLY file you need to edit to manage blog content.
//
//  HOW TO ADD AN ARTICLE:
//    Copy any article object below, paste it at the end of the
//    array (before the final ]), and fill in your details.
//
//  HOW TO ADD IMAGES:
//    Paste your image URL into the image: "" field.
//    For local images: put the file in /public/images/ and use
//    image: "/images/your-file.jpg"
//
//  LOGO:
//    Put your logo file in /public/images/icon.png
//
//  CATEGORIES: "Insights" | "Updates" | "Engineering"
// ================================================================

export type Category = "Insights" | "Updates" | "Engineering"

export interface Article {
  slug: string           // URL: /blog/this-value
  category: Category
  title: string
  excerpt: string
  image: string          // cover image URL — leave "" until ready
  publishedDate: string
  readTime: string
  author: {
    name: string         // author full name
    designation: string  // job title shown on card and article page
    image: string        // author photo URL — leave "" until ready
  }
  content: string        // full article — blank line = new paragraph
}

export const articles: Article[] = [

  // ──────────────────────────────────────────────────────────────
  //  INSIGHTS  (4 articles — shows as 2×2 grid)
  // ──────────────────────────────────────────────────────────────
  {
    slug: "future-of-privacy-first-analytics",
    category: "Insights",
    title: "The Future of Privacy-First Analytics",
    excerpt:
      "Exploring how digital analytics is evolving to respect user privacy while delivering actionable insights.",
    image: "",                        // ← paste cover image URL here
    publishedDate: "March 28, 2026",
    readTime: "6 min read",
    author: {
      name: "Dr. S. Ravi Kumar",      // ← edit name
      designation: "Founder & Managing Director",
      image: "",                      // ← paste author photo URL here
    },
    content: `Privacy-first analytics is no longer a niche concern — it is rapidly becoming the standard for responsible digital businesses.

As regulations like GDPR and CCPA tighten their grip, organisations are being forced to rethink how they collect and use data. But beyond compliance, there is a growing realisation that respecting user privacy can actually improve the quality of insights.

When users trust a platform, they engage more authentically. That authentic engagement produces cleaner, more meaningful data than surveillance-based approaches ever could.

At Cognera, we believe the future belongs to analytics platforms that treat privacy not as a constraint, but as a design principle. This means building systems that are transparent by default, minimal in data collection, and powerful in what they reveal.

The tools are already here. Differential privacy, federated learning, and on-device processing are maturing rapidly. The question now is not whether privacy-first analytics is possible — it is whether organisations have the will to embrace it.`,
  },

  {
    slug: "machine-learning-in-data-privacy",
    category: "Insights",
    title: "Machine Learning in Data Privacy",
    excerpt:
      "How ML algorithms can enhance data protection while maintaining analytical capabilities.",
    image: "",                        // ← paste cover image URL here
    publishedDate: "March 20, 2026",
    readTime: "8 min read",
    author: {
      name: "Dr. B. Radhakrishna",
      designation: "Chief Technology Officer",
      image: "",                      // ← paste author photo URL here
    },
    content: `Machine learning and data privacy are often portrayed as opposing forces. One demands vast amounts of data; the other demands restraint in its collection and use.

But this framing is outdated. A new generation of privacy-preserving machine learning techniques is dissolving this tension — and the results are remarkable.

Federated learning allows models to be trained across many devices without the underlying data ever leaving those devices. Differential privacy adds carefully calibrated noise to datasets, making it mathematically impossible to reverse-engineer individual records while preserving statistical accuracy.

These are not theoretical concepts. They are in production today at some of the world's largest technology companies. And as the underlying libraries mature and become more accessible, they will be within reach of organisations of every size.

The implication is clear: you no longer have to choose between powerful machine learning and rigorous privacy protection. With the right architecture, you can have both.`,
  },

  {
    slug: "understanding-consent-management",
    category: "Insights",
    title: "Understanding Consent Management Platforms",
    excerpt:
      "A clear breakdown of how modern consent management works and why it matters for your analytics strategy.",
    image: "",                        // ← paste cover image URL here
    publishedDate: "March 12, 2026",
    readTime: "5 min read",
    author: {
      name: "Anonymous",              // ← edit name
      designation: "Analytics Consultant",
      image: "",                      // ← paste author photo URL here
    },
    content: `Consent management has become one of the most misunderstood concepts in digital analytics. Many organisations treat it as a checkbox — a cookie banner slapped on top of existing infrastructure. That approach is both legally fragile and strategically wasteful.

A well-designed consent management platform does far more than collect yes/no signals. It creates a structured record of what each user agreed to, when, under which version of your privacy policy, and through which channel. That record is the foundation of everything that follows.

When consent is properly structured, it unlocks something valuable: the ability to segment your analytics by consent tier. Users who consented to full analytics give you one picture. Users who opted into basic functionality only give you another. The gap between those pictures tells you exactly where your consent rate is costing you insight — and lets you design smarter consent experiences to close that gap.

The organisations that treat consent as infrastructure rather than compliance overhead are the ones that will maintain analytical capability as privacy regulations tighten. Everyone else will be flying blind.`,
  },

  {
    slug: "cookieless-tracking-strategies",
    category: "Insights",
    title: "Cookieless Tracking: Strategies That Actually Work",
    excerpt:
      "As third-party cookies disappear, here are the approaches delivering real results for analytics teams.",
    image: "",                        // ← paste cover image URL here
    publishedDate: "March 5, 2026",
    readTime: "7 min read",
    author: {
      name: "Anonymous",              // ← edit name
      designation: "Data Strategy Lead",
      image: "",                      // ← paste author photo URL here
    },
    content: `The death of the third-party cookie has been predicted for years. Now it is finally arriving, and analytics teams that have not prepared are discovering a painful gap between what they used to measure and what they can measure today.

The good news: cookieless analytics is not only possible, it is in many ways superior to what came before. The strategies that work fall into three categories.

First-party data infrastructure is the foundation. If you are not capturing your own data — email sign-ups, account creation, purchase history — in a structured, queryable form, you are entirely dependent on third-party signals that are disappearing. Building this infrastructure now is non-negotiable.

Server-side tagging removes the dependency on browser-based tracking entirely. Instead of relying on a JavaScript tag firing in the user's browser, events are sent directly from your server to your analytics platform. This approach is more reliable, more accurate, and completely unaffected by ad blockers or browser restrictions.

Modelled attribution fills the gaps that direct measurement cannot. Using machine learning to infer conversion paths from partial signals produces estimates that, when validated carefully, are often more accurate than the overcounted last-click numbers analytics teams have been relying on for years.

The cookieless future is not a crisis. It is an opportunity to build measurement that you can actually trust.`,
  },

  // ──────────────────────────────────────────────────────────────
  //  UPDATES
  // ──────────────────────────────────────────────────────────────
  {
    slug: "building-trust-through-transparency",
    category: "Updates",
    title: "Building Trust Through Transparency",
    excerpt:
      "Why transparent data practices are essential for modern digital enterprises.",
    image: "",                        // ← paste cover image URL here
    publishedDate: "March 15, 2026",
    readTime: "5 min read",
    author: {
      name: "Anonymous",              // ← edit name
      designation: "Senior Data Analyst",
      image: "",                      // ← paste author photo URL here
    },
    content: `Trust is the currency of the digital economy. And right now, most organisations are deeply overdrawn.

Years of opaque data practices, surprise policy changes, and high-profile breaches have left users deeply sceptical of how their data is handled. Rebuilding that trust requires more than a privacy policy update — it requires a genuine cultural shift.

Transparency means telling users clearly what data you collect, why you collect it, and how long you keep it. It means giving them real control — not buried settings menus, but prominent, easy-to-use tools.

It also means being honest when things go wrong. Organisations that communicate breaches quickly and clearly consistently recover faster than those that delay or downplay.

At Cognera, transparency is built into our platform architecture. Every data collection event is logged, every retention policy is enforced automatically, and every user has a real-time view of what we hold about them.

This is not just the ethical approach. It is the smart business approach. Trusted platforms retain users. Trusted platforms attract partners. Trusted platforms grow.`,
  },

  {
    slug: "data-governance-best-practices",
    category: "Updates",
    title: "Data Governance Best Practices",
    excerpt:
      "Essential strategies for implementing robust data governance frameworks.",
    image: "",                        // ← paste cover image URL here
    publishedDate: "March 10, 2026",
    readTime: "7 min read",
    author: {
      name: "Anonymous",              // ← edit name
      designation: "Privacy Consultant",
      image: "",                      // ← paste author photo URL here
    },
    content: `Data governance is one of those terms that means everything and nothing. Ask ten executives to define it and you will get ten different answers.

At its core, data governance is about control: knowing what data you have, where it lives, who can access it, and what they are allowed to do with it.

In practice, this means building a data catalogue — a living inventory of every dataset in your organisation. It means establishing clear ownership, so that every dataset has a named person responsible for its quality and compliance. And it means implementing access controls that enforce those responsibilities automatically.

The most common mistake organisations make is treating governance as a one-time project. They build a catalogue, declare victory, and move on. Six months later, the catalogue is out of date and the governance framework has quietly collapsed.

Effective governance is a continuous process. It requires tooling that makes compliance easy, reporting that makes violations visible, and a culture that treats data quality as everyone's responsibility.

The organisations that get this right are not just better at compliance. They make better decisions, faster, because they can trust the data they are working with.`,
  },

  // ──────────────────────────────────────────────────────────────
  //  ENGINEERING
  // ──────────────────────────────────────────────────────────────
  {
    slug: "building-scalable-analytics-pipelines",
    category: "Engineering",
    title: "Building Scalable Analytics Pipelines",
    excerpt:
      "A deep dive into the architecture decisions behind Cognera's real-time data processing.",
    image: "",                        // ← paste cover image URL here
    publishedDate: "March 5, 2026",
    readTime: "10 min read",
    author: {
      name: "Engineering Team",       // ← edit name
      designation: "Platform Engineering",
      image: "",                      // ← paste author photo URL here
    },
    content: `When we set out to build Cognera's analytics pipeline, we had one non-negotiable requirement: it had to scale to billions of events per day without degrading the privacy guarantees we had promised our users.

That constraint shaped every architectural decision we made.

We chose an event-driven architecture built on Apache Kafka. Every user interaction generates an event that flows through a series of processing stages — anonymisation, aggregation, enrichment — before landing in our analytics store. Crucially, the raw event never persists. By the time data reaches storage, it has already been transformed into a form that cannot be traced back to an individual.

The aggregation layer is where the real engineering challenge lives. We needed to produce real-time analytics — dashboards that update within seconds — while applying differential privacy to every query result. Combining low latency with strong privacy guarantees required us to build custom operators on top of Apache Flink.

The result is a pipeline that processes 40 billion events per day, delivers query results in under two seconds, and provides mathematically proven privacy protection for every user whose data flows through it.

In future posts, we will go deeper into the specific techniques we use for real-time differential privacy. If you are working on similar problems, we would love to hear from you.`,
  },

  {
    slug: "api-design-for-privacy",
    category: "Engineering",
    title: "API Design for Privacy",
    excerpt:
      "How we designed Cognera's API to make privacy-preserving analytics the path of least resistance.",
    image: "",                        // ← paste cover image URL here
    publishedDate: "February 28, 2026",
    readTime: "9 min read",
    author: {
      name: "Engineering Team",       // ← edit name
      designation: "API Infrastructure",
      image: "",                      // ← paste author photo URL here
    },
    content: `Good API design makes the right thing easy and the wrong thing hard. When the right thing is privacy protection, that principle has profound implications.

Most analytics APIs are designed to maximise flexibility. They give developers access to raw event streams, individual user records, and granular behavioural data. Privacy is treated as an afterthought — a filter you can apply if you want to.

We took the opposite approach. Cognera's API is designed so that privacy-preserving queries are the default, and raw data access requires explicit justification and elevated permissions.

Every query that returns aggregate data automatically receives differential privacy treatment. The noise budget is managed server-side, so developers do not need to think about it. They just write their queries, and the privacy guarantees are applied automatically.

For cases where raw data is genuinely needed — debugging, model training, legal compliance — we provide a separate, audited access path that requires explicit consent from the data subjects, is logged immutably, and expires automatically.

This design means that a developer who is in a hurry and just wants to get their dashboard working will, by default, produce a privacy-preserving implementation. The secure path is the easy path.

That is the goal of privacy by design: not to make privacy a burden, but to make it invisible.`,
  },
]