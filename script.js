const videos = document.querySelectorAll("video");

// AUTOPLAY (center based)
function playVisibleVideo() {
  let center = window.innerHeight / 2;

  videos.forEach(video => {
    const rect = video.getBoundingClientRect();
    const videoCenter = rect.top + rect.height / 2;

    if (Math.abs(center - videoCenter) < rect.height / 2) {
      video.play();
    } else {
      video.pause();
    }
  });
}

window.addEventListener("scroll", playVisibleVideo);
playVisibleVideo();


// LIKE BUTTONS
const likeButtons = document.querySelectorAll(".like");

likeButtons.forEach((btn, index) => {
  const saved = localStorage.getItem("like-" + index);
  btn.textContent = saved === "true" ? "❤️" : "🤍";

  btn.addEventListener("click", () => {
    const isLiked = btn.textContent === "❤️";

    btn.textContent = isLiked ? "🤍" : "❤️";
    localStorage.setItem("like-" + index, !isLiked);
  });
});


// DOUBLE TAP
const cards = document.querySelectorAll(".video-card");

cards.forEach((card, index) => {
  card.addEventListener("dblclick", () => {
    const heart = card.querySelector(".heart");
    const likeBtn = card.querySelector(".like");

    heart.classList.remove("show-heart");
    void heart.offsetWidth;
    heart.classList.add("show-heart");

    likeBtn.textContent = "❤️";
    localStorage.setItem("like-" + index, "true");
  });
});


// COMMENT
const commentBtns = document.querySelectorAll(".actions button:nth-child(2)");

commentBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const box = btn.closest(".video-card").querySelector(".comment-box");
    box.style.display = box.style.display === "flex" ? "none" : "flex";
  });
});


// SOUND
const soundIcons = document.querySelectorAll(".sound");

videos.forEach((video, index) => {
  video.addEventListener("click", () => {
    video.muted = !video.muted;
    soundIcons[index].textContent = video.muted ? "🔇" : "🔊";
  });
});