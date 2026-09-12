const STORAGE_KEY = "portfolio-theme";

window.Portfolio = window.Portfolio || {};

export function initTheme() {
  const root = document.documentElement;
  const button = document.querySelector("[data-theme-toggle]");

  if (!button) return;

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    savedTheme = null;
  }

  if (savedTheme === "light") {
    root.setAttribute("data-theme", "light");
  }

  button.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    if (nextTheme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch (error) {
      // no-op
    }
  });
}

window.Portfolio.initTheme = initTheme;
