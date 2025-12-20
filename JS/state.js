// state.js
// Stores the CURRENT state of the drawing app

export const state = {
  tool: "pencil", // pencil | eraser
  color: "#000000", // selected color
  width: 4, // stroke width
  isDrawing: false, // internal flag (used by canvas)
};
