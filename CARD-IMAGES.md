# Adding Card Images to Your Teacher Tech Game

This guide explains how to add custom card images to replace the emoji icons in your Teacher Tech Card Battle application.

## 📁 Directory Structure

Card images should be placed in the `images/cards/` directory. The directory has already been created for you.

```
Teacher-tech-game/
├── images/
│   └── cards/
│       ├── schoology.png
│       ├── magma-math.png
│       ├── kiddom-math.png
│       └── ... (other card images)
```

## 🖼️ Extracting Images from Your PDF

You have a PDF file called "EdTech Deck - All Cards NEWEST.pdf" with card designs. Here's how to extract individual card images:

### Option 1: Using Adobe Acrobat (Recommended)

1. Open "EdTech Deck - All Cards NEWEST.pdf" in Adobe Acrobat
2. Go to **Edit > Take a Snapshot**
3. Select each card individually
4. Right-click and choose **Copy Image**
5. Paste into an image editor (Paint, Photoshop, etc.)
6. Save as PNG with the correct filename (see naming convention below)

### Option 2: Using Online PDF Tools

1. Go to a site like **pdf2png.com** or **ilovepdf.com**
2. Upload your PDF file
3. Convert each page to PNG images
4. Crop individual cards using an image editor
5. Save with the correct filename (see naming convention below)

### Option 3: Using Preview (Mac)

1. Open the PDF in Preview
2. Select the **Rectangular Selection Tool**
3. Draw a box around each card
4. Copy (⌘+C) and paste (⌘+V) to create a new image
5. Export as PNG with the correct filename

### Option 4: Using GIMP (Free, Cross-Platform)

1. Open GIMP
2. File > Open and select your PDF
3. Import each page
4. Use the Rectangle Select Tool to select each card
5. Edit > Copy, then Edit > Paste as > New Image
6. File > Export As > PNG with the correct filename

## 📝 File Naming Convention

**IMPORTANT:** Card image filenames must match the tool names from your Google Sheet, converted to lowercase with spaces replaced by hyphens.

### Card Name Mapping

| Tool Name (from Google Sheet) | Image Filename |
|------------------------------|----------------|
| Schoology | `schoology.png` |
| Magma Math | `magma-math.png` |
| Kiddom Math | `kiddom-math.png` |
| DiscoveryED | `discoveryed.png` |
| Lexia | `lexia.png` |
| Adobe Express | `adobe-express.png` |
| Canva | `canva.png` |
| Performance Matters | `performance-matters.png` |
| Phoenix Gradebook | `phoenix-gradebook.png` |
| Nearpod | `nearpod.png` |
| Brainpop | `brainpop.png` |
| Wixie | `wixie.png` |
| Blooket | `blooket.png` |
| Newsela | `newsela.png` |
| WeVideo | `wevideo.png` |
| Ozobot | `ozobot.png` |
| Gemini | `gemini.png` |
| Copilot | `copilot.png` |
| Student Choice | `student-choice.png` |

## 🎨 Image Requirements

For best results, your card images should meet these specifications:

- **Format:** PNG (supports transparency) or JPG
- **Recommended Size:** 500px wide × 700px tall (standard playing card ratio)
- **Minimum Size:** 250px wide × 350px tall
- **Aspect Ratio:** 5:7 (playing card standard) or similar
- **File Size:** Under 500KB per image for fast loading
- **Background:** Can include card backs in PDF, but only extract the front of each card

## 🚀 Adding Images to Your App

1. Extract individual card images from your PDF using one of the methods above
2. Save each image with the correct filename (lowercase, hyphens instead of spaces)
3. Copy all 19 card images to the `images/cards/` directory
4. The app will automatically use the images instead of emoji icons
5. If an image fails to load, it will automatically fall back to the emoji icon

## 🔄 How It Works

The app is already configured to use images. Here's what happens:

1. **Image Available:** If `images/cards/[toolname].png` exists, the app displays it
2. **Image Missing:** If the image doesn't exist or fails to load, the app shows the emoji icon
3. **No Code Changes Needed:** Just add the images to the `images/cards/` folder!

## ✅ Testing Your Images

1. Add your card images to `images/cards/`
2. Open `index.html` in a web browser
3. Log in as any teacher
4. Go to "My Collection"
5. Your card images should appear instead of emoji icons!

## 🎯 Quick Start Checklist

- [ ] Extract 19 card images from your PDF
- [ ] Rename each image according to the naming convention above
- [ ] Ensure all images are PNG or JPG format
- [ ] Copy all images to the `images/cards/` directory
- [ ] Test in your browser
- [ ] Commit and push to deploy to GitHub Pages

## 📸 Example: Extracting One Card

Let's say you want to extract the **Schoology** card:

1. Open your PDF to the page with the Schoology card
2. Use the snapshot/selection tool to select just the card (not the background)
3. Copy the selection
4. Paste into an image editor
5. Crop to just the card if needed
6. Save as `schoology.png`
7. Move to `images/cards/schoology.png`
8. Refresh your browser - the Schoology card now shows your custom image!

## 🔧 Troubleshooting

### Image doesn't appear
- Check that the filename matches exactly (lowercase, hyphens, .png extension)
- Verify the image is in the `images/cards/` directory
- Check browser console for any error messages
- Make sure the image file isn't corrupted

### Image looks stretched or distorted
- Check the aspect ratio (should be close to 5:7)
- Try using `object-fit: contain` or `cover` in CSS
- Ensure minimum dimensions (250px × 350px)

### Some images work, others don't
- Verify all filenames match the naming convention
- Check that all images are valid PNG or JPG files
- Look for typos in filenames

## 💡 Tips

- Keep your original PDF as a backup
- Use PNG format for best quality
- Consider batch processing if using image editing software
- Test on different browsers (Chrome, Firefox, Safari)
- Compress images if they're over 500KB each

## 🎉 That's It!

Once you've added your card images, your Teacher Tech Card Battle will display your custom-designed cards instead of emoji icons. The app is already set up to handle this automatically - just add the images and enjoy!
