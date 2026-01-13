# Site Update Guide

This guide explains how to update various parts of your portfolio site. The codebase has been organized into logical folders for easy navigation.

## 📁 Folder Structure

```
src/
├── data/              # All site content data
│   ├── siteData.js    # Personal info, stats, capabilities, philosophy
│   ├── projectsData.js # All project information
│   └── timelineData.js # Career timeline/experience
├── components/        # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── NavItem.jsx
│   ├── GlassCard.jsx
│   ├── SectionTitle.jsx
│   └── OrbitBackdrop.jsx
├── pages/            # Page components
│   ├── Landing.jsx
│   ├── AboutPage.jsx
│   ├── ProjectsPage.jsx
│   ├── ProjectDetail.jsx
│   ├── ResumePage.jsx
│   └── ContactPage.jsx
└── config/          # Configuration files
    ├── animationConfig.js
    └── backgroundConfig.js
```

---

## 🔧 How to Update Site Information

### 1. **Update Personal Information**

**File:** `src/data/siteData.js`

Edit the `SITE` object to update:
- `name` - Your full name
- `title` - Your professional title
- `summary` - Main bio/description
- `focus` - Your focus areas
- `location` - Your location
- `email` - Your email address
- `github` - Your GitHub profile URL
- `linkedin` - Your LinkedIn profile URL
- `resumeUrl` - Path to resume PDF (usually `/resume.pdf`)

**Example:**
```javascript
export const SITE = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  // ... etc
}
```

---

### 2. **Update Highlight Stats**

**File:** `src/data/siteData.js`

Edit the `HIGHLIGHT_STATS` array:

```javascript
export const HIGHLIGHT_STATS = [
  { label: 'Years shipping code', value: '8+' },
  { label: 'Primary focus', value: 'Your focus' },
  // Add or modify stats here
]
```

---

### 3. **Update Capabilities/Skills**

**File:** `src/data/siteData.js`

Edit the `CAPABILITIES` array:

```javascript
export const CAPABILITIES = [
  {
    title: 'Your Skill Area',
    text: 'Description of your expertise',
    tags: ['Technology1', 'Technology2', 'Technology3']
  },
  // Add more capability sections
]
```

---

### 4. **Update Philosophy/Design Principles**

**File:** `src/data/siteData.js`

Edit the `PHILOSOPHY` array:

```javascript
export const PHILOSOPHY = [
  'Your first principle',
  'Your second principle',
  'Your third principle'
]
```

---

### 5. **Add or Update Projects**

**File:** `src/data/projectsData.js`

Edit the `PROJECTS` array. Each project has this structure:

```javascript
{
  slug: 'project-url-slug',           // URL-friendly identifier
  title: 'Project Name',               // Display name
  tagline: 'Short tagline',           // Brief description
  summary: 'One-line summary',         // Short summary
  narrative: 'Detailed description',   // Full description
  category: 'featured',                // 'featured', 'systems', 'experiments', or 'research'
  timeline: '2025',                    // Year or date range
  status: 'Live pilot',                // Current status
  stack: ['Tech1', 'Tech2'],           // Technologies used
  highlights: [                         // Key achievements
    'Highlight 1',
    'Highlight 2'
  ],
  repo: 'https://github.com/...',      // Repository URL
  notion: null,                        // Notion link (or null)
  heroColor: '#2a375f'                 // Hex color for project accent
}
```

**To add a new project:**
1. Copy an existing project object
2. Modify all the fields
3. Add it to the `PROJECTS` array
4. The project will automatically appear on the Projects page

**To update an existing project:**
1. Find the project in the `PROJECTS` array by its `slug`
2. Update any fields you want to change
3. Save the file

---

### 6. **Update Career Timeline**

**File:** `src/data/timelineData.js`

Edit the `TIMELINE` array:

```javascript
export const TIMELINE = [
  {
    year: '2025',
    title: 'Your Job Title — Company Name',
    details: [
      'Achievement 1',
      'Achievement 2',
      'Achievement 3'
    ]
  },
  // Add more timeline entries
]
```

---

### 7. **Update Resume PDF**

**File:** `public/resume.pdf`

Simply replace the file `public/resume.pdf` with your updated resume. The site will automatically serve the new version.

**Note:** The resume path is configured in `src/data/siteData.js` as `SITE.resumeUrl`. By default it's `/resume.pdf`, which maps to `public/resume.pdf`.

---

### 8. **Update About Page Content**

**File:** `src/pages/AboutPage.jsx`

Edit the text content in the `AboutPage` component:

```javascript
<p>
  Your updated about text here...
</p>
```

---

### 9. **Update Contact Information**

Contact information is pulled from `SITE` in `src/data/siteData.js`. Update the `email`, `github`, and `linkedin` fields there.

---

## 🎨 Customization Notes

- **Colors:** The site uses a dark academia theme. Colors are defined in `src/styles/index.css`
- **Animations:** Background animations are configured in `src/config/backgroundConfig.js`
- **Styling:** The site uses Tailwind CSS. Classes can be modified in component files

---

## 🚀 After Making Changes

1. **Test locally:**
   ```bash
   npm run dev
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

---

## 📝 Quick Reference

| What to Update | File Location |
|---------------|--------------|
| Name, email, social links | `src/data/siteData.js` → `SITE` |
| Stats on landing page | `src/data/siteData.js` → `HIGHLIGHT_STATS` |
| Skills/capabilities | `src/data/siteData.js` → `CAPABILITIES` |
| Philosophy | `src/data/siteData.js` → `PHILOSOPHY` |
| Projects | `src/data/projectsData.js` → `PROJECTS` |
| Career timeline | `src/data/timelineData.js` → `TIMELINE` |
| Resume PDF | `public/resume.pdf` |
| About page text | `src/pages/AboutPage.jsx` |

---

## 🔒 Security Note

The site is secure from React Server Components vulnerabilities (CVE-2025-55182, etc.) because it uses React 18.3.1 and has no server-side rendering. All security fixes have been applied and pushed to GitHub.
