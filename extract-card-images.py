#!/usr/bin/env python3
"""
Extract individual card images from the EdTech Deck PDF
This script uses pdf2image and PIL to extract card images
"""

import os
from pathlib import Path

try:
    from pdf2image import convert_from_path
    from PIL import Image
except ImportError:
    print("⚠️  Required libraries not installed!")
    print("Please install them with:")
    print("  pip install pdf2image Pillow")
    print("\nOn Ubuntu/Debian, you may also need:")
    print("  sudo apt-get install poppler-utils")
    exit(1)

# Card positions on each page (approximate - may need adjustment)
# Each page has 3 cards in a row
# Format: (left, top, right, bottom) in pixels
CARD_LAYOUTS = {
    1: [  # Page 1: Schoology, MagmaMath, Kiddom, DiscoveryEd, Lexia, Adobe Express
        {'name': 'schoology', 'box': (95, 100, 350, 520)},
        {'name': 'magmamath', 'box': (350, 100, 605, 520)},
        {'name': 'kiddom', 'box': (605, 100, 860, 520)},
        {'name': 'discoveryed', 'box': (95, 770, 350, 1190)},
        {'name': 'lexia', 'box': (350, 770, 605, 1190)},
        {'name': 'adobe-express', 'box': (605, 770, 860, 1190)},
    ],
    3: [  # Page 3: Canva, Performance Matters, Phoenix, Nearpod, BrainPOP, Wixie
        {'name': 'canva', 'box': (95, 100, 350, 520)},
        {'name': 'performance-matters', 'box': (350, 100, 605, 520)},
        {'name': 'phoenix-gradebook', 'box': (605, 100, 860, 520)},
        {'name': 'nearpod', 'box': (95, 770, 350, 1190)},
        {'name': 'brainpop', 'box': (350, 770, 605, 1190)},
        {'name': 'wixie', 'box': (605, 770, 860, 1190)},
    ],
    5: [  # Page 5: Blooket, NewsELA, WeVideo, Ozobot, Gemini, Copilot
        {'name': 'blooket', 'box': (95, 100, 350, 520)},
        {'name': 'newsela', 'box': (350, 100, 605, 520)},
        {'name': 'wevideo', 'box': (605, 100, 860, 520)},
        {'name': 'ozobot', 'box': (95, 770, 350, 1190)},
        {'name': 'gemini', 'box': (350, 770, 605, 1190)},
        {'name': 'copilot', 'box': (605, 770, 860, 1190)},
    ],
    7: [  # Page 7: Student Choice cards
        {'name': 'student-choice', 'box': (95, 100, 350, 520)},
    ],
}

def extract_cards(pdf_path, output_dir, dpi=300):
    """Extract card images from PDF"""

    print(f"📄 Converting PDF to images (DPI: {dpi})...")
    pages = convert_from_path(pdf_path, dpi=dpi)

    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    extracted_count = 0

    for page_num, cards_layout in CARD_LAYOUTS.items():
        if page_num > len(pages):
            print(f"⚠️  Page {page_num} not found in PDF")
            continue

        page_image = pages[page_num - 1]  # Pages are 0-indexed
        print(f"\n📄 Processing page {page_num}...")

        for card in cards_layout:
            card_name = card['name']
            box = card['box']

            # Extract card region
            card_image = page_image.crop(box)

            # Save as PNG
            output_file = output_path / f"{card_name}.png"
            card_image.save(output_file, 'PNG', optimize=True)

            print(f"  ✅ Extracted: {card_name}.png ({card_image.width}x{card_image.height})")
            extracted_count += 1

    print(f"\n🎉 Successfully extracted {extracted_count} card images to {output_dir}/")
    print("\nNext steps:")
    print("1. Check the extracted images in images/cards/")
    print("2. Adjust crop boxes in this script if cards are not centered")
    print("3. Manually extract 'Kiddom Math' card (similar to Kiddom)")
    print("4. Test the web app with the new images!")

if __name__ == "__main__":
    pdf_file = "EdTech Deck - All Cards NEWEST.pdf"
    output_directory = "images/cards"

    if not os.path.exists(pdf_file):
        print(f"❌ Error: PDF file not found: {pdf_file}")
        print("Make sure the PDF is in the current directory")
        exit(1)

    print("🎴 EdTech Deck Card Extractor")
    print("=" * 50)

    extract_cards(pdf_file, output_directory, dpi=300)
