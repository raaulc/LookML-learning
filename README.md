# LookML Code Camp

A modern, interactive web platform for learning LookML, inspired by FreeCodeCamp. Featuring a two-pane UI: Markdown-rendered lessons and a code editor with real-time validation and syntax highlighting.

## Features

- **Two-pane layout**: Markdown lessons on the left, Monaco code editor on the right
- **Interactive validation**: Real-time feedback on LookML code
- **Lesson navigation**: Move between lessons with Previous/Next buttons
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **No backend required**: Static markdown files for lesson content

## Tech Stack

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling and layout
- **Custom Code Editor** - Lightweight textarea with LookML syntax highlighting
- **React Markdown** - Markdown rendering
- **Create React App** - Build tooling

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lookml-learning-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/
│   ├── LessonLoader.js    # Loads and renders markdown lessons
│   ├── EditorPane.js      # Monaco editor component
│   └── Validator.js       # LookML validation logic
├── App.js                 # Main application component
├── index.js              # React entry point
└── index.css             # Global styles with Tailwind

public/
├── lessons/
│   └── lesson1.md        # Lesson content in markdown
└── index.html            # HTML template
```

## Adding New Lessons

1. Create a new markdown file in `public/lessons/` (e.g., `lesson2.md`)
2. Update the validation logic in `src/components/Validator.js` if needed
3. The lesson will automatically be accessible via the navigation buttons

## Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to Netlify

## Customization

### Adding New Validation Rules

Edit `src/components/Validator.js` to add new validation logic for different lessons.

### Styling

The app uses Tailwind CSS. Modify `src/index.css` or add custom classes to components.

### Lesson Content

Add new lesson files in `public/lessons/` and they'll be automatically loaded.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own learning platform! 
