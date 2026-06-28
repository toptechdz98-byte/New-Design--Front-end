const menuButton = document.querySelector("#menuButton");
const mobileNav = document.querySelector("#mobileNav");
const faqItems = document.querySelectorAll(".faq-item");
const newsletterForm = document.querySelector("#newsletterForm");
const formMessage = document.querySelector("#formMessage");

function setMenuOpen(isOpen) {
  mobileNav.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
}

menuButton.addEventListener("click", () => {
  setMenuOpen(!mobileNav.classList.contains("open"));
});

mobileNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
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
