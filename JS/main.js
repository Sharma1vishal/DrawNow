// main.js
// Entry point of the DrawNow app

import { initUI } from "./drawNowUI.js";
import {
  initCanvas,
  clearCanvas,
  changeCursor,
  getCanvas,
  saveImage,
} from "./canvas.js";

document.addEventListener("DOMContentLoaded", () => {
  // initUI();
  initCanvas();
  const canvas = getCanvas();
  initUI(
    {
      onClear: clearCanvas,
      onToolChange: changeCursor,
      onExport: saveImage,
    },
    canvas
  );
});
