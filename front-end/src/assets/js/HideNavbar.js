export function HideNavBar() {
  let menu_logo = document.querySelector("#menulogo");
  let Menu = document.querySelector(".Menu");
  let rect1 = document.querySelector(".rect1");
  let rect2 = document.querySelector(".rect2");
  let rect3 = document.querySelector(".rect3");
  let ul = document.querySelector(".ul");
  let Menu2 = document.querySelector(".Menu2");
  let profile_li = document.querySelectorAll(".lia.profile");

  if (Menu.classList.contains("hover")) {
    Menu.classList.remove("hover");
    menu_logo.style.marginTop = "25px";
    rect1.style.opacity = 1;
    rect2.style.transform = "rotate(0deg) translate(0px, 0px)";
    rect3.style.transform = "rotate(0deg) translate(0px, 0px)";
    ul.style.marginTop = "-100px";
  } else {
    Menu.classList.add("hover");

    // Set initial styles here
    rect1.style.opacity = 0;
    rect2.style.transform = "rotate(45deg) translate(6px, -15px)";
    rect3.style.transform = "rotate(-45deg) translate(-20px, 0px)";

    ul.style.marginTop = "0px";
    menu_logo.style.marginTop = "35px";
  }
}
