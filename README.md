# LeaferJS Editor

[中文文档](./README-zh.md) | English

## 📖 Introduction

LeaferJS Editor is a powerful graphic design editor built with Vue 3, TypeScript, and LeaferJS. It provides an intuitive interface for creating, editing, and managing various graphic elements with real-time property editing and Monaco code editor integration.

## ✨ Features

- 🎨 **Rich Shape Support**: Create and edit multiple shapes including rectangles, circles, lines, polygons, stars, paths, arrows, images, and text
- 🖊️ **Real-time Editing**: Instant property updates with visual feedback
- 💻 **Code Editor Integration**: Built-in Monaco editor for advanced HTML/code editing
- 🎯 **Layer Management**: Full control over element z-index with move to top/bottom operations
- 🌓 **Dark/Light Mode**: Seamless theme switching
- 📤 **Import/Export**: 
  - Export selected elements or entire canvas as JSON
  - Export canvas as image
  - Import JSON templates
- 🎨 **Customizable Background**: Adjustable canvas background color with alpha support
- 🖱️ **Context Menu**: Right-click menu for quick operations
- 📐 **Property Panel**: Detailed property editing for each element type

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API + `<script setup>`)
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Element Plus
- **Graphics Engine**: LeaferJS v1.9.12
- **Code Editor**: Monaco Editor
- **Styling**: SCSS

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd leaferjs-editor

# Install dependencies
npm install
```

## 🚀 Usage

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📋 Supported Shapes

| Shape | Description |
|-------|-------------|
| Rect | Rectangles with customizable properties |
| Ellipse | Circles and ellipses |
| Line | Straight lines with various styles |
| Polygon | Multi-sided polygons |
| Star | Star shapes with configurable points |
| Path | Custom SVG paths |
| Arrow | Arrows with customizable heads |
| Image | Image elements with transformations |
| Text | Editable text with rich formatting |
| HTML | HTML content with Monaco editor |

## 🎮 Core Features

### Canvas Operations

- **Background Color**: Adjustable via color picker with alpha channel support
- **Export Options**:
  - Export entire canvas as JSON
  - Export selected elements as JSON
  - Export canvas as image (PNG/JPG)
- **Import**: Load JSON templates to restore canvas state

### Element Management

- **Create**: Add new elements from the left panel configuration
- **Select**: Click to select elements for editing
- **Edit**: Modify properties in the right panel
- **Layer Control**:
  - Move to top/bottom
  - Move up/down by one layer
  - Delete selected elements

### Code Editor

- Toggle code editor mode for advanced HTML element creation
- Built-in Monaco editor with syntax highlighting
- Support for multiple programming languages

## 🗂️ Project Structure

```
leaferjs-editor/
├── src/
│   ├── components/
│   │   ├── configs/          # Shape configuration components
│   │   ├── properties/       # Property editor components
│   │   └── RightMenu.vue     # Context menu
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   │   ├── element.ts        # Element creation utilities
│   │   ├── event.ts          # Event handlers
│   │   └── file.ts           # File operations
│   ├── styles/               # Theme styles
│   ├── App.vue               # Main application component
│   ├── index.ts              # Core editor logic
│   └── main.ts               # Application entry point
├── public/                   # Static assets
└── package.json              # Dependencies and scripts
```

## 🔧 Configuration

### LeaferJS Plugins

The editor uses the following LeaferJS plugins:

- `@leafer-in/arrow` - Arrow shape support
- `@leafer-in/editor` - Editor functionality
- `@leafer-in/export` - Export capabilities
- `@leafer-in/html` - HTML element support
- `@leafer-in/resize` - Resize operations
- `@leafer-in/text-editor` - Text editing
- `@leafer-in/viewport` - Viewport management

## 🎯 Keyboard Shortcuts

(Add your keyboard shortcuts here if applicable)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [LeaferJS](https://www.leaferjs.com/) - Powerful canvas graphics framework
- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [Element Plus](https://element-plus.org/) - Vue 3 UI library
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ using Vue 3 and LeaferJS
