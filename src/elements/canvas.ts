import P5MLElement from "../element";
import p5 from "p5";

export default class Canvas extends P5MLElement {
  setup: (p: p5) => void | null = null;
  update: (p: p5) => void | null = null;

  static {
    this.define();
  }

  connectedCallback() {
    new p5(this.sketch.bind(this), this);
  }

  sketch(p: p5) {
    p.setup = () => {
      p.createCanvas(
        Number(this.getAttribute("width")),
        Number(this.getAttribute("height")),
      );
      if (this.setup != null) {
        this.setup(p);
      }
    };
    p.draw = () => {
      if (this.update != null) {
        this.update(p);
      }
      p.background(getComputedStyle(this).background);
      this.drawRecursive(p);
    };
  }
}
