const API = 'http://localhost:3000/potions';
const vitrine = document.getElementById('vitrine')

function carregarVitrine() {
    axios.get(API)
        .then(function (response) {
            const pocoes = response.data;

            if (pocoes.length == 0) {
                vitrine.innerHTML = '<p>Perdão pelo inconveniente mas estamos sem poções no momento. Volte mais tarde!</p>'
                return
            }

            let html = ''

            pocoes.forEach(pocao => {
                html += `
                    <div class="potion-card">
                        <img src="${pocao.imagem}" alt="Imagem da ${pocao.nome}">
                        <div>
                            <h3>${pocao.nome}</h3>
                            <p class="potion-description">${pocao.descricao}</p>
                        </div>
                        <div>
                            <p class="price">${pocao.preco} moedas</p>
                            <button class="btn-buy" onclick="alert('Compra realizada!')">Comprar</button>
                        </div>
                    </div>
                `
            });

            vitrine.innerHTML = html
        })
        .catch(function (error) {
            console.error('Erro ao buscar pocoes:', error)
            vitrine.innerHTML = '<p style="color: #cf6679;">Nossas corujas mensageiras se perderam. Erro ao carregar o catálogo.</p>'
        })
}

carregarVitrine()