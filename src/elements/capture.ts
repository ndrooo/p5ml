import P5MLElement from "../element";
import p5 from "p5";
import type Canvas from "./canvas";

export default class Capture extends P5MLElement {
  canvas: Canvas = this.closest("p5-canvas");
  video?: p5.Element;

  static {
    this.define();
  }

  ready(p: p5) {
    this.video = p.createCapture("video");
    this.video.size(
      Number(this.canvas.getAttribute("width")),
      Number(this.canvas.getAttribute("height")),
    );
    this.video.hide();
  }
}
