# Setup Guide

## Quick Start

1. **Open the app**: Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
2. **No installation required**: This is a pure HTML/CSS/JavaScript app with no dependencies

## First Time Setup

### Adding Your First Teacher

1. Open `index.html` in your browser
2. Click "**+ Add New Teacher**"
3. Enter your name
4. You'll start with 2 basic cards (Kahoot! and Google Classroom)

### Adding More Teachers

- Click the logout button
- Return to the teacher selection screen
- Click "**+ Add New Teacher**" to add colleagues

## Importing Your Existing Card Data

If you have your 16 cards and teacher data in a Google Sheet, you can add them to the app:

### Option 1: Manual Entry (Quick)

Edit `js/data.js` and modify the `ALL_CARDS` array with your card data. Each card should have:

```javascript
{
    id: 1,
    name: "Tool Name",
    type: "Category",  // e.g., "Assessment", "LMS", "Game"
    icon: "🎯",        // Any emoji
    power: 85,         // 1-100
    defense: 70,       // 1-100
    speed: 90,         // 1-100
    description: "What the tool does...",
    pdCode: "UNIQUE2026"  // Unique code to redeem
}
```

Then update the `teachers` array with your teacher data:

```javascript
{
    id: 1,
    name: "Teacher Name",
    ownedCards: [1, 2, 5],  // Array of card IDs they own
    wins: 0,
    losses: 0
}
```

### Option 2: Google Sheets Integration (Future Enhancement)

This is on the roadmap! You'll be able to:
- Connect to your Google Sheet via API
- Automatically sync card ownership
- Update battle results back to the sheet

## Features Overview

### 📚 Card Collection
- View all available cards
- See which cards you own
- Click cards to see detailed stats
- Locked cards appear grayed out

### ⚔️ Battle System
- Challenge other teachers to battles
- Select your best card to use
- Watch the turn-based battle unfold
- Win battles to earn new random cards
- Battle results are saved (wins/losses)

### 🎓 Earn Cards

**Method 1: PD Codes**
- When you attend professional development, you'll receive a code
- Enter the code in the "Earn Cards" tab
- The card is immediately added to your collection

**Method 2: Classroom Usage**
- Select a tool you used with students
- Enter the date and describe how you used it
- Submit to earn that card

## Card Stats Explained

- **⚡ Power**: Attack strength (how much damage the card deals)
- **🛡️ Defense**: Defensive strength (reduces incoming damage)
- **⚡ Speed**: Determines who attacks first in battle

## Battle Mechanics

1. **Card Selection**: Each player selects one card
2. **Speed Check**: Faster card attacks first
3. **Turn-Based Combat**: Cards exchange attacks until one player reaches 0 HP
4. **Victory**: Winner gets their win count increased and may earn a random new card!

## Tips for Teachers

1. **Earn Cards**: Use a variety of tools with your students to build your collection
2. **Balance Your Deck**: Collect cards with different strengths (high power, high defense, high speed)
3. **Battle Strategy**: Choose cards based on your opponent's likely choices
4. **PD Codes**: Keep track of codes from professional development sessions

## Data Storage

- All data is stored in your browser's localStorage
- Data persists between sessions
- Each browser/device has separate data
- To reset: Clear browser data or use browser developer tools to clear localStorage

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (not supported)

## Troubleshooting

**Cards not appearing after earning them?**
- Refresh the page
- Make sure you're logged in as the correct teacher

**Lost all my data?**
- Data is stored in browser localStorage
- Clearing browser data will reset everything
- Consider exporting your data periodically (future feature)

**Battle not starting?**
- Make sure you've selected a card from your deck
- Check that both you and your opponent have cards

## Future Enhancements

- [ ] Google Sheets API integration
- [ ] Card trading between teachers
- [ ] Achievements and badges
- [ ] Leaderboard system
- [ ] Multiplayer battles (real-time)
- [ ] Custom card creation
- [ ] Export/import data
- [ ] Mobile app version
- [ ] Sound effects and animations
- [ ] Tournament mode

## Support

For issues or feature requests, please contact your tech coordinator or open an issue in the repository.
