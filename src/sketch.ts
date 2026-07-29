import Canvas from "./elements/canvas.ts";
import type p5 from "p5";
import type Translate from "./elements/translate.ts";

const canvas: Canvas = document.getElementsByTagName("p5-canvas")[0] as Canvas;
const framerate: Element = document.getElementById("framerate");

let time = 0;

let movers: Translate[] = [];
let mover_offsets: number[] = [];
let framerateWindow: number[] = Array(10).fill(60);
let framerateWindowIndex = 0;

canvas.setup = (p: p5) => {
  movers = Array.from(document.getElementsByClassName("mover")) as Translate[];
  mover_offsets = Array.from(movers).map((_mover) => p.random() * 100);
};

canvas.update = (p: p5) => {
  var movers = document.getElementsByClassName("mover");
  for (let i = 0; i < movers.length; i++) {
    var xNoise = p.noise(time + mover_offsets[i]) * p.width;
    var yNoise = p.noise(time + 200 + mover_offsets[i]) * p.height;
    movers[i].setAttribute("x", xNoise.toString());
    movers[i].setAttribute("y", yNoise.toString());
  }
  time += 0.01;
  framerateWindowIndex = (framerateWindowIndex + 1) % framerateWindow.length;
  framerateWindow[framerateWindowIndex] = p.frameRate();
  if (framerateWindowIndex === 0) {
    let frAvg = framerateWindow.reduce((a, b) => a + b) / framerateWindow.length;
    framerate.textContent = frAvg.toPrecision(4);
  }
};
