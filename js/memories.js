const cards = document.querySelectorAll(".card");
const monthLabel = document.getElementById("monthLabel");
const newYear = document.getElementById("newYear");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach(c => c.classList.remove("active"));
        entry.target.classList.add("active");

        const month = entry.target.dataset.month;
        monthLabel.innerText = month;

        if (month === "December") {
          newYear.style.opacity = 1;
        } else {
          newYear.style.opacity = 0;
        }
      }
    });
  },
  { threshold: 0.6 }
);

cards.forEach(card => observer.observe(card));

function goGarden() {
  window.location.href = "garden.html";
}
