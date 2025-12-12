const leftLiTools = document.querySelectorAll(".left ul li");

leftLiTools.forEach((li) => {
  li.addEventListener("click", () => {
    // e.style.classList.remove;
    leftLiTools.forEach((item) => item.classList.remove("acitve"));
    li.classList.add("active");
    // console.log(e.currentTarget.);
  });
});
