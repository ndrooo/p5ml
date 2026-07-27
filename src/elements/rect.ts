import P5MLElement from "../element";
import p5 from "p5";

export default class Rect extends P5MLElement {
  width: number = Number(this.getAttribute("w"));
  height: number = Number(this.getAttribute("h"));

  static {
    this.define();
  }

  draw(p: p5) {
    p.stroke(getComputedStyle(this).getPropertyValue("color"));
    p.fill(getComputedStyle(this).getPropertyValue("background-color"));
    p.rect(0, 0, this.width, this.height);
  }
}
