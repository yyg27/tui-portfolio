# TUI ASCII ART GENERATOR PROMPT

This repository uses a high-resolution, inverted ASCII art for the profile photo in the `SystemCard` component. 

If you ever want to update the photo or generate a new one, LLMs (like Gemini, ChatGPT, or Claude) can easily create a Python script to do this or generate it directly if instructed properly.

## Requirements for the Perfect Match:
- **Width:** 100 columns (for high resolution and perfect 2/3 flex scaling).
- **Ramp:** Detailed character set to capture shadows smoothly.
- **Invert:** Must be optimized for Dark Mode (bright areas get characters, dark areas become spaces).

## The AI Prompt
Upload your target photo to the AI and paste the prompt below:

```text
I am building a Terminal (TUI) themed portfolio website with a dark background.
Please generate an ASCII art version of the attached photo for me (or write a Python script to do it).

I need the output to strictly follow these rules:
1. The width MUST be exactly 100 characters (columns).
2. Use a highly detailed character ramp/palette (e.g., `Ñ@#W$9876543210?!abc;:+=-,._ `).
3. The output MUST be optimized for "Dark Mode" (inverted): Dark areas, shadows, and the background in the photo should map to empty spaces or sparse characters (` `, `.`, `,`, `-`), while bright/illuminated areas (like the face) should map to dense characters (`@`, `Ñ`, `W`).
4. Output the final ASCII art (or code) strictly inside a single Markdown code block. Do NOT include any extra generic footers or advertising text.
```

## Applying the Result
Simply copy the resulting ASCII text and replace the string inside `src/components/Home/SystemCard/SystemCard.tsx`.
No CSS changes are needed.
