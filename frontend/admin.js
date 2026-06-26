const API = 'http://localhost:3000/potions';
const form = document.getElementById('form-cadastro')
const listaPotionsAdmin = document.getElementById('lista-potions-admin')

function listarPocoesAdmin() {
    axios.get(API)
        .then(function (response) {
            const pocoes = response.data;

            if (pocoes.length == 0) {
                listaPotionsAdmin.innerHTML = '<p>Não há poções cadastradas.</p>'
                return;
            }

            let html = '<ul class="potion-list">'
            pocoes.forEach(pocao => {
                html += `
                    <li class="potion-item">
                        <div style="display: flex">
                            <img src="${pocao.imagem}" class="potion-img" alt="Imagem da ${pocao.nome}">
                            <div>
                                <strong>${pocao.nome}</strong> - ${pocao.preco} moedas
                                <p class="potion-description">${pocao.descricao}</p>
                            </div>
                        </div>
                        <button onclick="deletarPocao(${pocao.id})" class="btn-delete">
                            Excluir
                        </button>
                    </li>
                `;
            });

            html += '</ul>'
            listaPotionsAdmin.innerHTML = html;
        })
        .catch(function (error) {
            console.error("Erro ao buscar pocoes:", error)
            listaPotionsAdmin.innerHTML = "<p style='color: #cf6679;'>Erro ao carregar lista de poções :(</p>"
        })
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const newPotion = {
        nome: document.getElementById("nome").value,
        descricao: document.getElementById("descricao").value,
        imagem: document.getElementById("imagem").value,
        preco: parseFloat(document.getElementById("preco").value)
    }

    axios.post(API, newPotion)
        .then(function (response) {
            form.reset()
            listarPocoesAdmin()
        })
        .catch(function (error) {
            console.error('Erro ao cadastrar pocao:', error)
        })
})

window.deletarPocao = function (id) {
    axios.delete(API + '/' + id)
        .then(function (response) {
            listarPocoesAdmin()
        })
        .catch(function (error) {
            console.error('Erro ao deletar poção:', error)
        })
}

listarPocoesAdmin()