import "bootstrap";

const famfam = document.getElementById("famfam");
if (famfam) {
  let avatars = document.querySelectorAll(".avatar");
  avatars.forEach((avatar) => {
    avatar.addEventListener("click", () => {
      avatars.forEach((a) => {
        a.style.opacity = 0.7;
      });
      avatar.style.opacity = 1;
    })
  })
}
