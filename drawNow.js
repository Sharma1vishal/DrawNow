const leftLiTools = document.querySelectorAll(".left ul li");
const clors = document.querySelector(".diffClr");
const widths = document.querySelector(".widths ul");

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
    li.style.backgroundColor = i;
    clors.append(li);
    console.log(i);
  });
}

function widthMaker() {
  for (let i = 4; i <= 36; i = i * 1.5) {
    const li = document.createElement("li");
    // li.textContent = ".";
    li.style.width = `${i}px`;
    li.style.height = `${i}px`;
    li.style.backgroundColor = "rgba(128, 128, 128, 0.722)";
    li.style.borderRadius = "50%";
    widths.append(li);
  }
}

widthMaker();
colorMaker();
