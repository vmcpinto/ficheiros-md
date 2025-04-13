document.getElementById("toggle").onclick = () => {
  document.body.classList.toggle("dark");
};

fetch("artigos.json")
  .then(res => res.json())
  .then(artigos => {
    const menu = document.getElementById("menu");
    artigos.forEach(artigo => {
      const link = document.createElement("a");
      link.href = `#${artigo.file}`;
      link.textContent = artigo.title;
      menu.appendChild(link);
    });

    window.onhashchange = carregarArtigo;
    if (location.hash) carregarArtigo();
  });

function carregarArtigo() {
  const file = location.hash.substring(1);
  fetch("artigos/" + file)
    .then(res => {
      if (!res.ok) throw new Error("Ficheiro não encontrado");
      return res.text();
    })
    .then(md => {
      document.getElementById("content").innerHTML = marked.parse(md);
    })
    .catch(err => {
      document.getElementById("content").innerHTML = `<p style="color: red;">Erro: ${err.message}</p>`;
    });
}
