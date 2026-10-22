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
  answer: {
    title: "Una respuesta rápida no siempre construye comprensión.",
    body: "Una explicación completa puede servir, pero si la recibís antes de intentar razonar, es fácil saltarte el aprendizaje. Podés pedirle a la IA que primero te pregunte qué sabés o qué paso intentarías."
  },
  hint: {
    title: "La pregunta te devuelve un papel activo.",
    body: "En vez de resolver por vos, la IA te invita a recuperar lo que sabés y proponer un primer paso. Así podés construir una respuesta propia. Si te trabás, puede ofrecerte otra pregunta o una pista más concreta."
  },
  stuck: {
    title: "Acompañar también significa dar pistas.",
    body: "La IA no tiene que dejarte solo frente al problema. Puede avanzar de a poco: una pista, un ejemplo parecido y, si hace falta, una explicación. Lo importante es que puedas entender y explicar el razonamiento, no solo copiar el resultado."
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
