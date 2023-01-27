// SPDX-License-Identifier: MIT

((): void => {
  const menu = document.getElementById("menu");
  const navbar = document.getElementsByClassName("navbar")[0];
  const toggler = document.getElementsByClassName("navbar-toggler")[0];

  // The point where the navbar changes (in px)
  const offset = (navbar as HTMLElement).offsetHeight * 0.25;

  ["scroll", "load", "resize"].forEach((event) => {
    window.addEventListener(event, () => {
      const collapsed = !menu!.classList.contains("show");
      const width = navbar!.clientWidth;

      if (window.scrollY > offset) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      if (collapsed) {
        navbar.classList.add("hide-navbar-background");
        navbar.classList.remove("show-navbar-background");
      } else {
        navbar.classList.add("show-navbar-background");
        navbar.classList.remove("hide-navbar-background");
      }
    });
  });

  toggler!.addEventListener("click", () => {
    const collapsed = !menu!.classList.contains("show");

    if (window.scrollY <= offset && !collapsed) {
      navbar.classList.remove("show-navbar-background");
      navbar.classList.add("hide-navbar-background");
    } else {
      navbar.classList.add("show-navbar-background");
      navbar.classList.remove("hide-navbar-background");
    }
  });

  window.addEventListener("breakpointchange", (event) => {
    // Trimming first and last double quotes
    const breakpoint = (event as CustomEvent).detail.replace(/(^")|("$)/g, "");

    if (breakpoint !== "sm" && breakpoint !== "md") {
      menu!.classList.remove("show");
    }
  });
})();
