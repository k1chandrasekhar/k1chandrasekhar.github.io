export function initProjectFilter() {
  const controls = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll("[data-category]");

  if (!controls.length || !projects.length) {
    return;
  }

  controls.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      controls.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      projects.forEach((project) => {
        const category = project.getAttribute("data-category");
        const visible = filter === "all" || category === filter || category.includes(filter);
        if (visible) {
          project.style.display = 'flex';
          project.style.opacity = '1';
        } else {
          project.style.display = 'none';
          project.style.opacity = '0';
        }
      });
    });
  });
}
