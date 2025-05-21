const questions = [
    { q: "Études ?", opts: ["🎨 Art", "🧪 Science", "💼 Business", "❌ Rien"] },
    { q: "Amour ?", opts: ["❤️ Passion", "💔 C compliqué", "🧘 Je m’en fous"] },
    { q: "Carrière ?", opts: ["👩‍💻 Tech", "🌍 ONG", "💰 Start-up", "🥐 Boulanger"] },
    { q: "Vie sociale ?", opts: ["🎉 Extrovertie", "📚 Introspective", "👤 Solo"] },
    { q: "Habitudes ?", opts: ["🏃 Sportif", "🍕 Malbouffe", "🛏️ Flemmard"] }
  ];
  
  let choix = [];
  let timer = 15;
  let index = 0;
  
  const timerDisplay = document.getElementById("timer");
  const questionsDiv = document.getElementById("questions");
  
  function afficherQuestion() {
    if (index >= questions.length) {
      genererResultat();
      return;
    }
    questionsDiv.innerHTML = `<div class="question"><h2>${questions[index].q}</h2></div>`;
    questions[index].opts.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => {
        choix.push(opt);
        index++;
        afficherQuestion();
      };
      questionsDiv.appendChild(btn);
    });
  }
  
  function compteARebours() {
    const interval = setInterval(() => {
      timer--;
      timerDisplay.textContent = timer;
      if (timer <= 0) {
        clearInterval(interval);
        genererResultat();
      }
    }, 1000);
  }
  
  function genererResultat() {
    questionsDiv.innerHTML = '';
    timerDisplay.classList.add("hidden");
  
    const [etud, amour, carriere, social, habitude] = choix;
    const annees = Math.floor(Math.random() * 40 + 60);
    const lieu = ["Brésil", "Islande", "Canada", "Japon", "Maroc"][Math.floor(Math.random()*5)];
    const epilogue = [
      "Tu n’as jamais fini Game of Thrones.",
      "Tu as adopté 3 chats.",
      "Tu es mort en mangeant une raclette."
    ];
    const resultat = `Tu as vécu ${annees} ans. Tu as étudié ${etud || "dans l’école de la vie"}, connu ${amour || "une solitude apaisée"}, travaillé dans ${carriere || "des trucs chelous"}, et mené une vie ${social || "secrète"} avec des habitudes ${habitude || "mystérieuses"}. Tu as fini au ${lieu}. ${epilogue[Math.floor(Math.random()*epilogue.length)]}`;
  
    document.getElementById("result").textContent = resultat;
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("replay").classList.remove("hidden");
  
    localStorage.setItem("simulife_last_result", resultat);
  }
  
  function rejouer() {
    window.location.href = window.location.pathname;
  }
  
  function partager() {
    const url = new URL(window.location.href);
    url.searchParams.set("result", encodeURIComponent(localStorage.getItem("simulife_last_result")));
    document.getElementById("share-url").value = url.toString();
    document.getElementById("share-link").classList.remove("hidden");
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("result")) {
    const res = decodeURIComponent(urlParams.get("result"));
    document.getElementById("result").textContent = res;
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("replay").classList.remove("hidden");
    timerDisplay.classList.add("hidden");
  } else {
    afficherQuestion();
    compteARebours();
  }
  