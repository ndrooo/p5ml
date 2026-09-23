import P5MLElement from "../element";
import p5 from "p5";

export default class Draw2dElement extends P5MLElement {
  preDraw(p: p5) {
    p.stroke(getComputedStyle(this).getPropertyValue("color"));
    p.fill(getComputedStyle(this).getPropertyValue("background"));
    let opacity = Number(getComputedStyle(this).getPropertyValue("opacity"));
    p.tint(255, opacity * 255);
  }

  postDraw(p: p5): void {
    p.noStroke();
    p.noFill();
    p.noTint();
  }
}
