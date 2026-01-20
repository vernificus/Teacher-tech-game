# 🚀 Deployment Guide

This guide will help you deploy the Teacher Tech Card Battle game so teachers can access it via a web link.

## Quick Deploy Options

| Method | Difficulty | Time | Cost | Best For |
|--------|-----------|------|------|----------|
| **GitHub Pages** | ⭐ Easy | 2 min | FREE | You (already on GitHub!) |
| **Netlify** | ⭐ Easiest | 3 min | FREE | Drag-and-drop simplicity |
| **Vercel** | ⭐ Easy | 3 min | FREE | Auto-deploy from GitHub |
| **School Server** | ⭐⭐⭐ Hard | Varies | Free/Paid | Full control |

---

## 🎯 Method 1: GitHub Pages (RECOMMENDED)

**Best for you:** You're already using GitHub, this is the fastest path!

### Step-by-Step:

1. **Go to your GitHub repository:**
   ```
   https://github.com/vernificus/Teacher-tech-game
   ```

2. **Click "Settings"** (top menu bar)

3. **Click "Pages"** (left sidebar under "Code and automation")

4. **Under "Build and deployment":**
   - **Source:** Select "Deploy from a branch"
   - **Branch:** Select `claude/teacher-pokemon-card-game-boDkQ`
   - **Folder:** Select `/ (root)`
   - Click **Save**

5. **Wait 1-2 minutes** for GitHub to build the site

6. **Get your URL:**
   - GitHub will show: `https://vernificus.github.io/Teacher-tech-game/`
   - This is your live site!

7. **Share with teachers:**
   - Send them the link
   - They can bookmark it
   - Works on any device!

### Testing Your Deployment:

1. Visit the URL
2. You should see "Loading from Google Sheets..."
3. Teacher list appears
4. Done! ✅

### Updating After Changes:

1. Make changes to your code
2. Commit and push to the branch
3. GitHub Pages auto-updates in 1-2 minutes!

---

## 🌐 Method 2: Netlify

**Best for:** Drag-and-drop simplicity + custom domain options

### Step-by-Step:

