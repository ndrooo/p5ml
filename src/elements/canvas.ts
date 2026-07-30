import P5MLElement from "../element";
import p5 from "p5";

export default class Canvas extends P5MLElement {
  setup: (p: p5) => void | null = null;
  update: (p: p5) => void | null = null;
  paused: boolean = Boolean(this.getAttribute("paused"));
  ranFrameOne = false;
  static observedAttributes = ["paused"];

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
      p.background(getComputedStyle(this).background);
      if (this.setup != null) {
        this.setup(p);
      }
    };
    p.draw = () => {
      if (this.paused && this.ranFrameOne) return;
      if (this.update != null) {
        this.update(p);
      }
      p.background(getComputedStyle(this).background);
      this.drawRecursive(p);
      this.ranFrameOne = true;
    };
  }

  attributeChangedCallback(name: string, _oldValue, newValue) {
    if (name === "paused") {
      this.paused = Boolean(newValue);
    }
  }
}
