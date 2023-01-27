// SPDX-License-Identifier: MIT

import { MediaQueryListener } from "./tools/media-query-listener";

import "./styles";
import "./effects";

new MediaQueryListener();

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const path = window.location.pathname;

    if (globalThis.Mobile) {
      const html = document.getElementById("html");
      html!.classList.add("mobile");
    }

    switch (path) {
      case "/": {
        const lorem = document.getElementById("lorem");

        lorem!.classList.remove("hide");
        lorem!.classList.add("show");

        break;
      }
    }
  },
  false,
);

import "bootstrap";

// import jquery from "jquery";
import "jquery";

import "@fullcalendar/core";
import "@fullcalendar/daygrid";

import "datatables.net";
import "datatables.net-bs5";

import "jquery-ui/dist/jquery-ui";

import "./init-flatpickr";
import "./init-fullcalendar";
import "./global-old.js";
//
// // ------------------------------------------------------------------------
//
// // Import our custom CSS
// import '../scss/styles.scss';
