const menuButton = document.querySelector("#menuButton");
const mobileOverlay = document.querySelector("#mobileOverlay");
const mobileNav = document.querySelector("#mobileNav");
const closeMenuButton = document.querySelector("#closeMenuButton");
const faqItems = document.querySelectorAll(".faq-item");
const newsletterForm = document.querySelector("#newsletterForm");
const formMessage = document.querySelector("#formMessage");

function setMenuOpen(isOpen) {
  mobileOverlay.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(!mobileOverlay.classList.contains("open"));
});

mobileNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

closeMenuButton.addEventListener("click", () => setMenuOpen(false));

mobileOverlay.addEventListener("click", (event) => {
  if (event.target === mobileOverlay) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

faqItems.forEach((item) => {
  const button = item.querySelector("button");
  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", () => {
    const shouldOpen = !item.classList.contains("open");

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("open");
      faqItem.querySelector("button").setAttribute("aria-expanded", "false");
    });

    if (shouldOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "شكراً لاشتراكك، سنبقى على تواصل.";
  newsletterForm.reset();
});
