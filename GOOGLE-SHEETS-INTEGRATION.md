# 📊 Google Sheets Integration Guide

Your Teacher Tech Card Battle app now **automatically syncs** with your Google Sheet!

## ✨ What's New

- **Auto-sync on startup**: Cards and teachers load from your sheet every time you open the app
- **🔄 Sync button**: Click to manually refresh data from your sheet
- **Smart caching**: Data is cached for 5 minutes to reduce loading time
- **Merge logic**: Preserves battle wins/losses while updating card ownership from the sheet

## 🔗 Your Connected Sheet

**Sheet Name:** EDTeck Deck Tracking
**Sheet ID:** `1KjM4zML5RhyDEsCPNyLFiBhLZa9p8iV7Jv6UYc6fLMY`

## 📋 How It Works

### Cards (Technology Tools)

Your Google Sheet has **21 technology tools** tracked. These automatically become cards in the game:

| Tool | Type | Stats |
|------|------|-------|
| Schoology | LMS | Power: 85, Defense: 90, Speed: 70 |
| Magma Math | Math | Power: 80, Defense: 75, Speed: 85 |
| Kiddom Math | Math | Power: 75, Defense: 80, Speed: 80 |
| DiscoveryED | Content | Power: 85, Defense: 80, Speed: 75 |
| Lexia | Literacy | Power: 90, Defense: 85, Speed: 70 |
| Adobe Express | Design | Power: 85, Defense: 70, Speed: 90 |
| Canva | Design | Power: 85, Defense: 70, Speed: 85 |
| Performance Matters | Assessment | Power: 90, Defense: 85, Speed: 75 |
| Phoenix Gradebook | Grading | Power: 80, Defense: 90, Speed: 70 |
| Nearpod | Interactive | Power: 85, Defense: 75, Speed: 90 |
| Brainpop | Content | Power: 80, Defense: 80, Speed: 85 |
| Wixie | Creativity | Power: 75, Defense: 75, Speed: 85 |
| Blooket | Game | Power: 90, Defense: 65, Speed: 95 |
| Newsela | Literacy | Power: 85, Defense: 80, Speed: 80 |
| WeVideo | Video | Power: 75, Defense: 70, Speed: 85 |
| Ozobot | Coding | Power: 80, Defense: 75, Speed: 90 |
| Gemini | AI | Power: 95, Defense: 70, Speed: 95 |
| Copilot | AI | Power: 95, Defense: 70, Speed: 95 |
| Student Choice | Flexible | Power: 70, Defense: 70, Speed: 90 |

### Teachers (Staff Members)

The app reads your staff list (155+ people) and:
- Creates a teacher profile for each person with at least one TRUE value
- Assigns cards based on TRUE values in your sheet
- Currently showing teachers who have access to tools

**Example:**
- If "Shade, Rachael" has TRUE for Performance Matters, Wixie, and Ozobot
- She gets those 3 cards in her collection
- She can use them to battle other teachers!

### Data Flow

```
Google Sheet (TRUE/FALSE values)
    ↓
App loads on startup
    ↓
Converts to Cards & Teachers
    ↓
Displays in game
    ↓
[User clicks Sync button]
    ↓
Refreshes from Sheet
```

## 🎮 Using the Integration

### On Startup

1. Open `index.html`
2. You'll see "Loading from Google Sheets..."
3. Data syncs automatically
4. Ready to play!

### Manual Sync

Click the **🔄 Sync** button in the header to:
- Pull latest changes from your Google Sheet
- Update card ownership
- Add new teachers who've gained access

### Offline Mode

If the Google Sheet is unavailable:
- App uses cached data (last successful load)
- Shows warning: "Using fallback data"
- Everything still works, just not up-to-date

## ✏️ Editing Your Sheet

### Adding/Removing Tool Access

**In Google Sheet:**
1. Find the teacher's row
2. Change FALSE to TRUE (or TRUE to FALSE)
3. Save the sheet

**In the App:**
1. Click 🔄 Sync button
2. Changes appear immediately!

### Adding New Tools

Currently, the 21 tools are hard-coded with stats. To add a new tool:

