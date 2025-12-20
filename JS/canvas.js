// canvas.js
// Handles all canvas drawing logic

import { state } from "./state.js";
import { saveToHistory } from "./history.js";

let canvas, ctx;
let lastX = 0,
  lastY = 0;

export function initCanvas() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDraw);
  canvas.addEventListener("mouseleave", stopDraw);

  canvas.addEventListener("touchstart", startDraw);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", stopDraw);
}

/* ===============================
   RESIZE HANDLING
================================ */
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

/* ===============================
   DRAW FLOW
================================ */
function startDraw(e) {
  e.preventDefault();
  state.isDrawing = true;

  saveToHistory(canvas); // save state for undo

  const pos = getPos(e);
  lastX = pos.x;
  lastY = pos.y;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
}

function draw(e) {
  if (!state.isDrawing) return;
  e.preventDefault();

  const pos = getPos(e);

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

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();

  lastX = pos.x;
  lastY = pos.y;
}

function stopDraw() {
  state.isDrawing = false;
  ctx.closePath();
}

/* ===============================
   POINTER NORMALIZATION
================================ */
function getPos(e) {
  const rect = canvas.getBoundingClientRect();

  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }

  return { x: e.offsetX, y: e.offsetY };
}

/* ===============================
   PUBLIC HELPERS
================================ */
export function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
