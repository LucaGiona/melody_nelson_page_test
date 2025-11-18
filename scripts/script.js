document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".info-btn");
  const fullText = document.querySelector(".info-full");
  const infoBox = document.querySelector(".info-text");
  const endAnchor = document.getElementById("info-end");

  // --- Observer fürs Einfrieren am Ende ---
  const observer = new IntersectionObserver(
    entries => {
      const entry = entries[0];

      if (entry.isIntersecting && fullText.classList.contains("open")) {
        // Ende erreicht → Button unten "fest" einrasten
        button.classList.add("freeze");
        button.classList.remove("sticky-close");
      } else {
        if (fullText.classList.contains("open")) {
          button.classList.add("sticky-close");
          button.classList.remove("freeze");
        }
      }
    },
    {
      root: null,
      threshold: 1.0,
    }
  );

  observer.observe(endAnchor);

  // --- Button clicked ---
  button.addEventListener("click", () => {
    const opening = !fullText.classList.contains("open");

    if (opening) {
      // Text aufklappen
      fullText.classList.add("open");
      fullText.style.maxHeight = fullText.scrollHeight + "px";
      button.textContent = "…schließen";

      // Scroll nach oben
      const top = infoBox.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });

      // Sticky erst aktivieren, wenn oben angekommen
      const checkScroll = () => {
        if (Math.abs(infoBox.getBoundingClientRect().top) < 5) {
          button.classList.add("sticky-close");
        } else {
          requestAnimationFrame(checkScroll);
        }
      };

      requestAnimationFrame(checkScroll);
    } else {
      // Schließen
      fullText.classList.remove("open");
      fullText.style.maxHeight = "0";

      button.textContent = "…mehr Infos";
      button.classList.remove("sticky-close");
      button.classList.remove("freeze");
    }
  });
});
