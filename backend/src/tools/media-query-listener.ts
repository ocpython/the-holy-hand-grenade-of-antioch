// SPDX-License-Identifier: MIT

export class MediaQueryListener {
  afterElement?: CSSStyleDeclaration;
  currentBreakpoint: string;
  lastBreakpoint: string;

  init(): void {
    // If the browser doesn't support window.getComputedStyle just return
    if (!this.afterElement) {
      return;
    }

    ["orientationchange", "load", "resize"].forEach((event) => {
      window.addEventListener(event, () => {
        this.currentBreakpoint = this.afterElement!.getPropertyValue("content");

        if (this.currentBreakpoint !== this.lastBreakpoint) {
          const event = new CustomEvent("breakpointchange", { detail: this.currentBreakpoint });
          this.lastBreakpoint = this.currentBreakpoint;
          window.dispatchEvent(event);
        }
      });
    });
  }

  constructor() {
    this.afterElement = window.getComputedStyle ? window.getComputedStyle(document.body, ":after") : undefined;
    this.currentBreakpoint = "";
    this.lastBreakpoint = "";
    this.init();
  }
}

export default MediaQueryListener;
