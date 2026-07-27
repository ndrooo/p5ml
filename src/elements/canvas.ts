import P5MLElement from "../element";
import p5 from "p5";

export default class Canvas extends P5MLElement {
  canvas: HTMLCanvasElement = document.createElement("canvas");

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
    };
    p.draw = () => {
      p.background(getComputedStyle(this).getPropertyValue("background"));
      this.drawRecursive(p);
    };
  }
}
