/*
  CONFIGURACIÓN DEL VIDEO:
  1. Subí tu video a YouTube.
  2. Copiá el enlace completo, por ejemplo:
     https://www.youtube.com/watch?v=abcdefghijk
  3. Pegalo en YOUTUBE_URL de abajo.
*/
const YOUTUBE_URL = "https://www.youtube.com/watch?v=bDOaskRvBl8";

function getYouTubeId(url) {
  if (!url || url.includes("PEGAR_LINK") || url.includes("VIDEO_ID")) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.split("/").filter(Boolean)[0] || null;
    }
    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtube-nocookie.com")) {
      if (parsed.pathname === "/watch") return parsed.searchParams.get("v");
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live"].includes(parts[0])) return parts[1] || null;
    }
  } catch (error) {
    return null;
  }
  return null;
}

const videoId = getYouTubeId(YOUTUBE_URL);
const youtubeFrame = document.getElementById("youtubeVideo");
const videoPlaceholder = document.getElementById("videoPlaceholder");

if (videoId && youtubeFrame) {
  youtubeFrame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0`;
  if (videoPlaceholder) videoPlaceholder.hidden = true;
}

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });
}

const feedbackContent = {
  copy: {
    title: "Resolver no siempre es aprender.",
    body: "Copiar una respuesta sin comprenderla puede resolver la entrega inmediata, pero deja sin comprobar si entendiste el tema. Además, podrías presentar errores sin detectarlos. Si elegís este camino, al menos frená y preguntate: ¿puedo explicar por qué esta respuesta tiene sentido?"
  },
  regenerate: {
    title: "Otra respuesta no es necesariamente una respuesta mejor.",
    body: "Pedir una reformulación puede ayudar a aclarar una idea, pero no verifica que sea verdadera. Conviene pedir que explique sus pasos, comprobar las afirmaciones importantes y contrastarlas con fuentes confiables."
  },
  verify: {
    title: "La IA como apoyo, no como reemplazo.",
    body: "Este camino te invita a participar activamente: revisar argumentos, contrastar fuentes y explicar la idea con tus palabras. No garantiza que nunca te equivoques, pero convierte la respuesta en una oportunidad para aprender."
  }
};

const choices = document.querySelectorAll(".choice");
const choiceFeedback = document.getElementById("choiceFeedback");
const resetChallenge = document.getElementById("resetChallenge");
const challengeProgress = document.getElementById("challengeProgress");

choices.forEach((button) => {
  button.addEventListener("click", () => {
    const response = feedbackContent[button.dataset.choice];
    if (!response || !choiceFeedback) return;

    choices.forEach((choice) => {
      choice.disabled = true;
      choice.classList.toggle("selected", choice === button);
    });

    choiceFeedback.innerHTML = `<strong>${response.title}</strong><span>${response.body}</span>`;
    choiceFeedback.hidden = false;
    if (resetChallenge) resetChallenge.hidden = false;
    if (challengeProgress) challengeProgress.textContent = "REFLEXIONÁ SOBRE TU ELECCIÓN";
  });
});

if (resetChallenge) {
  resetChallenge.addEventListener("click", () => {
    choices.forEach((choice) => {
      choice.disabled = false;
      choice.classList.remove("selected");
    });
    if (choiceFeedback) {
      choiceFeedback.hidden = true;
      choiceFeedback.textContent = "";
    }
    resetChallenge.hidden = true;
    if (challengeProgress) challengeProgress.textContent = "TU DECISIÓN";
  });
}
