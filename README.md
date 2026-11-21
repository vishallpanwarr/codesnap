# CodeSnap Studio ✨

A sleek, browser-based **code-to-image generator** inspired by `codeimg.io`. Turn code snippets into crisp, customizable screenshots with automatic language/extension detection, multi-tab macOS window chrome, transparent background support, and batch numerical sequence rendering.

![License](https://img.shields.io/badge/license-MIT-violet)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Features

- **Smart Language & Extension Sync**: Automatically detects the programming language as you type or paste code and updates the tab's file extension and inline SVG language logo (25+ file extensions supported).
- **Multi-Tab macOS Window Chrome**: Add, switch, close, and click directly on tab filenames to rename them inline. Customize traffic light styles (`Filled`, `Outline`, `Monochrome`, `Hidden`), corner radius, drop shadow, and optional watermark.
- **Pixel-Aligned Line Numbering**: Toggle line numbers on/off with a single click and customize the starting line number—dynamically measured per line so wrapped lines never drift.
- **8 Syntax Themes & Studio Vibes**: Includes *GitHub Dark*, *Dracula*, *Night Owl*, *Monokai*, *Nord*, *Tokyo Night*, *SynthWave '84*, and *Solarized Light*, plus one-click studio vibe presets.
- **Custom Backgrounds & Transparent Mode (`No BG`)**: Choose from curated gradients, build custom two-stop gradients with angle control, or remove the background completely for alpha-transparent PNG/SVG exports.
- **Batch Number Sequence Generator**: Automatically scan numeric values in your code and render a stepped sequence of PNG images in one click.
- **High-DPI Export & Clipboard Copy**: Export at `1x`, `2x`, or `4x` resolution as **PNG**, download vector **SVG**, or copy directly to your clipboard (`Ctrl/Cmd + S` to export PNG).

## Project Structure

```text
├── index.html   # App layout and external font/library links
├── styles.css   # Scoped syntax themes, macOS tab bar, and checkerboard transparency styles
├── app.js       # Editor state, auto-detection engine, batch renderer, and html-to-image export
└── README.md    # Documentation
```

<img width="632" height="287" alt="preview" src="https://github.com/user-attachments/assets/4e3644df-955d-4db3-b2c7-5945aeb05b00" />

## Getting Started

No build step or `npm install` is required—everything runs natively in the browser!

1. **Clone the repository**

   ```bash
   git clone https://github.com/vishallpanwarr/codesnap.git
   cd codesnap
   ```

2. **Open locally**

   - Open `index.html` directly in any modern browser, or
   - Serve with a local dev server (e.g., VS Code **Live Server** or `npx serve .`).

## Deploy to GitHub Pages (Free Hosting)

1. Push `index.html`, `styles.css`, `app.js`, and `README.md` to your GitHub repository.
2. Go to **Settings → Pages** in your repository.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Choose `main` (or `master`) and `/ (root)`, then click **Save**.
5. Your live site will be available at `https://vishallpanwarr.github.io/codesnap/`.

## Built With

- [Tailwind CSS (CDN)](https://tailwindcss.com/) — Utility styling
- [Highlight.js](https://highlightjs.org/) — Real-time syntax highlighting
- [html-to-image](https://github.com/bubkoo/html-to-image) — Client-side PNG, SVG, and Blob rendering
- [Google Fonts](https://fonts.google.com/) — *Inter*, *JetBrains Mono*, *Fira Code*, and *Source Code Pro*

## License

This project is open source and available under the [MIT License](LICENSE).
