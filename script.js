const synth = window.speechSynthesis
let isSpeaking = false
let activeMarker = null

const playBtn = document.getElementById("play-btn")
const stopBtn = document.getElementById("stop-btn")
const textElement = document.getElementById("phoenix-text")
const titleElement = document.getElementById("title")

const texts = {
  phoenix: {
    title: "Historia del Fénix",
    content:
      "El fénix es un ave mítica que simboliza la inmortalidad, la resurrección y la vida después de la muerte. Se dice que cuando el fénix siente que va a morir, construye un nido de ramas aromáticas y especias, se incendia y renace de sus cenizas.",
  },
  lion: {
    title: "Historia del León",
    content:
      "El león es un símbolo de fuerza, valentía y liderazgo. Ha sido representado en diversas culturas como el rey de los animales, apareciendo en banderas, escudos de armas y mitologías alrededor del mundo.",
  },
  honestidad: {
    title: "Valor Intitucional: HONESTIDAD",
    content:
      "La Honestidad les da honor y decoro a las actividades realizadas, porque genera confianza, respeto y consideración por el trabajo. Es el valor que les da decoro y pudor a nuestras acciones y nos hace dignos de merecer honor, respeto y consideración.",
  },
  prudencia: {
    title: "Valor Intitucional: PRUDENCIA",
    content:
      "La Prudencia es el ejercicio pensado del ser y del actuar para el respeto de los otros; implica callar cuando no corresponde ni por autoridad ni por trabajo, o delatar o hablar o escribir o dar información sobre lo que no se me pregunta. La Prudencia es el valor del discernimiento sobre el bien y la forma para llevarlo a cabo y permite distinguir entre lo bueno y lo malo.",
  },
  justicia: {
    title: "Valor Intitucional: JUSTICIA",
    content:
      "La Justicia corresponde a la Universidad ser depositaria de la aplicación de la Justicia, entendida ésta como todas las acciones públicas y privadas dirigidas a los individuos para garantizar la igualdad, el respeto, la integridad, el libre desarrollo de la personalidad y el respeto por la vida, las creencias, los credos políticos, los derechos humanos, y el disfrute de condiciones de dignidad para estudiantes, profesores y administrativos, a la luz de su misión y visión en el marco legal y constitucional que nos rige. La Justicia considerada por los antiguos como la más excelsa de todas las virtudes, es un valor que nos inclina a dar a cada quien lo que le corresponde como propio según la recta razón.",
  },
  responsabilidad: {
    title: "Valor Intitucional: Responsabilidad",
    content:
      "La Responsabilidad es el cumplimiento de la tarea o labor asignada, asumida de manera libre y autónoma, y como compromiso individual, colectivo o social, desde la posición que cada grupo, individuo o estamento ocupe, para generar un clima de confianza. La Responsabilidad es la conciencia acerca de las consecuencias de todas nuestras actuaciones y la libre voluntad para realizarlas.",
  },
}

// Función para actualizar el estado de los botones
function updateButtonState() {
  // Ocultar ambos botones primero
  playBtn.classList.add("hidden")
  stopBtn.classList.add("hidden")

  // Solo mostrar botones si hay un marcador activo
  if (activeMarker) {
    if (isSpeaking) {
      // Si está reproduciendo, mostrar el botón de detener
      stopBtn.classList.remove("hidden")
    } else {
      // Si no está reproduciendo, mostrar el botón de reproducir
      playBtn.classList.remove("hidden")
    }
  }
}

// Función para detener la reproducción
function stopSpeaking() {
  synth.cancel()
  isSpeaking = false
  updateButtonState()
}

// Detectar cuándo un marcador es visible
document.querySelector("#marker-phoenix").addEventListener("markerFound", () => {
  titleElement.innerText = texts.phoenix.title
  textElement.innerText = texts.phoenix.content
  activeMarker = "phoenix"

  // Mostrar el botón adecuado
  updateButtonState()

  // Restablecer escala al tamaño original del ave
  document.querySelector("#bird-model").setAttribute("scale", "0.6 1 1")
})

document.querySelector("#marker-lion").addEventListener("markerFound", () => {
  titleElement.innerText = texts.lion.title
  textElement.innerText = texts.lion.content
  activeMarker = "lion"

  // Mostrar el botón adecuado
  updateButtonState()

  // Restablecer escala al tamaño original del león
  document.querySelector("#lion-model").setAttribute("scale", "0.6 1 1")
})

