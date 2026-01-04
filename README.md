# Teacher Tech Lesson Planning Challenge

A web app where teachers create lesson plans using instructional technology tools and compete based on alignment with the LCPS Instructional Framework.

## 🎯 Features

- **📊 Google Sheets Integration**: Automatically syncs tools and teachers from your Google Sheet!
- **🎓 Lesson Planning Challenges**: Create lesson plans for real classroom scenarios
- **📐 LCPS Framework Alignment**: Tools rated on Student Centered, Design, Engage, Assess, and Reflect & Respond
- **🎴 Tool Collection**: 19 instructional technology tools with framework-aligned stats
- **👥 Staff Tracking**: 155+ staff members with tool access synced from your sheet
- **🔄 Real-time Sync**: Click the sync button to refresh from your Google Sheet
- **💾 Smart Caching**: Challenge records preserved while tool ownership updates
- **🎨 Engaging UI**: Vibrant design with LCPS Instructional Framework components

## 🚀 Getting Started

1. Open `index.html` in a web browser
2. App automatically loads data from Google Sheets
3. Select your teacher profile
4. View your tool collection
5. Create a lesson planning challenge with another teacher!

## 📊 Google Sheets Integration

**Your connected sheet:** EDTeck Deck Tracking

The app automatically:
- Loads 19 technology tools with LCPS Framework stats
- Syncs 155+ staff members
- Updates tool ownership based on TRUE/FALSE values in your sheet
- Caches data for fast performance
- Scores lesson plans against framework alignment

**Click 🔄 Sync** to refresh from your Google Sheet anytime!

See [GOOGLE-SHEETS-INTEGRATION.md](GOOGLE-SHEETS-INTEGRATION.md) for full details.

## 🛠 Technology Stack

- HTML5/CSS3/JavaScript (vanilla - no framework dependencies)
- Google Sheets CSV export (no API key needed!)
- Local storage for battle results
- Responsive design for desktop and mobile

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup and usage guide
- **[GOOGLE-SHEETS-INTEGRATION.md](GOOGLE-SHEETS-INTEGRATION.md)** - Google Sheets sync documentation
- **[CUSTOMIZATION.md](CUSTOMIZATION.md)** - How to customize cards and stats

## ✨ Current Technology Cards

Your 19 tools from the Google Sheet:
- Schoology, Magma Math, Kiddom Math, DiscoveryED, Lexia
- Adobe Express, Canva, Performance Matters, Phoenix Gradebook
- Nearpod, Brainpop, Wixie, Blooket, Newsela, WeVideo
- Ozobot, Gemini, Copilot, Student Choice

## 🎮 How It Works

1. **Select an opponent** from your teaching staff
2. **Receive a teaching scenario** (e.g., "Teach seasons to diverse learners in 25 minutes")
3. **Select 3-5 tools** from your collection to build the best lesson plan
4. **Get evaluated** on LCPS Framework alignment (Student Centered, Design, Engage, Assess, Reflect & Respond)
5. **See results** showing how well your lesson matches the scenario requirements

## 🏆 Scoring System

- Each tool has ratings (0-100) for each framework component
- Lesson plans are scored on how well tool combinations match scenario needs
- No random card rewards - winners are determined by pedagogical merit!
- Focuses on instructional design quality over luck

## 🎮 Future Enhancements

- ✅ ~~Google Sheets Integration~~ (DONE!)
- ✅ ~~LCPS Framework Alignment~~ (DONE!)
- More diverse teaching scenarios
- User authentication
- Custom scenario creation
- Tool trading system
- Achievement badges
- Leaderboard
- Write results back to Google Sheets

**Sources:**
- [LCPS Instructional Framework](https://www.lcps.org/o/dtl/page/instructional-framework-project-page)
