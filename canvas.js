// canvas.js
// RESPONSIBILITY:
// - Setup canvas
// - Handle drawing logic
// - Read from state
// - NO UI buttons, NO DOM styling logic

import { state } from "./state.js";

let canvas;
let ctx;
let lastX = 0;
let lastY = 0;

/* ===============================
   INITIALIZATION
================================ */

export function initCanvas() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Mouse events
  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDraw);
  canvas.addEventListener("mouseleave", stopDraw);

  // Touch events (mobile ready)
  canvas.addEventListener("touchstart", startDraw);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", stopDraw);
}

/* ===============================
   CANVAS SIZE HANDLING
================================ */

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

/* ===============================
   DRAWING HANDLERS
================================ */

function startDraw(e) {
  e.preventDefault();

  state.isDrawing = true;

  const { x, y } = getPointerPosition(e);
  lastX = x;
  lastY = y;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
}

function draw(e) {
  if (!state.isDrawing) return;
  e.preventDefault();

  const { x, y } = getPointerPosition(e);

  // Tool-based behavior
  if (state.tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = state.width * 2;
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = state.color;
    ctx.lineWidth = state.width;
  }

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
}

function stopDraw() {
  if (!state.isDrawing) return;
  state.isDrawing = false;

  ctx.closePath();
}

/* ===============================
   POINTER NORMALIZATION
================================ */

function getPointerPosition(e) {
  const rect = canvas.getBoundingClientRect();

  // Touch support
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }

  // Mouse
  return {
    x: e.offsetX,
    y: e.offsetY,
  };
}

// Clear canvas (used by trash button later)
export function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
