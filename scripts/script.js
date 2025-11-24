document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".info-toggle-btn");
  const fullText = document.querySelector(".info-full");
  const infoBox = document.querySelector(".info-text");
  const endAnchor = document.getElementById("info-end");

  // --- IntersectionObserver (super stabil & simpel) ---
  const observer = new IntersectionObserver(
    entries => {
      const entry = entries[0];

      // Wenn der Endpunkt sichtbar ist → Button unten fixieren
      if (entry.isIntersecting && fullText.classList.contains("open")) {
        button.classList.add("freeze");
        button.classList.remove("sticky-close");
      } else {
        if (fullText.classList.contains("open")) {
          button.classList.add("sticky-close");
          button.classList.remove("freeze");
        }
      }
    },
    { root: null, threshold: 1.0 }
  );

  observer.observe(endAnchor);

  // --- Button toggle ---
  button.addEventListener("click", () => {
    const opening = !fullText.classList.contains("open");

    if (opening) {
      // Öffnen
      fullText.classList.add("open");
      fullText.style.maxHeight = fullText.scrollHeight + "px";
      button.textContent = "…schließen";

      // Nach oben scrollen → danach sticky aktivieren
      const top = infoBox.offsetTop - 20;
      window.scrollTo({ top, behavior: "smooth" });

      // Sticky erst aktiv, wenn oben angekommen
      setTimeout(() => {
        button.classList.add("sticky-close");
      }, 500);
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
