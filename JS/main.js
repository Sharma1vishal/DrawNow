// main.js
// Entry point of the DrawNow app

import { initUI } from "./drawNowUI.js";
import { initCanvas, clearCanvas } from "./canvas.js";

document.addEventListener("DOMContentLoaded", () => {
  // initUI();
  initUI({
    onClear: clearCanvas,
  });

  initCanvas();
});
