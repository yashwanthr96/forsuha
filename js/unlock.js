const playground = document.getElementById("playground");
const statusText = document.getElementById("status");

/* Cats (important) */
const catImages = [
  "images/cats/cat1.png",
  "images/cats/cat2.png",
  "images/cats/cat3.png",
  "images/cats/cat4.png"
];

/* Decorative animals (less priority) */
const otherAnimals = [
  "images/animals/bunny.png",
  "images/animals/panda.png",
  "images/animals/duck.png",
  "images/animals/ham.png",
  "images/animals/pig.png",
  "images/animals/dog2.png"
];

let tappedCats = 0;
const usedPositions = [];

/* spacing logic */
function isTooClose(x, y) {
  return usedPositions.some(p => {
    const dx = p.x - x;
    const dy = p.y - y;
    return Math.sqrt(dx * dx + dy * dy) < 180;
  });
}

/* optimized placement */
function placeRandom(img, size) {
  let x, y;
  let attempts = 0;

  do {
    x = Math.random() * 70;
    y = Math.random() * 70;
    attempts++;
  } while (isTooClose(x, y) && attempts < 10);

  usedPositions.push({ x, y });

  img.style.left = x + "%";
  img.style.top = y + "%";
  img.style.width = size + "px";
}

/* Create ONE image at a time (staggered) */
function createImage(src, size, clickable) {
  const img = document.createElement("img");
  img.src = src;
  img.loading = "lazy";
  img.className = "cat";
  placeRandom(img, size);

  playground.appendChild(img);

  if (clickable) {
    img.addEventListener("click", () => {
      if (!img.classList.contains("done")) {
        img.classList.add("done");
        tappedCats++;
      }

      if (tappedCats === catImages.length) {
  statusText.innerText = "✨ You unlocked the Golden Garden ✨";

  setTimeout(() => {
    window.location.href = "garden.html";
  }, 1200);
}

    });
  }

  return img;
}

/* STEP 1: Load cats first (priority) */
catImages.forEach((src, i) => {
  setTimeout(() => {
    createImage(src, 90, true);
  }, i * 120);
});

/* STEP 2: Load animals AFTER cats */
setTimeout(() => {
  for (let i = 0; i < 12; i++) {
    const src =
      otherAnimals[Math.floor(Math.random() * otherAnimals.length)];
    createImage(src, 75, false);
  }
}, 800);
