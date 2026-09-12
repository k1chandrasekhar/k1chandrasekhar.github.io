window.Portfolio = window.Portfolio || {};

export function showToast(message) {
  let toast = document.querySelector('[data-toast]');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('data-toast', '');
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<ion-icon name="checkmark-circle-outline" style="font-size: 1.3rem; color: var(--emerald);"></ion-icon> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

export function initEffects() {
  const yearNode = document.querySelector("[data-year]");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const backTopLink = document.querySelector("[data-back-top]");
  if (backTopLink) {
    backTopLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Copy email helper
  const copyEmailBtns = document.querySelectorAll("[data-copy-email]");
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = btn.getAttribute("data-copy-email") || "chandrasekhar.k.work@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      });
    });
  });

  const phoneValues = document.querySelectorAll("[data-phone-value]");
  const phoneToggles = document.querySelectorAll("[data-phone-toggle]");

  if (phoneValues.length && phoneToggles.length) {
    let revealed = false;

    const setPhoneState = () => {
      phoneValues.forEach((node) => {
        const display = node.getAttribute("data-phone-display") || "+91 7996838973";
        node.textContent = revealed ? display : "+91 ••••• ••973";
      });

      phoneToggles.forEach((button) => {
        button.setAttribute("aria-pressed", String(revealed));
        button.classList.toggle("revealed", revealed);
        button.setAttribute("aria-label", revealed ? "Hide phone number" : "Show phone number");
        const icon = button.querySelector("ion-icon");
        if (icon) {
          icon.setAttribute("name", revealed ? "eye-off-outline" : "eye-outline");
        }
      });
    };

    phoneToggles.forEach((button) => {
      button.addEventListener("click", () => {
        revealed = !revealed;
        setPhoneState();
      });
    });

    setPhoneState();
  }
}

window.Portfolio.initEffects = initEffects;
window.Portfolio.showToast = showToast;
