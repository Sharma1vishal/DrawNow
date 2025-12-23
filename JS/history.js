// history.js
// Handles undo / redo logic

let undoStack = [];
let redoStack = [];

export function saveToHistory(canvas) {
  const ctx = canvas.getContext("2d");

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  undoStack.push(imageData);
  redoStack = []; // reset redo when new draw happens
}

export function undo(canvas) {
  if (undoStack.length === 0) return;
  const MAX_HISTORY = 50;

  if (undoStack.length > MAX_HISTORY) {
    undoStack.shift();
  }

  const ctx = canvas.getContext("2d");

  // Save current state for redo
  const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
  redoStack.push(current);

  // Restore last state
  const previous = undoStack.pop();
  ctx.putImageData(previous, 0, 0);
}

export function redo(canvas) {
  if (redoStack.length === 0) return;

  const ctx = canvas.getContext("2d");

  // Save current state for undo
  const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
  undoStack.push(current);

  // Restore redo state
  const next = redoStack.pop();
  ctx.putImageData(next, 0, 0);
}
