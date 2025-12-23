// main.js
// Entry point of the DrawNow app

import { initUI } from "./drawNowUI.js";
import { initCanvas, clearCanvas, changeCursor, getCanvas } from "./canvas.js";

document.addEventListener("DOMContentLoaded", () => {
  // initUI();
  initCanvas();
  const canvas = getCanvas();
  initUI(
    {
      onClear: clearCanvas,
      onToolChange: changeCursor,
    },
    canvas
  );
});