1. **Go to [netlify.com](https://app.netlify.com)**

2. **Sign up** (free) - use "Sign up with GitHub" for easy connection

3. **Deploy options:**

   **Option A: Manual Deploy (Fastest)**
   - Click "Add new site" → "Deploy manually"
   - Zip your project folder OR drag the folder directly
   - Upload and wait ~30 seconds
   - Get your link: `https://random-name-12345.netlify.app`

   **Option B: Connect GitHub (Best for updates)**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select your repository: `vernificus/Teacher-tech-game`
   - Select branch: `claude/teacher-pokemon-card-game-boDkQ`
   - Click "Deploy"
   - Auto-deploys on every push! 🎉

4. **Customize URL (optional):**
   - Click "Site settings" → "Change site name"
   - Change to: `teacher-tech-battle` or similar
   - New URL: `https://teacher-tech-battle.netlify.app`

5. **Share with teachers!**

### Bonus Features:

- **Custom domain:** Add your school's domain (e.g., `battle.yourschool.edu`)
- **Analytics:** See how many teachers are using it
- **Forms:** Could add feedback forms later

---

## ⚡ Method 3: Vercel

**Best for:** Similar to Netlify, great performance

### Step-by-Step:

1. **Go to [vercel.com](https://vercel.com)**

2. **Sign up** with GitHub

3. **Click "New Project"**

4. **Import your repository:**
   - Select `vernificus/Teacher-tech-game`
   - Branch: `claude/teacher-pokemon-card-game-boDkQ`
   - Framework: None (it's vanilla HTML/JS)
   - Click "Deploy"

5. **Get your URL:**
   - `https://teacher-tech-game.vercel.app`

6. **Share with teachers!**

---

## 🏫 Method 4: School Web Server

**Best for:** Schools with IT department and web hosting

### Requirements:

- Access to school web server
- FTP or file upload capability
- School domain (e.g., `yourschool.edu/techbattle`)

### Steps:

1. **Download all project files:**
   - Download the repository as ZIP
   - Extract to a folder

2. **Upload to school server:**
   - Use FTP client (FileZilla, Cyberduck) or web interface
   - Upload all files to public web directory
   - Maintain folder structure!

3. **Set permissions:**
   - Ensure files are readable (644 for files, 755 for folders)

4. **Test:**
   - Visit: `https://yourschool.edu/path/to/techbattle/index.html`

5. **Share with teachers**

**⚠️ Note:** May require IT department assistance.

---

## 🔒 Security & Privacy

### What's Safe:

- ✅ No database - can't be hacked
- ✅ No user passwords stored
- ✅ No sensitive data transmitted
- ✅ Google Sheet is read-only
- ✅ Battle data stays in teacher's browser

### Google Sheets Security:

- Sheet must be "Anyone with link can view" for the app to work
- Only contains teacher names and tool access (nothing sensitive)
- App reads only - cannot write to sheet
- If concerned: Use teacher initials instead of full names

---

## 📱 Mobile Access

All deployment methods work on:
- ✅ Desktop computers
- ✅ Tablets (iPad, Android)
- ✅ Smartphones (iPhone, Android)
- ✅ Chromebooks

Teachers can:
- Bookmark the link
- Add to home screen (looks like an app!)
- Access from anywhere with internet

---

## 🎓 Recommended Setup for Schools

**For Small School (< 50 teachers):**
- Use GitHub Pages (free, simple)
- Share one link with all teachers
- Teachers bookmark it

**For Larger School/District:**
- Use Netlify or Vercel
- Get custom domain: `techbattle.yourschool.edu`
- Add to school portal/learning management system

**For Maximum Control:**
- Deploy to school web server
- Work with IT department
- Integrate with school SSO (future enhancement)

---

## 🔄 Updating Your Deployed Site

### GitHub Pages:
1. Make changes locally
2. Commit and push to branch
3. Wait 1-2 minutes
4. Site auto-updates! ✅

### Netlify (connected to GitHub):
1. Make changes locally
2. Commit and push
3. Netlify auto-deploys in ~30 seconds
4. Done! ✅

### Netlify (manual deploy):
1. Make changes locally
2. Go to Netlify dashboard
3. Drag updated folder to deploy area
4. Done! ✅

### Vercel:
1. Make changes locally
2. Commit and push
3. Auto-deploys in ~30 seconds
4. Done! ✅

---

## 🆘 Troubleshooting

### "Site not loading"
- Check if URL is correct
- Wait 2-3 minutes after deployment
- Clear browser cache (Ctrl+Shift+R)

### "Google Sheets not loading"
- Verify sheet is public ("Anyone with link can view")
- Check sheet URL in `js/sheets.js`
- Look at browser console (F12) for errors

### "Cards not appearing"
- Make sure teachers have TRUE values in sheet
- Click 🔄 Sync button to refresh
- Check browser console for errors

### "Site works on my computer but not deployed"
- Check all file paths are relative (not absolute)
- Verify all files uploaded
- Check file names are case-sensitive

---

## 📊 Monitoring Usage

### GitHub Pages:
- Use Google Analytics (can add to index.html)
- See traffic in GitHub Insights

### Netlify:
- Built-in analytics dashboard
- See visitor counts, popular pages
- Free tier includes basic analytics

### Vercel:
- Analytics dashboard available
- See real-time usage
- Performance metrics

---

## 💡 Pro Tips

1. **Bookmark for teachers:** Create a QR code linking to your site
2. **Email template:** Draft an email with instructions for teachers
3. **Training session:** Show teachers in PD session
4. **Feedback:** Add Google Form link for teacher feedback
5. **Updates:** Announce new features via email or staff meeting

---

## 📧 Sample Email to Teachers

```
Subject: 🎮 NEW: Teacher Tech Card Battle Game!

Hi Team!

We've launched an exciting new way to celebrate your tech skills!

🔗 Link: https://vernificus.github.io/Teacher-tech-game/

Battle your colleagues using the educational technology tools
you've mastered. The more tools you use with students, the more
cards you earn!

How to start:
1. Click the link
2. Find your name
3. View your card collection
4. Challenge a colleague to battle!

Your cards are based on the tools you've already been trained
on and use with students.

Have fun!
```

---

## 🎯 Quick Start Checklist

- [ ] Choose deployment method (recommend: GitHub Pages)
- [ ] Follow deployment steps
- [ ] Test the deployed site
- [ ] Verify Google Sheets sync works
- [ ] Test on mobile device
- [ ] Share link with 1-2 beta testers
- [ ] Gather feedback
- [ ] Share with all teachers
- [ ] Celebrate! 🎉

---

## Need Help?

If you get stuck:
1. Check the troubleshooting section
2. Look at browser console (F12) for errors
3. Verify Google Sheet is public
4. Try a different deployment method

---

**Recommended: Start with GitHub Pages!**

It's the easiest path since you're already using GitHub. Takes 2 minutes!
