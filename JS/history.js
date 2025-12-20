// history.js
// Handles undo / redo logic

const undoStack = [];
const redoStack = [];

export function saveToHistory(canvas) {
  undoStack.push(canvas.toDataURL());
  redoStack.length = 0;
}

export function undo(canvas, ctx) {
  if (!undoStack.length) return;

  const last = undoStack.pop();
  redoStack.push(last);

  restore(canvas, ctx, undoStack[undoStack.length - 1]);
}

function restore(canvas, ctx, data) {
  if (!data) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const img = new Image();
  img.src = data;
  img.onload = () => ctx.drawImage(img, 0, 0);
}
