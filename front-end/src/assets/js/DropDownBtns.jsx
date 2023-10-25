export const profileHandler = (liRef) => {
  const button = liRef.current;
  button.classList.add("active");

  const profileBtns = Array.from(button.getElementsByClassName("profile-btns"));
  profileBtns.forEach((profileBtn) => {
    profileBtn.style.display = "block";
  });

  button.addEventListener("mouseleave", () => {
    button.classList.remove("active");
    profileBtns.forEach((profileBtn) => {
      profileBtn.style.display = "none";
    });
  });
};
