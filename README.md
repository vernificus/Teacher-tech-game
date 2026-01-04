# Teacher Tech Card Battle Game

A web app for teachers to "battle" each other in a Pokemon-style card game where cards represent instructional technology tools.

## 🎯 Features

- **📊 Google Sheets Integration**: Automatically syncs cards and teachers from your Google Sheet!
- **⚔️ Battle System**: Pokemon-style turn-based battles between teachers
- **🎴 Card Collection**: 19 instructional technology tools as collectible cards
- **👥 Staff Tracking**: 155+ staff members with tool access synced from your sheet
- **🔄 Real-time Sync**: Click the sync button to refresh from your Google Sheet
- **💾 Smart Caching**: Battle wins/losses preserved while card ownership updates
- **🎨 Pokemon-Themed UI**: Vibrant design with card stats (Power, Defense, Speed)

## 🚀 Getting Started

1. Open `index.html` in a web browser
2. App automatically loads data from Google Sheets
3. Select your teacher profile
4. View your card collection
5. Challenge another teacher to battle!

## 📊 Google Sheets Integration

**Your connected sheet:** EDTeck Deck Tracking

The app automatically:
- Loads 19 technology tool cards
- Syncs 155+ staff members
- Updates card ownership based on TRUE/FALSE values in your sheet
- Caches data for fast performance

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

## 🎮 Future Enhancements

- ✅ ~~Google Sheets Integration~~ (DONE!)
- Real-time multiplayer battles
- User authentication
- Advanced battle mechanics
- Card trading system
- Achievement system
- Leaderboard
- Write battle results back to Google Sheets
