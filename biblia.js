
/* ===========================================================
📡 Bíblia Online – Ligação MySQL (via PHP)
=========================================================== */

const bookSelect = document.getElementById("bookSelect");
const chapterSelect = document.getElementById("chapterSelect");
const verseSelect = document.getElementById("verseSelect");
const bibleText = document.getElementById("bibleText");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

/* Função genérica para chamar a API */
async function fetchAPI(url) {
  const res = await fetch(url);
  return res.json();
}

/* Carrega livros */
async function carregarLivros() {
  const livros = await fetchAPI("biblia_api.php?type=livros");
  bookSelect.innerHTML = "<option value=''>Escolher Livro</option>";
  livros.forEach(l => {
    const opt = document.createElement("option");
    opt.value = l.id;
    opt.textContent = l.nome;
    bookSelect.appendChild(opt);
  });
}

/* Quando escolhe livro */
bookSelect.addEventListener("change", async () => {
  const livroId = bookSelect.value;
  chapterSelect.innerHTML = "<option value=''>Capítulo</option>";
  verseSelect.innerHTML = "<option value=''>Versículo</option>";
  bibleText.innerHTML = "";

  if (!livroId) return;

  const caps = await fetchAPI(`biblia_api.php?type=capitulos&livro_id=${livroId}`);
  chapterSelect.disabled = false;

  caps.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = "Capítulo " + c.numero;
    chapterSelect.appendChild(opt);
  });
});

/* Quando escolhe capítulo */
chapterSelect.addEventListener("change", async () => {
  const capId = chapterSelect.value;
  verseSelect.innerHTML = "<option value=''>Versículo</option>";
  bibleText.innerHTML = "";

  if (!capId) return;

  const versos = await fetchAPI(`biblia_api.php?type=versiculos&cap_id=${capId}`);
  verseSelect.disabled = false;

  versos.forEach((v, i) => {
    const opt = document.createElement("option");
    opt.value = i + 1;
    opt.textContent = "Verso " + v.numero;
    verseSelect.appendChild(opt);
  });

  bibleText.innerHTML = versos
    .map(v => `<p><strong>${v.numero}</strong> ${v.texto}</p>`)
    .join("");
});

/* Pesquisa */
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const results = await fetchAPI(`biblia_api.php?type=pesquisa&q=${encodeURIComponent(query)}`);

  if (results.length > 0) {
    bibleText.innerHTML = results
      .map(r => `<p><strong>${r.livro} ${r.cap}:${r.vers}</strong> ${r.texto}</p>`)
      .join("");
  } else {
    bibleText.innerHTML = `<p><em>Nenhum resultado encontrado para "${query}".</em></p>`;
  }
});

/* Inicialização */
carregarLivros();
