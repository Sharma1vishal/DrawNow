# 🎨 DrawNow – Lightweight Canvas Drawing App

DrawNow is a lightweight, browser-based drawing application built using **vanilla JavaScript and HTML5 Canvas**.  
It provides essential drawing tools, shape support, color & width controls, and undo/redo functionality with a clean modular code structure.

This project focuses on **clarity, separation of concerns, and extensibility**, making it easy to add advanced features in future versions.

---

## ✨ Features

### 🖊 Drawing Tools

- Pencil (freehand drawing)
- Eraser
- Line
- Rectangle
- Square
- Circle
- Triangle
- Arrow (dynamic head size based on stroke width)

### 🎨 Styling Controls

- Preset color palette
- Custom color picker
- Preset stroke widths
- Custom stroke width slider (live preview)

### 🧠 History Management

- Undo (Ctrl + Z)
- Redo (Ctrl + Shift + Z)
- UI buttons for undo / redo
- Efficient canvas snapshot–based history stack

### 🖱 UX Enhancements

- Tool-based cursor changes
- Responsive canvas resizing
- Mouse and touch support
- Clean UI separation from drawing logic

---

## 🗂 Project Structure

├── index.html # App layout and UI structure
├── main.js # Entry point (wires UI + Canvas)
├── canvas.js # All canvas drawing logic
├── drawNowUI.js # UI interactions (tools, colors, width, buttons)
├── history.js # Undo / Redo state management
├── state.js # Global reactive app state
├── drawNow.css # Styling (UI + cursors)

---

## 🧩 Architecture Overview

- **state.js**  
  Central store for current tool, color, stroke width, and drawing state.

- **canvas.js**  
  Handles:

  - Drawing logic
  - Shape rendering
  - Mouse/touch events
  - Cursor updates
  - Canvas resizing
  - Keyboard shortcuts

- **drawNowUI.js**  
  Handles:

  - Tool selection
  - Color & width selection
  - Undo / redo buttons
  - Clear canvas button  
    UI never directly modifies canvas — it only updates state or calls callbacks.

- **history.js**  
  Manages undo/redo stacks using `ImageData` snapshots.

- **main.js**  
  App bootstrapper that connects UI callbacks with canvas actions.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/drawnow.git


2. Run locally

Use any local server (important because ES modules are used):

# VS Code Live Server
Right click index.html → Open with Live Server

or

npx serve

3. Open in browser

http://127.0.0.1:5500


Keyboard Shortcuts
Action	Shortcut
Undo	Ctrl + Z
Redo	Ctrl + Shift + Z


Upcoming Features (Planned)

The following features are intentionally designed but not yet implemented and will be added soon:

🎨 Color Fill Tool
Click inside shapes to fill them with selected color.

🔤 Text Tool
Add editable text anywhere on the canvas.

📥 Import Canvas
Import images into the canvas for editing.

📤 Export Canvas
Download drawings as PNG / JPG.

These features already have UI placeholders and hooks planned in the architecture.



Design Goals

No frameworks (pure JavaScript)

Modular & readable code

Beginner-friendly but scalable

Easy feature addition

Clear separation of UI, state, and canvas logic


License

This project is open-source and free to use for learning and personal projects.

👨‍💻 Author

Vishal Sharma
Frontend Developer | UI Engineering | Canvas Experiments

If you find this project useful, feel free to ⭐ the repo and contribute ideas!
```
