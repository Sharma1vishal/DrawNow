import { state } from "./state.js";
import { undo, redo } from "./history.js";

const leftLiTools = document.querySelectorAll(".left ul li");
const clors = document.querySelector(".diffClr");
const widths = document.querySelector(".widths ul");
const cusColor = document.querySelector(".custClrSelect");
const custColorVal = document.querySelector(".custColor");
const custwdthSelect = document.querySelector(".custwdthSelect");
const custwdthVal = document.querySelector(".custwdthVal");
const undoBtn = document.querySelector("#undo");
const redoBtn = document.querySelector("#redo");

export function initUI(callbacks = {}, canvas) {
  leftLiTools.forEach((li) => {
    li.addEventListener("click", () => {
      leftLiTools.forEach((item) => {
        item.classList.remove("active");
      });
      li.dataset.tool = li.firstChild.id;

      li.classList.add("active");
      state.tool = li.firstChild.id;
      onToolChange();
    });
  });

  if (!canvas) {
    console.error("Canvas not passed to UI");
    return;
  }

  undoBtn.addEventListener("click", () => {
    undo(canvas);
  });

  redoBtn.addEventListener("click", () => {
    redo(canvas);
  });

  function colorMaker() {
    const clrs = [
      "black",
      "orange",
      "red",
      "yellow",
      "green",
      "skyblue",
      "blue",
      "purple",
      "pink",
      "white",
    ];
    clrs.forEach((i) => {
      const li = document.createElement("li");
      const fragment = document.createDocumentFragment();
      li.style.backgroundColor = i;
      li.addEventListener("click", (e) => {
        // console.log(e.target.style.backgroundColor);
        anmtClrClass();
        li.classList.add("active");
        state.color = e.target.style.backgroundColor;
        // custwdthSelect.style.accentColor = `color-mix(in srgb, ${state.color} 50%, #797575ff)`;
        updateSliderFill(state.color);
      });
      fragment.append(li);
      clors.append(fragment);
    });
  }

  function anmtClrClass() {
    clors.querySelectorAll("li").forEach((item) => {
      item.classList.remove("active");
    });
  }

  cusColor.addEventListener("input", (e) => {
    custColorVal.textContent = e.target.value;
    state.color = `${e.target.value}`;

    updateSliderFill(custColorVal.textContent);
    anmtClrClass();
  });

  custwdthSelect.addEventListener("input", (e) => {
    custwdthVal.textContent = `${e.target.value}px`;
    updateSliderFill(state.color);
    state.width = e.target.value;
    widthActiveClass();

    // var value = Math.ceil(
    //   ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * 100
    // );
    // let rangeValColor = custColorVal.textContent;
    // custwdthSelect.style.background = `linear-gradient(to right, ${rangeValColor} 0%, ${rangeValColor} ${value}%, #fff ${value}%)`;
  });

  function updateSliderFill(selectedClr) {
    const value = Math.ceil(
      ((custwdthSelect.value - custwdthSelect.min + 1.2) /
        (custwdthSelect.max - custwdthSelect.min)) *
        100
    );
    const color = selectedClr;
    custwdthSelect.style.accentColor = ` color-mix(in srgb, ${selectedClr} 50%, #797575ff)`;
    custwdthSelect.style.acc;
    custwdthSelect.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${value}%, #fff ${value}%)`;
  }

  function widthActiveClass() {
    widths
      .querySelectorAll("li")
      .forEach((item) => item.classList.remove("active"));
  }

  function widthMaker() {
    const fragment = document.createDocumentFragment();
    const widthArr = [6, 10, 14, 18, 24, 36];
    widthArr.forEach((i) => {
      const li = document.createElement("li");
      li.style.width = `${i + 2}px`;
      li.style.height = `${i + 2}px`;
      li.dataset.size = i;
      li.addEventListener("click", () => {
        widthActiveClass();
        state.width = li.dataset.size;
        li.classList.add("active");
      });
      fragment.append(li);
    });
    widths.append(fragment);
  }

  widthMaker();
  colorMaker();

  // }
  // drawNowUI.js
  // Handles all UI interactions (buttons, colors, widths)

  // export function initUI(callbacks = {}) {
  const { onClear, onToolChange } = callbacks;

  //Clear button
  const clearBtn = document.querySelector(".delete");

  if (clearBtn && onClear) {
    clearBtn.addEventListener("click", () => {
      onClear(); // UI does NOT know what this does
    });
  }

  /* ===============================
    TOOL SELECTION
    ================================ */

  // const tools = document.querySelectorAll(".left li");
  // tools.forEach((tool) => {
  //   tool.addEventListener("click", () => {
  //     tools.forEach((t) => t.classList.remove("active"));
  //     tool.classList.add("active");

  //     state.tool = tool.dataset.tool;
  //     console.log(tool.dataset);
  //   });
  // });

  /* ===============================
     COLOR SELECTION
  ================================ */

  /* ===============================
     WIDTH SELECTION
     ================================ */
}
