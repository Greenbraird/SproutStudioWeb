const toast = document.getElementById("toast");
const shareBtn = document.getElementById("shareBtn");
const langBtn = document.getElementById("langBtn");

const messages = {
  ko: {
    title: "김시준 · 새싹 스튜디오",
    description: "새싹 스튜디오 · 김시준 링크 모음",
    studio: "새싹 스튜디오",
    namePrimary: "김시준",
    nameSecondary: "Kim Sijun",
    bio: "1인 제작 스튜디오",
    website: "Website",
    projectsTitle: "▼ Projects ▼",
    projectsSub: "지금 심고 있는 것들",
    brandAria: "새싹 스튜디오",
    shareAria: "공유하기",
    socialsAria: "소셜 링크",
    linksAria: "주요 링크",
    projectsAria: "프로젝트 링크",
    linkCopied: "링크를 복사했어요",
    copyFailed: "복사에 실패했어요",
    langBtn: "EN",
    langAria: "Switch to English",
  },
  en: {
    title: "Kim Sijun · Sprout Studio",
    description: "Sprout Studio · Kim Sijun link hub",
    studio: "Sprout Studio",
    namePrimary: "Kim Sijun",
    nameSecondary: "김시준",
    bio: "Solo production studio",
    website: "Website",
    projectsTitle: "▼ Projects ▼",
    projectsSub: "Things growing now",
    brandAria: "Sprout Studio",
    shareAria: "Share",
    socialsAria: "Social links",
    linksAria: "Main links",
    projectsAria: "Project links",
    linkCopied: "Link copied",
    copyFailed: "Couldn't copy",
    langBtn: "KO",
    langAria: "한국어로 전환",
  },
};

function getInitialLang() {
  const saved = localStorage.getItem("lang");
  if (saved === "ko" || saved === "en") return saved;
  return "en";
}

let currentLang = getInitialLang();

function applyLang(lang) {
  currentLang = lang;
  const t = messages[lang];
  document.documentElement.lang = lang;
  document.title = t.title;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t.description);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] != null) el.textContent = t[key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    if (t[key] != null) el.setAttribute("aria-label", t[key]);
  });

  if (langBtn) {
    langBtn.textContent = t.langBtn;
    langBtn.setAttribute("aria-label", t.langAria);
  }

  localStorage.setItem("lang", lang);
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "absolute";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(input);
    return ok;
  }
}

langBtn?.addEventListener("click", () => {
  applyLang(currentLang === "ko" ? "en" : "ko");
});

shareBtn?.addEventListener("click", async () => {
  const t = messages[currentLang];
  const shareData = {
    title: document.title,
    text: document.querySelector(".name")?.textContent?.trim() || "Sprout Studio",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch {
      // cancelled or failed — fall through to copy
    }
  }

  const copied = await copyText(window.location.href);
  showToast(copied ? t.linkCopied : t.copyFailed);
});

document.querySelectorAll(".more-btn").forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const t = messages[currentLang];
    const url = btn.dataset.url || window.location.href;
    const copied = await copyText(url);
    showToast(copied ? t.linkCopied : t.copyFailed);
  });
});

applyLang(currentLang);
