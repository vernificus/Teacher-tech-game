# Quick Card Image Extraction Guide

I can see your PDF! Here's the fastest way to extract the card images.

## 🎯 Quick Method: Screenshot Tool

### For Mac (Preview):
1. Open `EdTech Deck - All Cards NEWEST.pdf` in Preview
2. Use **⌘+Shift+4** to activate screenshot tool
3. Draw a rectangle around each card
4. Files save to Desktop automatically
5. Rename and move to `images/cards/`

### For Windows (Snipping Tool):
1. Open the PDF in Adobe/Browser
2. Press **Windows+Shift+S** for Snip & Sketch
3. Select rectangular snip
4. Draw around each card
5. Save with correct filename to `images/cards/`

### For Linux:
1. Use `gnome-screenshot -a` or Screenshot tool
2. Select each card area
3. Save to `images/cards/` with correct name

## 📋 Card Extraction Checklist

### Page 1 (Top Row):
- [ ] **Schoology** → `schoology.png`
- [ ] **MagmaMath** → `magma-math.png` ⚠️ Note the filename!
- [ ] **Kiddom** → `kiddom.png`

### Page 1 (Bottom Row):
- [ ] **DiscoveryEd** → `discoveryed.png`
- [ ] **Lexia** → `lexia.png`
- [ ] **Adobe Express** → `adobe-express.png`

### Page 3 (Top Row):
- [ ] **Canva** → `canva.png`
- [ ] **Performance Matters** → `performance-matters.png`
- [ ] **Phoenix Gradebook** → `phoenix-gradebook.png`

### Page 3 (Bottom Row):
- [ ] **Nearpod** → `nearpod.png`
- [ ] **BrainPOP** → `brainpop.png`
- [ ] **Wixie** → `wixie.png`

### Page 5 (Top Row):
- [ ] **Blooket** → `blooket.png`
- [ ] **NewsELA** → `newsela.png`
- [ ] **WeVideo** → `wevideo.png`

### Page 5 (Bottom Row):
- [ ] **Ozobot** → `ozobot.png`
- [ ] **Google Gemini** → `gemini.png`
- [ ] **Microsoft Copilot** → `copilot.png`

### Page 7:
- [ ] **Student Choice** → `student-choice.png` (take any one)

### ⚠️ MISSING CARD:
- [ ] **Kiddom Math** → `kiddom-math.png`
  - **Note:** This card is NOT in the PDF but IS in your Google Sheet
  - **Solution:** Either create a duplicate of the "Kiddom" card, or create a placeholder

## 🎨 Pro Tips

1. **Zoom to 150-200%** in your PDF viewer for clearer screenshots
2. **Keep aspect ratio** - cards should be roughly 2.5:3.5 ratio
3. **Include the whole card** - border to border
4. **Don't worry about perfection** - the app will resize them
5. **Skip the card backs** (pages 2, 4, 6, 8) - we only need fronts!

## ⚡ Even Faster: Automated Script

If you have Python installed, run:

```bash
pip install pdf2image Pillow
python3 extract-card-images.py
```

This will automatically extract all cards (you may need to install `poppler-utils` first).

## 🔍 Name Mapping Important!

Your Google Sheet uses these names, so filenames MUST match:

| Google Sheet Name | PDF Card Name | Filename Required |
|------------------|---------------|-------------------|
| Magma Math | MagmaMath | `magma-math.png` |
| Kiddom Math | *(not in PDF)* | `kiddom-math.png` |
| Newsela | NewsELA | `newsela.png` |
| Brainpop | BrainPOP | `brainpop.png` |

## ✅ When You're Done

1. You should have 19 PNG files in `images/cards/`
2. Open `index.html` in your browser
3. Your custom cards should appear!
4. If a card doesn't show, it falls back to the emoji icon

## 🚀 Deploy

Once images look good:
```bash
git add images/cards/*.png
git commit -m "Add custom card images extracted from PDF"
git push
```

Your GitHub Pages site will automatically update with the beautiful card designs!
