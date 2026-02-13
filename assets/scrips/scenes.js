const scenes = {

  intro_0: {
  bg: "assets/backgrounds/pre_sakura_sunset.png",   // usa un fondo atardecer (puede ser el del preloader)
  music: "assets/audio/preloader.mp3",        // música nueva del prólogo
  intro: true,                                // <-- bandera para comportamiento especial
  text:
    "Tantas almas, tantos cuerpos, tantas ideas.\n" +
    "Pensamientos, experiencias, todo sucediendo al mismo tiempo.\n\n" +
    "Todos somos nuestro propio universo;\n" +
    "todos vemos y provocamos sucesos.\n\n" +
    "Como Yasashisa, la gata normal.\n" +
    "Solo una más.\n\n" +
    "No es una superheroína —según ella—,\n" +
    "solo una pieza más de este enorme rompecabezas.\n\n" +
    "Solo quiere una vida de paz,\n" +
    "tranquilidad.\n\n",
  next: "intro_01" // <-- aquí pones la escena 1 real de tu capítulo (la primera que ya tienes)


},
  intro_01: {
  bg: "assets/backgrounds/pre_sakura_sunset.png",   // usa un fondo atardecer (puede ser el del preloader)
  intro: true,                                // <-- bandera para comportamiento especial
  text:
    "Que sus ideas y sus poemas fluyan en su cuaderno.\n" +
    "Sin hacer nada especial.\n" +
    "Sin atraer focos.\n" +
    "Sin generar miradas.\n\n" +
    "Solo ser ella,\n" +
    "y su libreta,\n" +
    "sentadas en el silencio de la tranquilidad.",
  next: "chapter_1_card" // <-- aquí pones la escena 1 real de tu capítulo (la primera que ya tienes)


},


  // ========= CAP 1: INTRO =========
chapter_1_card: {
  bg: "assets/backgrounds/capitulo1.png",
  speaker: null,
  name: "",
  text: "",
  noDialogue: true,
  autoNext: "intro_1"
},

  // ========= CAP 1: INTRO =========

  intro_1: {
    bg: "assets/backgrounds/mallExterior.png",
    center: "assets/characters/yazamain.png",
    speaker: "center",
    name: "Narrador",
    text: "Casi sin ganas, sin mucho ánimo, pero decidida, Yusuriha fue al centro comercial.",
    music: "assets/audio/mallmusic.mp3",
    next: "intro_2"
  },

  intro_2: {
    bg: "assets/backgrounds/tiendalejos.png",
    center: "assets/characters/yazapensando.png",
    speaker: "center",
    name: "Yusuriha",
    text: "Día largo y ajetreado… Mucha gente… y me tocará hablar con dependientas.",
    next: "intro_3"
  },

  intro_3: {
    bg: "assets/backgrounds/tiendalejos.png",
    center: "assets/characters/yazamain.png",
    speaker: "center",
    name: "Narrador",
    text: "—Buenos días —escuchaba aquí y allá.",
    next: "intro_4"
  },

  intro_4: {
    bg: "assets/backgrounds/tiendalejos.png",
    center: "assets/characters/yazanerviosa.png",
    speaker: "center",
    name: "Yusuriha",
    text: "Tenga… buen día usted…",
    next: "intro_5"
  },

  intro_5: {
    bg: "assets/backgrounds/tiendalejos.png",
    center: "assets/characters/yazapensando.png",
    speaker: "center",
    name: "Narrador",
    text: "En busca de nuevos lápices, su pastel favorito y un té para relajarse, emprendió la búsqueda de su tienda habitual.",
    next: "mall_1"
  },

  // ========= VE AL POLLO =========

  mall_1: {
    bg: "assets/backgrounds/tiendacerca.png",
    center: "assets/characters/pollomain.png",
    speaker: "center",
    name: "Narrador",
    text: "A medio caminar, vio un pollo.",
    next: "mall_2"
  },

  mall_2: {
    bg: "assets/backgrounds/tiendacerca.png",
    center: "assets/characters/pollomain.png",
    speaker: "center",
    name: "Narrador",
    text: "Lucía desorientado: miraba a la izquierda… miraba arriba… miraba abajo.",
    next: "mall_3"
  },

  mall_3: {
    bg: "assets/backgrounds/tiendacerca.png",
    center: "assets/characters/yazapensando.png",
    speaker: "center",
    name: "Yusuriha",
    text: "…",
    next: "mall_4"
  },

  mall_4: {
    bg: "assets/backgrounds/tiendacerca.png",
    center: "assets/characters/yazamain.png",
    speaker: "center",
    name: "Narrador",
    text: "Un pollo algo raro. Yusuriha siguió su camino, con cuidado de no tropezar con nadie.",
    next: "buy_1"
  },

  // ========= COMPRAS =========

  buy_1: {
    bg: "assets/backgrounds/tiendalejos.png",
    center: "assets/characters/yazafeliz.png",
    speaker: "center",
    name: "Narrador",
    text: "Con las manos llenas —su postre, su té y su ejército de lápices en el bolso— se dispuso a volver a la tranquilidad de su hogar.",
    next: "return_1"
  },

  // ========= EL POLLO SIGUE AHÍ =========

  return_1: {
    bg: "assets/backgrounds/tiendacerca.png",
    right: "assets/characters/pollomain.png",
    left: "assets/characters/yazanerviosa.png",
    speaker: "left",
    name: "Narrador",
    text: "El pollo seguía en el mismo lugar.",
    next: "choice_1"
  },

  choice_1: {
    bg: "assets/backgrounds/tiendacerca.png",
    left: "assets/characters/yazanerviosa.png",
    right: "assets/characters/pollomain.png",
    speaker: "left",
    name: "Yusuriha",
    text: "No quiero preguntar… me da pena… pero me incomoda hablar con alguien que no conozco.",
    choices: [
      { text: "Ignorar y seguir", next: "ignore_1" },
      { text: "Mirarlo otra vez", next: "encounter_1" }
    ]
  },

  // ========= RUTA: IGNORAR (SIN POEMA) =========

  ignore_1: {
    bg: "assets/backgrounds/mallExterior.png",
    center: "assets/characters/yazapensando.png",
    speaker: "center",
    name: "Narrador",
    text: "Decidió no intervenir. Con paso rápido, salió del centro comercial.",
    next: "ignore_2"
  },

  ignore_2: {
    bg: "assets/backgrounds/yazaroom.png",
    center: "assets/characters/yazamain.png",
    speaker: "center",
    name: "Narrador",
    text: "Ya en casa, el día terminó como cualquier otro. Nada extraordinario ocurrió.",
    next: "chapter1_epilogue_1"
  },

  // ========= RUTA: AYUDAR (CON POEMA) =========

  encounter_1: {
    bg: "assets/backgrounds/tiendacerca.png",
    left: "assets/characters/yazanerviosa.png",
    right: "assets/characters/pollonervioso.png",
    speaker: "center",
    name: "Narrador",
    text: "El pollo notó que ella lo miraba y, sin miedo ni reparo, se acercó con descaro.",
    next: "encounter_2"
  },

  encounter_2: {
    bg: "assets/backgrounds/tiendacerca.png",
    left: "assets/characters/yazanerviosa.png",
    right: "assets/characters/pollonervioso.png",
    speaker: "right",
    name: "Pollo",
    text: "Di-di-di-disculpe…",
    next: "encounter_3"
  },

  encounter_3: {
    bg: "assets/backgrounds/tiendacerca.png",
    left: "assets/characters/yazapensando.png",
    right: "assets/characters/pollonervioso.png",
    speaker: "left",
    name: "Yusuriha",
    text: "Respire… esté tranquilo… relájese.",
    next: "encounter_4"
  },

  encounter_4: {
    bg: "assets/backgrounds/tiendacerca.png",
    left: "assets/characters/yazapensando.png",
    right: "assets/characters/pollomain.png",
    speaker: "right",
    name: "Pollo",
    text: "¿Sabe usted dónde puedo buscar una crema para la cara de mi hija?",
    next: "encounter_5"
  },

  encounter_5: {
    bg: "assets/backgrounds/tiendacerca.png",
    left: "assets/characters/yazapensando.png",
    right: "assets/characters/pollomain.png",
    speaker: "left",
    name: "Yusuriha",
    text: "Pero… ¿para qué específicamente la quiere?",
    next: "encounter_6"
  },

  encounter_6: {
    bg: "assets/backgrounds/tiendacerca.png",
    left: "assets/characters/yazanerviosa.png",
    right: "assets/characters/pollomain.png",
    speaker: "right",
    name: "Pollo",
    text: "Sí, sí… para eso del acné.",
    next: "encounter_7"
  },

  encounter_7: {
    bg: "assets/backgrounds/tiendacerca.png",
    left: "assets/characters/yazamain.png",
    right: "assets/characters/pollogracias.png",
    speaker: "left",
    name: "Yusuriha",
    text: "Hay una tienda llamada Dreams. Queda dos veces a la derecha desde aquí.",
    next: "encounter_8"
  },

  encounter_8: {
    bg: "assets/backgrounds/tiendacerca.png",
    left: "assets/characters/yazamain.png",
    right: "assets/characters/pollogracias.png",
    speaker: "right",
    name: "Pollo",
    text: "Mu-muchísimas gracias, señorita. Que Dios me la bendiga.",
    next: "home_1"
  },

  home_1: {
    bg: "assets/backgrounds/yazaroom.png",
    center: "assets/characters/yazapensando.png",
    speaker: "center",
    name: "Narrador",
    text: "Ya en casa, recordando el día, empezó a dar vida a la hoja.",
    music: "assets/audio/homemusic.mp3",
    next: "poem_1"
  },

  poem_1: {
    bg: "assets/backgrounds/yazaroom.png",
    center: "assets/characters/yazaPoema.png",
    speaker: "center",
    name: "Poema",
    poem: true,
    text:
      "Ayudar\n" +
      "No fue algo muy espectacular\n" +
      "Nada que esté fuera de lugar\n" +
      "Solo fue fácil indicaciones dar\n" +
      "No me tuve que esforzar\n" +
      "Pero me puede reconfortar\n" +
      "Saber que pude ayudar",
     autoNext: "chapter1_epilogue_1"  
  },


  // ===============================
// EPÍLOGO CAPÍTULO 1
// ===============================

chapter1_epilogue_1: {
  bg: "assets/backgrounds/black.png",
  music: "assets/audio/epilogo.mp3",
  intro: true,
  noUI: true,
  text:
    "No fue un gran suceso.\n" +
    "No cambió el mundo.\n" +
    "No movió montañas.",
  next: "chapter1_epilogue_2"
},

chapter1_epilogue_2: {
  bg: "assets/backgrounds/black.png",
  intro: true,
  noUI: true,
  text:
    "Solo fue un momento.\n" +
    "Una pregunta sencilla.\n" +
    "Una respuesta quizá torpe.",
  next: "chapter1_epilogue_3"
},

chapter1_epilogue_3: {
  bg: "assets/backgrounds/black.png",
  intro: true,
  noUI: true,
  text:
    "Pero incluso las cosas pequeñas\n" +
    "dejan eco.",
  next: "chapter1_epilogue_4"
},

chapter1_epilogue_4: {
  bg: "assets/backgrounds/black.png",
  intro: true,
  noUI: true,
  text:
    "Y a veces,\n" +
    "eso es suficiente.",
  next: "chapter1_epilogue_5"
},

chapter1_epilogue_5: {
  bg: "assets/backgrounds/black.png",
  intro: true,
  noUI: true,
  text:
    "Gracias por acompañar este capítulo, Meli.",
  next: "chapter1_epilogue_6"
},

chapter1_epilogue_6: {
  bg: "assets/backgrounds/black.png",
  intro: true,
  noUI: true,
  text:
    "Capítulo 1 — Obviedades",
  next: "chapter1_epilogue_7"
},

chapter1_epilogue_7: {
  bg: "assets/backgrounds/black.png",
  intro: true,
  noUI: true,
  text:
    "Próximamente:\n" +
    "Capítulo 2\n\n\n\n" +
    "またね。",
}
};


