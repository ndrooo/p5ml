import P5MLElement from "../element";
import p5 from "p5";

export default class Canvas extends P5MLElement {
  canvas: HTMLCanvasElement = document.createElement("canvas");
  setup: (p: p5) => void | null = null;
  update: (p: p5) => void | null = null;

  static {
    this.define();
  }

  connectedCallback() {
    this.prepend(this.canvas);
    new p5(this.sketch.bind(this));
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
