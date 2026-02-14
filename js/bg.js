/* ============================================
   Floating Document Background
   Auto-injects animated paper shapes
   ============================================ */
(function () {
  var container = document.createElement("div");
  container.className = "floating-docs-bg";
  container.setAttribute("aria-hidden", "true");

  var docs = [
    { w: 64, h: 82, x: 4,  y: 6,  rot: -14, dur: 26, delay: 0,   op: 0.38 },
    { w: 48, h: 62, x: 88, y: 10, rot: 10,  dur: 22, delay: -4,  op: 0.28 },
    { w: 74, h: 96, x: 72, y: 62, rot: -7,  dur: 30, delay: -9,  op: 0.32 },
    { w: 42, h: 54, x: 18, y: 72, rot: 18,  dur: 24, delay: -13, op: 0.22 },
    { w: 58, h: 74, x: 48, y: 28, rot: -20, dur: 32, delay: -6,  op: 0.26 },
    { w: 44, h: 58, x: 32, y: 88, rot: 14,  dur: 20, delay: -11, op: 0.22 },
    { w: 68, h: 88, x: 92, y: 42, rot: -9,  dur: 28, delay: -2,  op: 0.30 },
    { w: 38, h: 50, x: 8,  y: 38, rot: 24,  dur: 18, delay: -15, op: 0.20 },
    { w: 54, h: 70, x: 62, y: 78, rot: -16, dur: 34, delay: -8,  op: 0.24 },
    { w: 46, h: 60, x: 40, y: 3,  rot: 6,   dur: 21, delay: -7,  op: 0.22 },
    { w: 36, h: 46, x: 78, y: 88, rot: -22, dur: 27, delay: -5,  op: 0.18 },
    { w: 52, h: 68, x: 55, y: 52, rot: 12,  dur: 25, delay: -10, op: 0.20 }
  ];

  docs.forEach(function (d) {
    var el = document.createElement("div");
    el.className = "floating-doc";
    el.style.width = d.w + "px";
    el.style.height = d.h + "px";
    el.style.left = d.x + "%";
    el.style.top = d.y + "%";
    el.style.opacity = d.op;
    el.style.setProperty("--float-rot", d.rot + "deg");
    el.style.animationDuration = d.dur + "s";
    el.style.animationDelay = d.delay + "s";
    container.appendChild(el);
  });

  document.body.prepend(container);
})();
