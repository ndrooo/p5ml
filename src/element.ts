import p5 from "p5";

export default class P5MLElement extends HTMLElement {
  static define() {
    customElements.define(`p5-${this.name.toLowerCase()}`, this);
  }

  static isP5(element: Element) {
    return element.tagName.toLowerCase().startsWith("p5-");
  }

  draw(_p: p5) {}

  drawRecursive(p: p5, target: Element = this) {
    Array.from(target.children).forEach((child: Element) => {
      if (P5MLElement.isP5(child)) {
        (child as P5MLElement).draw(p);
      } else {
        this.drawRecursive(p, child);
      }
    });
  }
}
