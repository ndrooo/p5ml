class RecursiveRoot extends HTMLElement {
  canvas = this.closest("p5-canvas");

  static observedAttributes = [];

  static {
    customElements.define("recursive-root", this);
  }

  connectedCallback() {
    const iterations = Number(this.getAttribute("iterations"));
    if (iterations <= 0) {
      return;
    }
    const cloneTemplate = this.cloneNode(true);
    cloneTemplate.setAttribute("iterations", (iterations - 1).toString());
    const slots = Array.from(this.getElementsByTagName("recursive-slot"));
    slots.forEach((slot) => {
      slot.appendChild(cloneTemplate.cloneNode(true));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {}
}
