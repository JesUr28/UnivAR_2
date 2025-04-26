// Inicialización de variables
const synth = window.speechSynthesis
let utterance = null
let currentText = ""
let currentPosition = 0
let activeMarker = null
let isSpeaking = false
let isPaused = false

// Elementos del DOM
const speakBtn = document.getElementById("speak-btn")
const textElement = document.getElementById("phoenix-text")
const titleElement = document.getElementById("title")
const playIcon = document.getElementById("play-icon")
const pauseIcon = document.getElementById("pause-icon")

// Textos para cada marcador
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

// Función para mostrar el contenido cuando se detecta un marcador
function showContent(markerId) {
  const markerKey = markerId.replace("marker-", "")
  if (texts[markerKey]) {
    titleElement.innerText = texts[markerKey].title
    textElement.innerText = texts[markerKey].content
    currentText = texts[markerKey].content
    activeMarker = markerId

    // Mostrar el botón de reproducción
    speakBtn.classList.remove("hidden")

    // Si estaba hablando de otro marcador, detener y reiniciar
    if (isSpeaking && !isPaused) {
      stopSpeaking()
    }
  }
}

// Función para ocultar el contenido cuando se pierde un marcador
function hideContent(markerId) {
  if (activeMarker === markerId) {
    titleElement.innerText = ""
    textElement.innerText = ""
    activeMarker = null

    // Ocultar el botón y detener la reproducción
    speakBtn.classList.add("hidden")
    stopSpeaking()
  }
}

// Función para iniciar o reanudar la reproducción
function startSpeaking() {
  if (isPaused) {
    // Reanudar desde donde se pausó
    utterance = new SpeechSynthesisUtterance(currentText.substring(currentPosition))
  } else {
    // Iniciar desde el principio
    utterance = new SpeechSynthesisUtterance(currentText)
    currentPosition = 0
  }

  utterance.lang = "es-ES"
  utterance.rate = 1.0
  utterance.pitch = 1.0

  // Guardar la posición actual para poder reanudar después
  utterance.onboundary = (event) => {
    if (event.name === "word") {
      currentPosition = event.charIndex
    }
  }

  utterance.onstart = () => {
    isSpeaking = true
    isPaused = false
    updateButtonState()
  }

  utterance.onend = () => {
    isSpeaking = false
    isPaused = false
    currentPosition = 0
    updateButtonState()
  }

  synth.speak(utterance)
}

// Función para pausar la reproducción
function pauseSpeaking() {
  if (isSpeaking) {
    synth.pause()
    isPaused = true
    updateButtonState()
  }
}

// Función para detener completamente la reproducción
function stopSpeaking() {
  synth.cancel()
  isSpeaking = false
  isPaused = false
  currentPosition = 0
  updateButtonState()
}

// Función para actualizar el estado del botón
function updateButtonState() {
  if (isSpeaking && !isPaused) {
    playIcon.classList.add("hidden")
    pauseIcon.classList.remove("hidden")
  } else {
    playIcon.classList.remove("hidden")
    pauseIcon.classList.add("hidden")
  }
}

// Evento de clic en el botón de reproducción
speakBtn.addEventListener("click", () => {
  if (isSpeaking && !isPaused) {
    pauseSpeaking()
  } else {
    startSpeaking()
  }
})

// Eventos para detectar marcadores
const markers = ["phoenix", "lion", "honestidad", "prudencia", "justicia", "responsabilidad"]

markers.forEach((marker) => {
  const markerElement = document.querySelector(`#marker-${marker}`)

  markerElement.addEventListener("markerFound", () => {
    showContent(`marker-${marker}`)
  })

  markerElement.addEventListener("markerLost", () => {
    hideContent(`marker-${marker}`)
  })
})

// Prevenir zoom en dispositivos iOS
document.addEventListener("gesturestart", (e) => {
  e.preventDefault()
})

// Verificar si el navegador soporta la API de síntesis de voz
document.addEventListener("DOMContentLoaded", () => {
  if (!("speechSynthesis" in window)) {
    speakBtn.disabled = true
    speakBtn.innerText = "Navegador no compatible"
  }

  // Precarga de voces para mejor rendimiento
  synth.getVoices()
})
