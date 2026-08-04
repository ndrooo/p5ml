class SeekTouch extends HTMLElement {
  canvas = this.closest("p5-canvas");

  static {
    customElements.define("seek-touch", this);
  }

  connectedCallback() {
    let children = [...this.children];
    let translate = document.createElement("p5-translate");
    // translate.setAttribute("angle", this.angle.toFixed(0));
    this.appendChild(translate);
    children.forEach((child) => {
      translate.appendChild(child);
    });
    this.canvas.update.push((p) => {
      if (p.touches.length > 0) {
        let xTouches = p.touches.map((touch) => touch.x);
        let yTouches = p.touches.map((touch) => touch.y);
        let xAvg = xTouches.reduce((a, b) => a + b) / xTouches.length;
        let yAvg = yTouches.reduce((a, b) => a + b) / yTouches.length;
        translate.setAttribute("x", xAvg);
        translate.setAttribute("y", yAvg);
      }
    });
  }
}
