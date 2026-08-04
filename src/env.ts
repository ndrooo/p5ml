import Alpine from "alpinejs";
import { createIcons, Pause, Play } from "lucide";
import type p5 from "p5";
import type Canvas from "./elements/canvas";

window["Alpine"] = Alpine;
Alpine.start();
createIcons({ icons: { Pause, Play } });

class FramerateWindow {
  window: number[] = Array(10).fill(60);
  index = 0;

  record(fps: number) {
    this.index = (this.index + 1) % this.window.length;
    this.window[this.index] = fps;
  }

  get(): number {
    return this.window.reduce((a, b) => a + b) / this.window.length;
  }
}

const fps: { [key: string]: FramerateWindow } = {};

Array.from(document.getElementsByClassName("canvas-container")).forEach(
  (container: Element) => {
    const canvas = container.getElementsByTagName("p5-canvas")[0] as Canvas;
    const framerate = container.getElementsByClassName("framerate")[0];
    if (!container.id || !canvas || !framerate) {
      return;
    }
    if (!fps[container.id]) {
      fps[container.id] = new FramerateWindow();
    }
    const fpsWindow = fps[container.id];
    canvas.update.push((p: p5) => {
      fpsWindow.record(p.frameRate());
      if (fpsWindow.index === 0) {
        framerate.textContent = fpsWindow.get().toFixed(0);
      }
    });
  },
);
