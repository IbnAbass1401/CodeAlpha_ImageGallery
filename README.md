# Lumina Gallery

A responsive, interactive image gallery with category filters and a full-screen lightbox, built with **HTML, CSS and vanilla JavaScript**.

> Task 1 of my Frontend Development internship at **CodeAlpha**.

![Lumina Gallery screenshot](images/project-screenshot.jpg)

## Features

- **Lightbox viewer**: click any image to open it full screen with its title, category and position (e.g. `3 / 8`)
- **Next / Previous navigation**: buttons, keyboard arrows (← →) and touch swipe on mobile
- **Category filters**: All, Nature, City, Space and Animals, with a live image count
- **Smooth animations**: staggered fade-in on load, image zoom and caption slide-up on hover, animated lightbox transitions
- **Fully responsive**: adapts from desktop to tablet to small phones
- **Keyboard and accessibility support**: Tab to focus cards, Enter to open, Esc to close, ARIA labels on controls
- **Graceful fallback**: if an image fails to load, a generated artwork placeholder appears instead of a broken icon

## Built With

| Technology | Used for |
|---|---|
| HTML5 | Semantic structure and the lightbox markup |
| CSS3 | Grid layout, custom properties, transitions, animations, media queries |
| JavaScript (ES6) | Rendering, filtering, lightbox logic, keyboard and touch events |

## Project Structure

```
image-gallery/
├── index.html   
├── style.css    
├── script.js    
└── README.md
```

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/image-gallery.git
   ```
2. Open the folder and double-click `index.html`, or run it with a local server such as the VS Code **Live Server** extension.

No installation or build step needed.

## What I Learned

- Building a layout with CSS Grid and `auto-fill`
- Managing state (current filter and current image) in plain JavaScript
- Handling keyboard, click and touch events
- Creating smooth transitions with CSS animations
- Writing accessible, responsive interfaces

## 👤 Author

**Abass A.**