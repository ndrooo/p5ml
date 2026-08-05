# P5ML - P5 Markup Language

Currently: a small experiment in wrapping [p5.js](https://p5js.org) for declarative use.
Use HTML custom elements and CSS to set up your elements, then control them with vanilla
JS, your own custom elements, or any framework that can manipulate HTML.

If you'd like to check it out, clone, `npm install`, and then `npm run dev`. The easiest way
to test is probably to duplicate `sketches/template.html`. You can add your own custom elements
to `/custom` and make use of the [AlpineJS](https://alpinejs.dev) import for some basic control
flow and convenience. There is no documentation yet but the supported elements/APIs are in
`src/elements` and the supported attributes can be gleaned from the source. Check out `index.html`
and `sketches/template.html` for more comprehensive usage examples.
