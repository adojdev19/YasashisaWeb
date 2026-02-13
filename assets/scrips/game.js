const background = document.getElementById("background");
const nameBox = document.getElementById("name");
const textBox = document.getElementById("text");
const choicesBox = document.getElementById("choices");
const charLeft = document.getElementById("charLeft");
const charCenter = document.getElementById("charCenter");
const charRight = document.getElementById("charRight");
const bgm = document.getElementById("bgm");
const fadeOverlay = document.getElementById("fadeOverlay");

let currentMusic = null;
let currentId = "intro_1";
let typing = false;
let fullText = "";
let typeToken = 0;

let started = false;
let audioUnlocked = false;

let poemMode = false;        // estamos en escena poema
let poemCanAdvance = false;  // solo true cuando termina de escribir

const dialogueBox = document.getElementById("dialogueBox");
const poemHint = document.getElementById("poemHint");



const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;
  if (currentMusic) bgm.play().catch(() => {});
}

startBtn.addEventListener("click", () => {
  started = true;
  startScreen.style.opacity = 0;
setTimeout(() => startScreen.style.display = "none", 250);

  // desbloquea audio por interacción real
  unlockAudio();

  // inicia la historia
  loadScene();
});

function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;

  // intenta reproducir lo que ya esté seteado
  if (currentMusic) {
    bgm.play().catch(() => {});
  }
}

function clearChoices() {
  choicesBox.innerHTML = "";
}

function renderChoices(sceneObj) {
  clearChoices();
  sceneObj.choices.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "choiceBtn";
    btn.textContent = c.text;
    btn.onclick = () => {
      currentId = c.next;
      loadScene();
    };
    choicesBox.appendChild(btn);
  });
}

function typeWriter(text, token, i = 0) {
  if (token !== typeToken) return;
  typing = true;

  const sceneObj = scenes[currentId];
  const isPoem = !!sceneObj?.poem;
  const isIntro = !!sceneObj?.intro;

  // velocidades
  const normalSpeed = 40;
  const poemSpeed = 85;
  const newlinePause = 420;

  // en poema: no hint hasta el final
  if (isPoem) poemHint.classList.remove("show");

  if (i < text.length) {
    const ch = text.charAt(i);
    textBox.textContent += ch;

    let delay = isPoem ? poemSpeed : normalSpeed;
    if (isPoem && ch === "\n") delay += newlinePause;

    setTimeout(() => typeWriter(text, token, i + 1), delay);
    return;
  }

  // ===== terminó de escribir =====
  typing = false;

  // 1) Si la escena tiene autoNext, SIEMPRE auto-avanza (sirve para poema y normal)
  if (sceneObj?.autoNext) {
    // en poema no queremos clicks, así que no habilitamos poemCanAdvance
    poemCanAdvance = false;

    setTimeout(() => {
      currentId = sceneObj.autoNext;
      loadScene();
    }, 2000);
    return;
  }

  // 2) Si es intro (tipo prólogo/epílogo) auto-avanza por next con fade
  if (isIntro && sceneObj?.next) {
    setTimeout(() => {
      // si ya tienes fadeToBlackThen úsalo; si no, cambia directo
      if (typeof fadeToBlackThen === "function") {
        fadeToBlackThen(sceneObj.next);
      } else {
        currentId = sceneObj.next;
        loadScene();
      }
    }, 2000);
    return;
  }

  // 3) Si es poema sin autoNext: solo al final deja continuar con click (tu sistema)
  if (isPoem) {
    poemCanAdvance = true;
    setTimeout(() => poemHint.classList.add("show"), 650);
    return;
  }

  // 4) Escena normal: si tiene choices, muéstralos
  if (sceneObj?.choices) {
    renderChoices(sceneObj);
  }
}


