import p5 from "p5";
import Capture from "./capture";
import Draw2dElement from "./draw2d";

export default class Image extends Draw2dElement {
  src: string = "";
  fromCapture: string = "";
  dirty = false;
  provider: p5.Image | p5.Element | null = null;

  static observedAttributes = ["src", "from-capture"];

  static {
    this.define();
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (oldVal !== newVal) {
      this.dirty = true;
      if (name === "from-capture") {
        this.fromCapture = newVal;
      } else if (name === "src") {
        this.src = newVal;
      }
    }
  }

  ready(p: p5): void {
    this.updateProvider(p);
  }

  draw(p: p5) {
    if (this.dirty) {
      this.updateProvider(p);
      this.dirty = false;
    }
    if (this.provider !== null) {
      p.image(this.provider, 0, 0);
    }
  }

  updateProvider(p: p5) {
    let capture = document.getElementById(this.fromCapture);
    if (capture instanceof Capture) {
      this.provider = capture.video;
    } else if (this.src !== "") {
      this.provider = p.loadImage(this.src);
    } else {
      this.provider = null;
    }
  }
}