1. Add the column in your Google Sheet
2. Edit `js/sheets.js` and add to `TOOL_STATS` object:

```javascript
'Your New Tool': {
    type: 'Category',
    icon: '🎯',
    power: 80,
    defense: 75,
    speed: 85,
    description: 'What the tool does'
}
```

3. The app will automatically pick it up on next sync

### Adding New Teachers

Just add them to your Google Sheet! They'll appear in the game on next sync (if they have at least 1 TRUE value).

## 🔒 Data Privacy & Security

**What's Stored Where:**

| Data | Google Sheet | Browser localStorage |
|------|--------------|---------------------|
| Teacher names | ✅ | ✅ |
| Tool access (TRUE/FALSE) | ✅ | ✅ (cached) |
| Battle wins/losses | ❌ | ✅ |
| Card stats | ❌ | ✅ (hard-coded) |

**Important:**
- The app is **read-only** from Google Sheets
- It does NOT write battle results back to the sheet
- Battle data is stored locally in each user's browser
- No data leaves the user's device

## 🚀 Advanced: Writing Back to Sheets (Future)

If you want battle results saved to your Google Sheet, you'll need:

1. Google Sheets API credentials
2. OAuth authentication
3. Modification to enable write access

This requires more technical setup. Let me know if you want this feature!

## 🛠 Troubleshooting

### "Failed to sync" Error

**Possible causes:**
- Google Sheet is not public (check sharing settings)
- Internet connection lost
- Sheet was deleted or moved

**Solution:**
1. Make sure sheet is set to "Anyone with link can view"
2. Check internet connection
3. Verify the sheet URL is correct

### Teachers Not Appearing

**Cause:** Teachers need at least 1 TRUE value to appear in the game

**Solution:**
- Make sure teachers have TRUE for at least one tool
- Click 🔄 Sync to refresh

### Cards Show Wrong Stats

**Cause:** Stats are defined in `js/sheets.js`, not pulled from the sheet

**Solution:**
- Edit `TOOL_STATS` in `js/sheets.js`
- Refresh the page

### Wins/Losses Reset After Sync

**This shouldn't happen!** The merge logic preserves wins/losses.

If it does:
1. Check browser console for errors (F12 → Console)
2. Report the issue with details

## 📊 Sheet Format Requirements

Your Google Sheet should have:

**Columns:**
- Column A: Last Name
- Column B: First Name
- Columns C+: Tool names (TRUE/FALSE values)

**Rows:**
- Row 1: Headers
- Rows 2+: Staff data

The current integration works with your exact format! No changes needed.

## 🎯 Best Practices

1. **Keep sheet public**: Ensure "Anyone with link can view"
2. **Sync regularly**: Click 🔄 Sync after updating the sheet
3. **Test changes**: Make small changes and sync to verify
4. **Backup data**: Export your sheet periodically

## 💡 Tips

- The sync button shows ⏳ while loading
- Cached data expires after 5 minutes
- Browser refresh forces a fresh load from the sheet
- Multiple users can play simultaneously (each has their own battle data)

## 🎨 Customization

### Change Which Tools Appear

Edit `js/sheets.js` to filter which columns become cards:

```javascript
// Skip certain tools
const toolHeaders = headers.slice(2).filter(name => name !== 'Student Choice');
```

### Change Card Stats

Edit the `TOOL_STATS` object in `js/sheets.js` to adjust power, defense, speed for each tool.

### Change Sync Frequency

Edit the cache timeout:

```javascript
cacheTimeout: 10 * 60 * 1000 // 10 minutes instead of 5
```

## 🆘 Need Help?

The integration is now live! Try:

1. Opening the app - it should auto-load
2. Clicking 🔄 Sync - it should refresh
3. Checking browser console (F12) for any errors

**Common questions:**
- "Can I use a different sheet?" - Yes! Update `spreadsheetId` and `csvUrl` in `js/sheets.js`
- "Can I track multiple schools?" - Yes! Just point to a different sheet
- "Can users edit the sheet from the app?" - Not yet, but can be added!

---

**Your Google Sheets integration is ready! 🎉**

The app will now automatically sync your technology tool access tracking with the Pokemon card battle game!