function loadScene() {
  const s = scenes[currentId];
  if (!s) return;

  // ===== RESET UI (IMPORTANTÍSIMO) =====
  // (para que después de la tarjeta vuelvan los diálogos)
  const dialogueBox = document.getElementById("dialogueBox");
  dialogueBox.style.display = "block";

  // ===== MODO EPÍLOGO / INTRO =====
if (s.noUI) {
  fadeOutInBackground(s.bg);

  // ocultar personajes
  charLeft.style.display = "none";
  charCenter.style.display = "none";
  charRight.style.display = "none";

  // ocultar name
  nameBox.textContent = "";

  // activar estilo intro
  dialogueBox.classList.add("introMode");

  clearChoices();
  textBox.textContent = "";
  fullText = s.text || "";

  typeToken++;
    // ✅ Música también en noUI (epílogo/prólogo)
  if (s.music && s.music !== currentMusic) {
    changeMusic(s.music);

    // por si el navegador se pone especial
    if (audioUnlocked) bgm.play().catch(()=>{});
  }
  typeWriter(fullText, typeToken);

  return;
}

  // si quieres que los slots vuelvan a estar disponibles:
  charLeft.style.display = "block";
  charCenter.style.display = "block";
  charRight.style.display = "block";

  // ===== ESCENA SIN DIÁLOGO (tarjeta capítulo) =====
  if (s.noDialogue) {
    fadeOutInBackground(s.bg);

    clearChoices();
    textBox.textContent = "";
    nameBox.textContent = "";

    // ocultar UI
    dialogueBox.style.display = "none";
    charLeft.style.display = "none";
    charCenter.style.display = "none";
    charRight.style.display = "none";

    setTimeout(() => {
      currentId = s.autoNext;
      loadScene();
    }, 3500);

    return;
  }

  // ===== TU LÓGICA NORMAL =====
  if (s.intro) dialogueBox.classList.add("introMode");
  else dialogueBox.classList.remove("introMode");

  poemMode = !!s.poem;
  poemCanAdvance = !poemMode;

  if (poemMode) {
    dialogueBox.classList.add("poemMode");
    poemHint.classList.remove("show");
  } else {
    dialogueBox.classList.remove("poemMode");
    poemHint.classList.remove("show");
  }

  if (s.bg) fadeOutInBackground(s.bg);

  if (s.music && s.music !== currentMusic) changeMusic(s.music);

  setSlot(charLeft, s.left);
  setSlot(charCenter, s.center);
  setSlot(charRight, s.right);

  if (s.speaker) applyFocus(s.speaker);
  else clearFocus();

  nameBox.textContent = s.name || "";

  clearChoices();
  textBox.textContent = "";
  fullText = s.text || "";

  typeToken++;
  typeWriter(fullText, typeToken);
}


document.addEventListener("click", () => {
  if (!started) return;

  unlockAudio();

  const s = scenes[currentId];
  if (s.intro) return; // el prólogo no se acelera ni avanza por click
  if (!s) return;

  // ===== BLOQUEO EN POEMA =====
  if (s.poem) {
  // Ocultar sprites normales
  charLeft.style.display = "none";
  charCenter.style.display = "none";
  charRight.style.display = "none";

  // Mostrar sprite poema
  yazaPoema.style.display = "block";

  poemCanAdvance = false;

  typeWriter(s.text, 50, () => {
    poemCanAdvance = true;
  });

  return;
  }

  // ===== NORMAL =====

  // si hay choices, no avanzar con click (solo con botones)
  if (s.choices) {
    if (typing) {
      typeToken++;
      typing = false;
      textBox.textContent = fullText;
      renderChoices(s);
    }
    return;
  }

  // si está escribiendo, permitir “skip” SOLO en modo normal
  if (typing) {
    typeToken++;
    typing = false;
    textBox.textContent = fullText;
    return;
  }

  if (s.next) {
    currentId = s.next;
    loadScene();
  }
});

function fadeOutInBackground(newBg) {
  background.style.opacity = 0;
  setTimeout(() => {
    background.style.backgroundImage = `url('${newBg}')`;
    background.style.opacity = 1;
  }, 180);
}

function applyFocus(speaker) {
  const slots = [
    {key:"left", el:charLeft},
    {key:"center", el:charCenter},
    {key:"right", el:charRight},
  ];

  slots.forEach(s=>{
    s.el.classList.add("dim","unfocused");
    s.el.classList.remove("focused");
  });

  const active = slots.find(x=>x.key===speaker);
  if(active){
    active.el.classList.remove("dim","unfocused");
    active.el.classList.add("focused");
  }
}

function setSlot(imgEl, src) {
  if (src) {
    imgEl.style.display = "block";
    imgEl.src = src;
  } else {
    imgEl.style.display = "none";
    imgEl.src = "";
  }
}

function clearFocus() {
  [charLeft, charCenter, charRight].forEach(c => c.classList.remove("dim"));
}

function changeMusic(newTrack) {
  if (currentMusic === newTrack) return;

  currentMusic = newTrack;

  // Fade out
  bgm.style.transition = "volume 0.5s";
  const fadeOut = setInterval(() => {
    if (bgm.volume > 0.05) {
      bgm.volume -= 0.05;
    } else {
      clearInterval(fadeOut);
      bgm.pause();
      bgm.src = newTrack;
      bgm.load();
      bgm.volume = 0;
     bgm.play().catch(() => {
  // si está bloqueado, sonará después del primer click
});

      // Fade in
      const fadeIn = setInterval(() => {
        if (bgm.volume < 0.95) {
          bgm.volume += 0.05;
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }
  }, 50);
}

function fadeToBlackThen(nextId){
  fadeOverlay.style.opacity = 1;
  setTimeout(() => {
    currentId = nextId;
    fadeOverlay.style.opacity = 0;
    loadScene();
  }, 1300);
}

/*animaciones
function animateLookAround(element, callback) {
  let count = 0;

  const interval = setInterval(() => {
    element.classList.toggle("mirror");
    count++;

    if (count >= 4) { // 2 veces derecha-izquierda
      clearInterval(interval);
      element.classList.remove("mirror");

      setTimeout(() => {
        if (callback) callback();
      }, 3000);
    }
  }, 3000);
}*/

//loadScene();
