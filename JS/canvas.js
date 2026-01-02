// canvas.js
// Handles all canvas drawing logic

import { state } from "./state.js";
import { saveToHistory, undo, redo } from "./history.js";

let canvas, ctx;
let lastX = 0,
  lastY = 0;
let snapshot = null;

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

  canvas.addEventListener("mouseenter", () => {
    updateCursor(state.tool);
  });
}

function updateCursor(tool) {
  canvas.classList.remove(
    "cursor-pencil",
    "cursor-eraser",
    "cursor-shape",
    "cursor-pan"
  );

  switch (tool) {
    case "pencil":
      canvas.classList.add("cursor-pencil");
      break;

    case "eraser":
      canvas.classList.add("cursor-eraser");
      break;

    case "rectangle":
    case "square":
    case "circle":
    case "line":
    case "arrow":
    case "triangle":
      canvas.classList.add("cursor-shape");
      break;

    case "pan":
      canvas.classList.add("cursor-pan");
      break;
  }
}

/* ===============================
   RESIZE HANDLING
================================ */

function resizeCanvas() {
  // 1. Save current canvas
  const oldImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  // 2. Resize (this clears)
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // 3. Restore drawing
  ctx.putImageData(oldImage, 0, 0);
}

function startDraw(e) {
  state.isDrawing = true;
  saveToHistory(canvas);

  lastX = e.offsetX;
  lastY = e.offsetY;

  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
}

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "z") {
    e.preventDefault();
    undo(canvas);
  }

  if (e.ctrlKey && e.shiftKey && e.key === "Z") {
    e.preventDefault();
    redo(canvas);
  }
});

function drawPencil(x, y) {
  ctx.lineTo(x, y);
  ctx.stroke();
}

function erase(x, y) {
  ctx.globalCompositeOperation = "destination-out";
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.globalCompositeOperation = "source-over";
}

function drawRectangle(x, y) {
  const width = x - lastX;
  const height = y - lastY;

  ctx.strokeRect(lastX, lastY, width, height);
}

function drawSquare(x, y) {
  const size = Math.min(x - lastX, y - lastY);
  ctx.strokeRect(lastX, lastY, size, size);
}

function drawCircle(x, y) {
  const radius = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));

  ctx.beginPath();
  ctx.arc(lastX, lastY, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawLine(x, y) {
  ctx.beginPath();
  let startX = x;
  let startY = y;
  // Set a start-point
  ctx.moveTo(lastX, lastY);

  // Set an end-point
  ctx.lineTo(x, y);
  ctx.stroke();
}

function drawArrow(x, y) {
  const dx = x - lastX;
  const dy = y - lastY;
  // const headlen = (Math.sqrt(dx * dx + dy * dy) * state.width) % 10; // length of head in pixels
  const angle = Math.atan2(dy, dx);
  ctx.beginPath();
  //  Arrow thickness
  ctx.lineWidth = state.width;
  ctx.strokeStyle = state.color;

  //  Arrow head size based on pen width
  const headlen = 8 + state.width * 3;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(
    x - headlen * Math.cos(angle - Math.PI / 6),
    y - headlen * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(x, y);
  ctx.lineTo(
    x - headlen * Math.cos(angle + Math.PI / 6),
    y - headlen * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
}

function drawTriangle(x, y) {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.lineTo(lastX * 2 - x, y);
  ctx.closePath();
  ctx.stroke();
}

//function to fill colors in figures------------------------------------------
// function fillFig(x, y) {
// canvas.addEventListener("click", (fig) => {
//   ctx.fillStyle = state.color;
//   console.log(canvas);
//   let startFromX = fig.offsetX;
//   let startFromY = fig.offsetY;
//   let endX = fig.pageX;
//   let endY = fig.pageY;
//   // ctx.fillRect(startFromX, startFromY, endX, endY);
// });
// ctx.globalCompositeOperation = "destination-over";
// Now draw!
// }

function draw(e) {
  if (!state.isDrawing) return;

  ctx.putImageData(snapshot, 0, 0);

  const currentX = e.offsetX;
  const currentY = e.offsetY;

  ctx.strokeStyle = state.color;
  ctx.lineWidth = state.width;

  switch (state.tool) {
    case "pencil":
      drawPencil(currentX, currentY);
      break;

    case "rectangle":
      drawRectangle(currentX, currentY);
      break;

    case "triangle":
      drawTriangle(currentX, currentY);
      break;

    case "square":
      drawSquare(currentX, currentY);
      break;

    case "circle":
      drawCircle(currentX, currentY);
      break;

    case "line":
      drawLine(currentX, currentY);
      break;

    case "arrow":
      drawArrow(currentX, currentY);
      break;

    case "fill-color":
      fillFig(currentX, currentY);
      break;

    case "eraser":
      erase(currentX, currentY);
      break;
  }
}

function stopDraw() {
  state.isDrawing = false;
  ctx.closePath();
}

/* ===============================
PUBLIC HELPERS
================================ */
export function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function changeCursor() {
  updateCursor(state.tool);
}

export function getCanvas() {
  return canvas;
}

export function saveImage() {
  // Getting the canvas
  var canvas = document.getElementById("canvas");
  // Converting the canvas to data
  var image = canvas.toDataURL();
  // Create a link
  var aDownloadLink = document.createElement("a");
  aDownloadLink.download = "canvas_image.png";
  aDownloadLink.href = image;
  aDownloadLink.click();
}
