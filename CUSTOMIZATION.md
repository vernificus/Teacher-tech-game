# Customization Guide

This guide will help you customize the app with your own cards and teacher data.

## Adding Your 16 Cards

Open `js/data.js` and find the `ALL_CARDS` array. Replace the sample cards with your own:

### Card Template

```javascript
{
    id: 1,                    // Unique number (1-16)
    name: "Kahoot!",         // Tool name
    type: "Assessment",       // Category/type
    icon: "🎯",              // Emoji icon
    power: 85,               // Attack stat (1-100)
    defense: 70,             // Defense stat (1-100)
    speed: 90,               // Speed stat (1-100)
    description: "Brief description of what the tool does",
    pdCode: "KAHOOT2026"     // Unique redemption code
}
```

### Choosing Stats

**Balanced Approach** (recommended):
- Total stats should be around 200-250 per card
- Power: 60-90
- Defense: 60-90
- Speed: 60-90

**Varied Approach** (more interesting):
- Create specialists: high power/low defense, or high defense/low speed
- This creates strategic choices in battles

### Choosing Card Types

Suggested categories for educational tools:
- Assessment (Kahoot, Quizlet, etc.)
- LMS (Google Classroom, Canvas, etc.)
- Interactive (Nearpod, Peardeck, etc.)
- Video (Flipgrid, Edpuzzle, etc.)
- Collaboration (Padlet, Jamboard, etc.)
- Game (Gimkit, Blooket, etc.)
- Design (Canva, Adobe Spark, etc.)
- Coding (Scratch, Code.org, etc.)
- Portfolio (Seesaw, etc.)
- Recording (Screencastify, etc.)

### Icon Selection

Use emojis that represent the tool:
- 🎯 Assessment/targets
- 📚 Learning/books
- 📱 Mobile/apps
- 🎥 Video
- 📝 Writing/notes
- 🎮 Games
- 🎨 Creative/design
- 💻 Technology/coding
- 📊 Data/analytics
- ⚔️ Competition/battles

Find more emojis at: https://emojipedia.org/

## Adding Your Teachers

In the same `data.js` file, find the `teachers` array:

```javascript
let teachers = [
    {
        id: 1,                      // Unique number
        name: "Ms. Johnson",        // Teacher name
        ownedCards: [1, 2, 5, 10], // Array of card IDs they own
        wins: 0,                    // Battle wins (start at 0)
        losses: 0                   // Battle losses (start at 0)
    }
];
```

### Tips for Initial Setup

1. **Give everyone starter cards**: Give each teacher 2-4 cards to start
2. **Distribute fairly**: Don't give someone all the powerful cards
3. **Reflect reality**: If a teacher is known for using a tool, give them that card

## Importing from Google Sheets

If you have your data in a Google Sheet:

### Sheet Format

**Cards Sheet:**
| ID | Name | Type | Icon | Power | Defense | Speed | Description | PD Code |
|----|------|------|------|-------|---------|-------|-------------|---------|
| 1 | Kahoot! | Assessment | 🎯 | 85 | 70 | 90 | Description... | KAHOOT2026 |

**Teachers Sheet:**
| ID | Name | Owned Cards | Wins | Losses |
|----|------|-------------|------|--------|
| 1 | Ms. Johnson | 1,2,5,10 | 0 | 0 |

### Manual Import Steps

1. Export your Google Sheet as CSV
2. Use this template to convert to JavaScript:

```javascript
// For each card row:
{
    id: [ID from sheet],
    name: "[Name]",
    type: "[Type]",
    icon: "[Icon]",
    power: [Power],
    defense: [Defense],
    speed: [Speed],
    description: "[Description]",
    pdCode: "[PD Code]"
},

// For each teacher row:
{
    id: [ID],
    name: "[Name]",
    ownedCards: [[Owned Cards as array]],
    wins: [Wins],
    losses: [Losses]
},
```

## Customizing Appearance

### Colors

Edit `styles/main.css` and change the CSS variables at the top:

```css
:root {
    --primary-color: #ffcb05;      /* Yellow/gold */
    --secondary-color: #3d7dca;    /* Blue */
    --accent-color: #ff0000;       /* Red */
    --dark-bg: #2c3e50;            /* Dark blue-gray */
    --light-bg: #ecf0f1;           /* Light gray */
}
```

### Your School Colors

Example for different color schemes:

**School Colors (Blue & Gold):**
```css
--primary-color: #FFD700;  /* Gold */
--secondary-color: #003366; /* Navy Blue */
--accent-color: #FFD700;    /* Gold */
```

**School Colors (Red & White):**
```css
--primary-color: #CC0000;  /* Red */
--secondary-color: #FFFFFF; /* White */
--accent-color: #CC0000;    /* Red */
```

## Customizing Text

### Change the Title

Edit `index.html`, line 10:
```html
<h1>⚡ Your School Tech Battle ⚡</h1>
```

### Change Welcome Messages

Search for text in `index.html` and update as needed.

## PD Codes

### Creating Codes

Make your PD codes:
- **Memorable**: KAHOOT2026, NEARPOD2026
- **Unique**: Each card needs a different code
- **Easy to type**: Avoid special characters
- **Year-specific**: Include the year to track

### Distributing Codes

Ideas for distributing PD codes:
1. Give out at end of PD sessions
2. Email after teacher uses tool with students
3. Print on certificates
4. Share in staff meetings
5. Post in teacher lounge

## Testing Your Changes

After editing `js/data.js`:

1. Save the file
2. Open `index.html` in your browser
3. If you had previous data, you may need to:
   - Clear browser cache
   - Use incognito/private mode
   - Or open browser developer tools (F12) → Application → Local Storage → Clear

## Backup Your Data

Before making changes:
1. Copy your current `data.js` file
2. Save it as `data.js.backup`
3. Make your changes to the original
4. If something breaks, restore from backup

## Advanced Customization

### Adding New Fields

You can add custom fields to cards:

```javascript
{
    id: 1,
    name: "Kahoot!",
    // ... other fields ...
    difficulty: "Beginner",      // Custom field
    subjects: ["Math", "Science"], // Custom field
    gradeLevel: "3-12"            // Custom field
}
```

Note: You'll need to modify the display code to show these fields.

### Changing Battle Mechanics

Edit `js/battle.js` and modify the `calculateDamage()` function to change how battles work.

Current formula:
```javascript
damage = (power / defense) * 50 * speedBonus * randomFactor
```

You could change this to weight different stats more or less.

## Need Help?

If you run into issues:
1. Check the browser console for errors (F12 → Console)
2. Make sure your JavaScript syntax is correct (commas, brackets, etc.)
3. Validate your JSON structure
4. Start with small changes and test frequently

## Example: Complete Card Entry

Here's a complete example with all fields filled in:

```javascript
{
    id: 17,
    name: "Desmos",
    type: "Math",
    icon: "📐",
    power: 80,
    defense: 75,
    speed: 85,
    description: "Interactive graphing calculator for exploring mathematics. Create beautiful visualizations and help students understand functions.",
    pdCode: "DESMOS2026"
}
```

Remember to:
- Increment the ID (make it unique)
- Match the type to your categories
- Keep total stats around 200-250
- Write a helpful description
- Create a unique PD code
