

// ========= PETAL SYSTEM (preloader) =========
// Requiere: <div class="petalLayer"></div> en el HTML del startScreen
// y un PNG de pétalo con transparencia (ej: assets/ui/petal.png)

(function initPetals(){
  const layer = document.querySelector("#startScreen .petalLayer");
  if(!layer) return;

  const MAX_PETALS = 55;              // límite en pantalla
  const SPAWN_EVERY_MS = 320;         // frecuencia
  const PETAL_SRC_TEST = "assets/ui/petal.png"; // misma ruta que en CSS (solo referencia)

  let running = true;

  // opcional: pausa cuando se quite el startScreen
  const obs = new MutationObserver(() => {
    if (!document.getElementById("startScreen")) running = false;
  });
  obs.observe(document.body, { childList:true, subtree:true });

  function rand(min, max){ return Math.random() * (max - min) + min; }
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  function countPetals(){
    return layer.querySelectorAll(".petal").length;
  }

  function spawnPetal(depth="mid"){
    const p = document.createElement("div");
    p.className = `petal ${depth}`;

    const size =
      depth === "front" ? rand(80, 110) :
      depth === "back"  ? rand(90, 120) :
                          rand(100, 130);

    const fall =
      depth === "front" ? rand(8, 13) :
      depth === "back"  ? rand(14, 22) :
                          rand(10, 18);

    const opacity =
      depth === "front" ? rand(0.55, 0.95) :
      depth === "back"  ? rand(0.20, 0.55) :
                          rand(0.35, 0.80);

    const blur =
      depth === "front" ? rand(0, 0.3) :
      depth === "back"  ? rand(0.6, 1.3) :
                          rand(0.2, 0.8);

    const x = rand(0, 100); // vw
    const drift = rand(-60, 60); // px total a lo largo de la caída
    const swayAmp =
      depth === "front" ? rand(14, 34) :
      depth === "back"  ? rand(8, 18) :
                          rand(10, 26);

    const spin = rand(4, 10);
    const sway = rand(2.2, 5.0);
    const delay = rand(0, 1.2);

    const rot = rand(-180, 180);
    const rot2 = rand(-720, 720);

    // CSS variables por pétalo
    p.style.setProperty("--size", `${size}px`);
    p.style.setProperty("--fall", `${fall}s`);
    p.style.setProperty("--opacity", opacity.toFixed(2));
    p.style.setProperty("--blur", `${blur.toFixed(2)}px`);
    p.style.setProperty("--x", `${x}vw`);
    p.style.setProperty("--drift", `${drift.toFixed(0)}px`);
    p.style.setProperty("--swayAmp", `${swayAmp.toFixed(0)}px`);
    p.style.setProperty("--spin", `${spin}s`);
    p.style.setProperty("--sway", `${sway}s`);
    p.style.setProperty("--delay", `${delay}s`);
    p.style.setProperty("--rot", `${rot.toFixed(0)}deg`);
    p.style.setProperty("--rot2", `${rot2.toFixed(0)}deg`);

    // al terminar la caída (animationend del fall), lo removemos
    p.addEventListener("animationend", (e) => {
      if (e.animationName === "petalFall") p.remove();
    });

    layer.appendChild(p);
  }

  // spawner principal con capas
  const timer = setInterval(() => {
    if(!running) { clearInterval(timer); return; }

    // respeta límite
    if (countPetals() >= MAX_PETALS) return;

    // 3 capas (probabilidades)
    const roll = Math.random();
    const depth =
      roll < 0.20 ? "front" :
      roll < 0.55 ? "mid" :
                    "back";

    spawnPetal(depth);
  }, SPAWN_EVERY_MS);

  // primer “burst” para que no empiece vacío
  for(let i=0;i<18;i++){
    spawnPetal(pick(["back","mid","mid","front"]));
  }

})();