document.querySelector("#marker-honestidad").addEventListener("markerFound", () => {
  titleElement.innerText = texts.honestidad.title
  textElement.innerText = texts.honestidad.content
  activeMarker = "honestidad"

  // Mostrar el botón adecuado
  updateButtonState()

  // Restablecer escala al tamaño original del león
  document.querySelector("#honestidad-model").setAttribute("scale", "1 1 1")
})

document.querySelector("#marker-prudencia").addEventListener("markerFound", () => {
  titleElement.innerText = texts.prudencia.title
  textElement.innerText = texts.prudencia.content
  activeMarker = "prudencia"

  // Mostrar el botón adecuado
  updateButtonState()

  // Restablecer escala al tamaño original del león
  document.querySelector("#prudencia-model").setAttribute("scale", "1 1 1")
})

document.querySelector("#marker-justicia").addEventListener("markerFound", () => {
  titleElement.innerText = texts.justicia.title
  textElement.innerText = texts.justicia.content
  activeMarker = "justicia"

  // Mostrar el botón adecuado
  updateButtonState()

  // Restablecer escala al tamaño original de responsabilidad
  document.querySelector("#justicia-model").setAttribute("scale", "1 1 1")
})

document.querySelector("#marker-responsabilidad").addEventListener("markerFound", () => {
  titleElement.innerText = texts.responsabilidad.title
  textElement.innerText = texts.responsabilidad.content
  activeMarker = "responsabilidad"

  // Mostrar el botón adecuado
  updateButtonState()

  // Restablecer escala al tamaño original de responsabilidad
  document.querySelector("#responsabilidad-model").setAttribute("scale", "0.4 0.4 0.4")
})

// Opción: Puedes hacer que desaparezca el texto cuando no haya marcador detectado
document.querySelector("#marker-phoenix").addEventListener("markerLost", () => {
  if (activeMarker === "phoenix") {
    titleElement.innerText = ""
    textElement.innerText = ""
    activeMarker = null

    // Ocultar todos los botones y detener la reproducción
    playBtn.classList.add("hidden")
    stopBtn.classList.add("hidden")
    stopSpeaking()
  }
})

document.querySelector("#marker-lion").addEventListener("markerLost", () => {
  if (activeMarker === "lion") {
    titleElement.innerText = ""
    textElement.innerText = ""
    activeMarker = null

    // Ocultar todos los botones y detener la reproducción
    playBtn.classList.add("hidden")
    stopBtn.classList.add("hidden")
    stopSpeaking()
  }
})

document.querySelector("#marker-honestidad").addEventListener("markerLost", () => {
  if (activeMarker === "honestidad") {
    titleElement.innerText = ""
    textElement.innerText = ""
    activeMarker = null

    // Ocultar todos los botones y detener la reproducción
    playBtn.classList.add("hidden")
    stopBtn.classList.add("hidden")
    stopSpeaking()
  }
})

document.querySelector("#marker-prudencia").addEventListener("markerLost", () => {
  if (activeMarker === "prudencia") {
    titleElement.innerText = ""
    textElement.innerText = ""
    activeMarker = null

    // Ocultar todos los botones y detener la reproducción
    playBtn.classList.add("hidden")
    stopBtn.classList.add("hidden")
    stopSpeaking()
  }
})

document.querySelector("#marker-justicia").addEventListener("markerLost", () => {
  if (activeMarker === "justicia") {
    titleElement.innerText = ""
    textElement.innerText = ""
    activeMarker = null

    // Ocultar todos los botones y detener la reproducción
    playBtn.classList.add("hidden")
    stopBtn.classList.add("hidden")
    stopSpeaking()
  }
})

document.querySelector("#marker-responsabilidad").addEventListener("markerLost", () => {
  if (activeMarker === "responsabilidad") {
    titleElement.innerText = ""
    textElement.innerText = ""
    activeMarker = null

    // Ocultar todos los botones y detener la reproducción
    playBtn.classList.add("hidden")
    stopBtn.classList.add("hidden")
    stopSpeaking()
  }
})

// Función para iniciar la reproducción
playBtn.addEventListener("click", () => {
  if (textElement.innerText) {
    const utterance = new SpeechSynthesisUtterance(textElement.innerText)
    utterance.lang = "es-ES"
    utterance.rate = 1.0
    utterance.pitch = 1.0

    utterance.onstart = () => {
      isSpeaking = true
      updateButtonState()
    }

    utterance.onend = () => {
      isSpeaking = false
      updateButtonState()
    }

    synth.speak(utterance)
  }
})

// Función para detener la reproducción
stopBtn.addEventListener("click", () => {
  stopSpeaking()
})

// Pequeña mejora para prevenir zoom en dispositivos iOS
document.addEventListener("gesturestart", (e) => {
  e.preventDefault()
})

