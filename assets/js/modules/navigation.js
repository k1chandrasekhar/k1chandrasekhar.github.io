window.Portfolio = window.Portfolio || {};

export function initNavigation() {
  const toggleButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  const navItems = document.querySelectorAll("[data-nav-item]");

  if (toggleButton && nav) {
    toggleButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggleButton.setAttribute("aria-expanded", String(open));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) {
        nav.classList.remove("open");
        toggleButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (nav) {
        nav.classList.remove("open");
      }
      if (toggleButton) {
        toggleButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (!id) return;
          const link = document.querySelector(`[data-nav-item][href="#${id}"]`);
          if (link) {
            link.classList.toggle("active", entry.isIntersecting);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("main .section").forEach((section) => {
      observer.observe(section);
    });
  } else if (navItems.length) {
    navItems[0].classList.add("active");
  }
}

window.Portfolio.initNavigation = initNavigation;
