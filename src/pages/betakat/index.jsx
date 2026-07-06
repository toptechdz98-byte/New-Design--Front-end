import { useEffect, useMemo, useRef } from "react";
import pageDocument from "./betakat.html?raw";

function getPageMarkup(documentSource) {
  const bodyMatch = documentSource.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch?.[1] ?? documentSource;
}

export default function Betakat() {
  const pageRef = useRef(null);
  const markup = useMemo(() => getPageMarkup(pageDocument), []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const menuButton = page.querySelector("#menuButton");
    const mobileOverlay = page.querySelector("#mobileOverlay");
    const mobileNav = page.querySelector("#mobileNav");
    const closeMenuButton = page.querySelector("#closeMenuButton");
    const faqItems = [...page.querySelectorAll(".faq-item")];
    const newsletterForm = page.querySelector("#newsletterForm");
    const formMessage = page.querySelector("#formMessage");

    const setMenuOpen = (isOpen) => {
      mobileOverlay?.classList.toggle("open", isOpen);
      menuButton?.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    };
    const toggleMenu = () =>
      setMenuOpen(!mobileOverlay?.classList.contains("open"));
    const closeMenu = () => setMenuOpen(false);
    const closeFromNav = (event) => {
      if (event.target.closest("a")) closeMenu();
    };
    const closeFromOverlay = (event) => {
      if (event.target === mobileOverlay) closeMenu();
    };
    const closeFromKeyboard = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    const submitNewsletter = (event) => {
      event.preventDefault();
      if (formMessage) {
        formMessage.textContent = "شكراً لاشتراكك، سنبقى على تواصل.";
      }
      newsletterForm?.reset();
    };

    menuButton?.addEventListener("click", toggleMenu);
    mobileNav?.addEventListener("click", closeFromNav);
    closeMenuButton?.addEventListener("click", closeMenu);
    mobileOverlay?.addEventListener("click", closeFromOverlay);
    document.addEventListener("keydown", closeFromKeyboard);
    newsletterForm?.addEventListener("submit", submitNewsletter);

    const faqCleanups = faqItems.map((item) => {
      const button = item.querySelector("button");
      button?.setAttribute("aria-expanded", "false");
      const toggleFaq = () => {
        const shouldOpen = !item.classList.contains("open");
        faqItems.forEach((faqItem) => {
          faqItem.classList.remove("open");
          faqItem
            .querySelector("button")
            ?.setAttribute("aria-expanded", "false");
        });
        if (shouldOpen) {
          item.classList.add("open");
          button?.setAttribute("aria-expanded", "true");
        }
      };
      button?.addEventListener("click", toggleFaq);
      return () => button?.removeEventListener("click", toggleFaq);
    });

    return () => {
      closeMenu();
      menuButton?.removeEventListener("click", toggleMenu);
      mobileNav?.removeEventListener("click", closeFromNav);
      closeMenuButton?.removeEventListener("click", closeMenu);
      mobileOverlay?.removeEventListener("click", closeFromOverlay);
      document.removeEventListener("keydown", closeFromKeyboard);
      newsletterForm?.removeEventListener("submit", submitNewsletter);
      faqCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="betakat-page"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
