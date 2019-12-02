import "bootstrap";

const famfam = document.getElementById("famfam") || document.getElementById('signup-wallpaper');
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

const mismis = document.getElementById("mismis");
if (mismis) {
  let icons = document.querySelectorAll(".icon");
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      icons.forEach((i) => {
        i.style.opacity = 0.7;
      });
      icon.style.opacity = 1;
    })
  })
}
