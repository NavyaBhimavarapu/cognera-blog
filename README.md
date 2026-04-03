# Cognera Blog

A Next.js blog for Cognera — digital analytics and privacy-first data solutions.

---

## Setup (run these once)

```bash
npm install
npm run dev
```

Then open: http://localhost:3000

---

## The only file you need to edit: `data/articles.ts`

Everything — article content, author names, designations, images, dates — lives here.

### Adding your logo
Place your logo file at:
```
public/images/cognera-logo.png
```
The site shows a fallback "C" circle until you add it.

### Adding article images
Paste the URL into the `image: ""` field in `data/articles.ts`:
```ts
image: "https://your-cdn.com/cover.jpg",
// or for local files in /public/images/:
image: "/images/cover.jpg",
```

### Editing author details
```ts
author: {
  name: "Dr. S. Ravi Kumar",        // ← change this
  designation: "Founder & MD",      // ← change this
  image: "",                        // ← paste photo URL here
},
```

### Adding a new article
Copy any article block in `data/articles.ts`, paste it at the end of the array, and fill in the fields.

### Categories
Use exactly one of: `"Insights"` | `"Updates"` | `"Engineering"`

---

## Adding external image domains

If your images are hosted on an external CDN (e.g. Cloudinary, S3), add the domain to `next.config.js`:

```js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'res.cloudinary.com' },
  ],
},
```

---

## File structure

```
cognera/
├── data/
│   └── articles.ts          ← EDIT THIS — all content lives here
├── components/
│   ├── BlogHeader.tsx        ← animated header with orbs
│   ├── BlogCard.tsx          ← article card (dark/light split)
│   ├── CategoryFilter.tsx    ← filter tabs
│   └── LogoTransition.tsx    ← logo overlay on "Read Article" click
├── app/
│   ├── layout.tsx            ← root layout
│   ├── page.tsx              ← redirects / → /blog
│   ├── globals.css
│   └── blog/
│       ├── page.tsx          ← blog listing page
│       └── [slug]/
│           └── page.tsx      ← individual article page
├── public/
│   └── images/
│       └── cognera-logo.png  ← place your logo here
└── package.json
```
