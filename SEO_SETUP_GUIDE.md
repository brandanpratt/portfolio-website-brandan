# Portfolio SEO & Contact Form Setup Guide

## 🚀 Quick Start - Configuration Required

### 1. Set up Resend Email Service

Your contact form now uses **Resend** for professional email delivery on Vercel. Follow these steps:

#### Get Your Resend API Key:
1. Go to [https://resend.com](https://resend.com)
2. Sign up or log in with your account
3. Navigate to the **API Keys** section
4. Copy your API key

#### Add to Environment Variables:
1. Create a `.env.local` file in the project root (copy from `.env.example`)
2. Add your Resend API key:
   ```
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL=brandan.pratt1@gmail.com
   ```
3. Save the file

### 2. Deploy to Vercel

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import your repository
4. Add the environment variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `CONTACT_EMAIL`: Your email address
5. Deploy!

---

## ✅ SEO Improvements Made

### 🔍 On-Page SEO
- ✅ Comprehensive metadata with keywords
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Canonical URL configuration
- ✅ Viewport optimization
- ✅ Semantic HTML structure

### 📡 Technical SEO
- ✅ **Dynamic Sitemap** (`/sitemap.xml`) - Auto-generated for all sections
- ✅ **Robots.txt** - Proper crawling rules
- ✅ **Robots Metadata** - Programmatic bot instructions
- ✅ **JSON-LD Schema** - Person/Professional schema markup
- ✅ **Mobile-friendly** - Responsive design ready
- ✅ **Fast loading** - Optimized with Next.js

### 📧 Contact Form Enhancements
- ✅ **API-based form** - Replace mailto with backend processing
- ✅ **Email service** - Professional delivery via Resend
- ✅ **Error handling** - User-friendly error messages
- ✅ **Form validation** - Client & server-side validation
- ✅ **Success feedback** - Clear user confirmation
- ✅ **Vercel-ready** - Serverless functions support

---

## 📊 What Search Engines Will See

### Sitemap Structure
Your sitemap includes:
- Home page (Priority: 1.0)
- About section
- Services section
- Projects section
- Data Projects section
- Websites section
- Contact section

### Schema Markup
Google can now understand:
- Your name and profession
- Your social media profiles
- Your areas of expertise
- Your professional identity

---

## 🔧 How the Contact Form Works

### Before (Mailto)
```
User clicks → Email client opens → User composes → User sends
```

### After (Resend)
```
User submits form → API validates → Resend sends email → Confirmation shown
```

**Benefits:**
- Professional email formatting
- Reliable delivery
- No user email client required
- Better analytics
- Automatic retries

---

## 📝 Environment Variables Reference

```env
# Required for contact form
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=brandan.pratt1@gmail.com

# Optional but recommended
NEXT_PUBLIC_SITE_URL=https://portfolio-website-brandan.vercel.app
NEXT_PUBLIC_GITHUB_URL=https://github.com/brxn94
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/brxn94
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/brandan-pratt
```

---

## 🔗 Useful Links

- **Resend Dashboard**: https://resend.com
- **Vercel Dashboard**: https://vercel.com
- **Google Search Console**: https://search.google.com/search-console
- **Bing Webmaster Tools**: https://www.bing.com/webmaster

---

## ✨ Next Steps to Boost SEO Further

1. **Verify in Search Consoles:**
   - Google Search Console: Verify domain ownership
   - Bing Webmaster Tools: Submit sitemap

2. **Get an OG Image:**
   - Create a professional Open Graph image (1200x630px)
   - Save as `/public/og-image.jpg`

3. **Build Backlinks:**
   - Share projects on GitHub
   - Link from LinkedIn, Twitter
   - Guest posts or collaborations

4. **Monitor Performance:**
   - Check search rankings over time
   - Monitor click-through rates (CTR)
   - Track conversion from contact form

5. **Create More Content:**
   - Blog posts about projects
   - Technical documentation
   - Tutorials or guides

---

## 🐛 Troubleshooting

### Contact form not sending?
1. Check RESEND_API_KEY in `.env.local`
2. Verify CONTACT_EMAIL is correct
3. Check Vercel deployment logs
4. Test API route: `/api/send-email` (POST request)

### Sitemap not showing?
- Navigate to: `/sitemap.xml`
- Should see XML with all sections

### Not appearing in Google?
- Submit to Google Search Console
- Wait 1-2 weeks for initial crawl
- Check for any indexing errors

---

## 🎯 SEO Checklist for Your Portfolio

- [ ] Add Google Analytics
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Create professional OG image
- [ ] Test on Google's Mobile-Friendly Test
- [ ] Check PageSpeed Insights score
- [ ] Add FAQ schema (optional)
- [ ] Set up email confirmation notifications

---

**Last Updated**: May 2026
**Portfolio URL**: https://portfolio-website-brandan.vercel.app
