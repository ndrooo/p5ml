import type p5 from "p5";
import P5MLElement from "../element";

export default class Translate extends P5MLElement {
  x: number = Number(this.getAttribute("x") ?? 0);
  y: number = Number(this.getAttribute("y") ?? 0);
  static observedAttributes = ["x", "y"];

  static {
    this.define();
  }

  draw(p: p5): void {
    p.push();
    p.translate(this.x, this.y);
    this.drawRecursive(p);
    p.pop();
  }

  attributeChangedCallback(name: string, oldValue, newValue) {
    if (Number(oldValue) === Number(newValue)) return;
    this[name] = Number(newValue);
  }
}
