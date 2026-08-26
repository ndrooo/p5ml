class SpinThing extends HTMLElement {
  canvas = this.closest("p5-canvas");

  x = Number(this.getAttribute("x") ?? 0);
  y = Number(this.getAttribute("y") ?? 0);
  i = Number(this.getAttribute("i") ?? 0);
  j = Number(this.getAttribute("j") ?? 0);
  static observedAttributes = ["x", "y", "i", "j"];

  static {
    customElements.define("reflection-room", this);
  }

  connectedCallback() {
    let children = [...this.children];
    for (let i = 0; i < this.i; i++) {
      for (let j = 0; j < this.j; j++) {
        let translate = document.createElement("p5-translate");
        let scale = document.createElement("p5-scale");
        let xflip = i % 2 === 1;
        let yflip = j % 2 === 1;
        translate.setAttribute("x", this.x * (xflip ? i + 1 : i));
        translate.setAttribute("y", this.y * (yflip ? j + 1 : j));
        scale.setAttribute("x", (xflip ? -1 : 1).toString());
        scale.setAttribute("y", (yflip ? -1 : 1).toString());
        children.forEach((child) => {
          scale.appendChild(child.cloneNode(true));
        });
        this.appendChild(translate);
        translate.appendChild(scale);
      }
    }
    children.forEach((child) => child.remove());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "speed" && oldValue !== newValue) {
      this.speed = Number(newValue);
    }
  }
}
