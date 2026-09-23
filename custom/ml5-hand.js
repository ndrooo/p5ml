class ML5Hand extends HTMLElement {
  canvas = this.closest("p5-canvas");
  capture = this.closest("p5-capture");
  hands = [];
  handPoint = this.getAttribute("point");

  static observedAttributes = ["point"];

  static {
    customElements.define("ml5-hand", this);
  }

  connectedCallback() {
    this.template = document.createElement("template");
    this.template.innerHTML = this.innerHTML;
    this.innerHTML = "";
    this.appendChild(this.template);
    this.canvas.setup.push(async (p) => {
      this.handPose = await ml5.handPose();
      this.handPose.detectStart(
        this.capture.video,
        this.handsDetected.bind(this),
      );
    });
    this.canvas.update.push((p) => {
      let translateElements = this.getElementsByTagName("p5-translate");
      if (this.hands.length < translateElements.length) {
        for (let i = this.hands.length; i < translateElements.length; i++) {
          this.removeChild(translateElements[i]);
        }
      } else if (this.hands.length > translateElements.length) {
        for (let i = translateElements.length; i < this.hands.length; i++) {
          let translate = document.createElement("p5-translate");
          this.appendChild(translate);
        }
      }
      for (let i = 0; i < this.hands.length; i++) {
        translateElements[i].innerHTML = this.template.innerHTML;
        translateElements[i].setAttribute("x", this.hands[i][this.handPoint].x);
        translateElements[i].setAttribute("y", this.hands[i][this.handPoint].y);
      }
    });
  }

  handsDetected(results) {
    this.hands = results;
  }
}
