import P5MLElement from "../element";
import p5 from "p5";

export default class Circle extends P5MLElement {
  diameter: number = Number(this.getAttribute("d"));

  static {
    this.define();
  }

  draw(p: p5) {
    p.stroke(getComputedStyle(this).getPropertyValue("color"));
    p.fill(getComputedStyle(this).getPropertyValue("background"));
    p.circle(0, 0, this.diameter);
  }
}
