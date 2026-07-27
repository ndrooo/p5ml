import type p5 from "p5";
import P5MLElement from "../element";

export default class Translate extends P5MLElement {
  x: number = Number(this.getAttribute("x"));
  y: number = Number(this.getAttribute("y"));

  static {
    this.define();
  }

  draw(p: p5): void {
    p.push();
    p.translate(this.x, this.y);
    this.drawRecursive(p);
    p.pop();
  }
}
