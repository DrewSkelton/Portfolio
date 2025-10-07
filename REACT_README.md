# Netflix-Style Portfolio Carousel

A modern React-based carousel component inspired by Netflix's design, featuring your portfolio projects with tech stacks, descriptions, and interactive links.

## Features

- 🎬 **Netflix-style horizontal scrolling** with smooth animations
- 🎨 **Modern dark theme** with Netflix-inspired colors and gradients
- 📱 **Fully responsive** design for mobile and desktop
- 🔗 **Interactive project cards** with tech stacks and live links
- 🎯 **Navigation controls** with previous/next buttons and dot indicators
- ⚡ **Smooth hover effects** and card scaling animations
- 🎭 **Category badges** and highlight indicators for special projects
- 🖼️ **Image fallbacks** for projects without screenshots

## Project Cards Include

- **Project Title & Subtitle**
- **Tech Stack Tags** with color-coded styling
- **Detailed Descriptions**
- **Live Demo Links** (styled as primary buttons)
- **GitHub Repository Links** (outlined style)
- **DevPost Links** (for hackathon projects)
- **Category Badges** (AI Projects, Web Apps, IoT, etc.)
- **Highlight Badges** (for award-winning projects)

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Copy your project images:**
   Make sure your project images are in the `public/assets/` directory:
   - `Plan.png`
   - `Blueprint.png`
   - `FreshStart.png`
   - `Biggie.png`
   - `PSL.png`

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Customization

### Adding New Projects

Edit the `projects` array in `src/components/NetflixCarousel.js`:

```javascript
{
  id: 'your-project-id',
  title: 'Your Project Title',
  subtitle: 'Project Subtitle',
  image: '/assets/your-image.png', // or null for no image
  techStack: ['React', 'Node.js', 'MongoDB'],
  description: 'Your project description...',
  highlight: 'Optional highlight text', // for awards, etc.
  links: [
    { type: 'demo', url: 'https://your-demo.com', label: 'Live Demo' },
    { type: 'github', url: 'https://github.com/you/repo', label: 'GitHub' }
  ],
  category: 'Your Category'
}
```

### Styling Customization

- **Colors:** Edit CSS variables in `src/index.css`
- **Card Layout:** Modify `src/components/NetflixCarousel.css`
- **Header Design:** Update `src/App.css`

### Link Types

The carousel supports different link types with distinct styling:
- `demo` - Primary red buttons for live demos
- `github` - Outlined buttons for GitHub repositories
- `devpost` - Blue buttons for DevPost submissions

## File Structure

```
src/
├── components/
│   ├── NetflixCarousel.js      # Main carousel component
│   └── NetflixCarousel.css     # Carousel styles
├── App.js                      # Main app component
├── App.css                     # App styles
├── index.js                    # React entry point
└── index.css                   # Global styles
```

## Features Breakdown

### Navigation
- **Mouse Wheel:** Scroll up/down to navigate with infinite card generation
- **Touch/Swipe:** Swipe left/right on mobile devices with infinite generation
- **Horizontal Scrolling:** Smooth scroll with mouse/touch
- **Arrow Buttons:** Previous/next navigation with infinite generation
- **Dot Indicators:** Direct slide selection
- **Keyboard Support:** Arrow keys for navigation
- **Infinite Generation:** Continuously generates new cards from the beginning as you scroll

### Animations
- **Card Hover:** Scale and lift effects
- **Image Zoom:** Subtle image scaling on hover
- **Smooth Transitions:** 0.3-0.4s ease transitions
- **Overlay Effects:** Gradient overlays on hover

### Responsive Design
- **Mobile Optimized:** Smaller cards and controls on mobile
- **Touch Friendly:** Large touch targets
- **Flexible Layout:** Adapts to different screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Lazy Loading:** Images load as needed
- **Smooth Scrolling:** Hardware-accelerated animations
- **Optimized CSS:** Minimal repaints and reflows
- **Efficient JavaScript:** Debounced scroll events

---

**Built with React 18 and modern CSS features for the best user experience.**
