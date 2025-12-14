const leftLiTools = document.querySelectorAll(".left ul li");
const clors = document.querySelector(".diffClr");
const widths = document.querySelector(".widths ul");
const cusColor = document.querySelector(".custClrSelect");
const custColorVal = document.querySelector(".custColor");
const custwdthSelect = document.querySelector(".custwdthSelect");
const custwdthVal = document.querySelector(".custwdthVal");

leftLiTools.forEach((li) => {
  li.addEventListener("click", () => {
    leftLiTools.forEach((item) => {
      item.classList.remove("active");
    });

    li.classList.add("active");
  });
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
      console.log(e);
      anmtClrClass();
      li.classList.add("active");
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
  custwdthSelect.style.accentColor = ` color-mix(in srgb, ${e.target.value} 50%, #797575ff)`;
  updateSliderFill();
  anmtClrClass();
});

custwdthSelect.addEventListener("input", (e) => {
  custwdthVal.textContent = e.target.value;
  updateSliderFill();
  // var value = Math.ceil(
  //   ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * 100
  // );
  // let rangeValColor = custColorVal.textContent;
  // custwdthSelect.style.background = `linear-gradient(to right, ${rangeValColor} 0%, ${rangeValColor} ${value}%, #fff ${value}%)`;
  // console.log(value);
});

function updateSliderFill() {
  const value = Math.ceil(
    ((custwdthSelect.value - custwdthSelect.min + 1.2) /
      (custwdthSelect.max - custwdthSelect.min)) *
      100
  );

  const color = custColorVal.textContent;

  custwdthSelect.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${value}%, #fff ${value}%)`;
}

// function widthMaker() {
//   for (let i = 4; i <= 36; i = i * 1.5) {
//     const li = document.createElement("li");
//     // li.textContent = ".";
//     li.style.width = `${i}px`;
//     li.style.height = `${i}px`;
//     li.style.backgroundColor = "rgba(128, 128, 128, 0.722)";
//     li.style.borderRadius = "50%";
//     widths.append(li);
//   }
// }

function widthMaker() {
  const fragment = document.createDocumentFragment();
  const widthArr = [6, 10, 14, 18, 24, 36];
  widthArr.forEach((i) => {
    const li = document.createElement("li");
    li.style.width = `${i}px`;
    li.style.height = `${i}px`;
    li.dataset.size = i;
    li.addEventListener("click", () => {
      widths
        .querySelectorAll("li")
        .forEach((item) => item.classList.remove("active"));
      li.classList.add("active");
    });
    fragment.append(li);
  });
  widths.append(fragment);
}

widthMaker();
colorMaker();
