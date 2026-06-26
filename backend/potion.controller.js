import Potion from './potion.model.js'

function findAllPotions(request, response) {
    Potion.findAll()
        .then(function (results) {
            response.status(200).json(results)
        })
        .catch(function (e) {
            console.log(e)
            response.status(500).json({error: "Erro ao buscar as poções."})
        })
}

function createPotion(request, response) {
    const { nome, descricao, imagem, preco } = request.body;
    if (!nome || !descricao || !imagem || !preco) {
        return response.status(400).json({error: "Todos os campos são obrigatórios."});
    }

    Potion.create({nome, descricao, imagem, preco})
        .then(function (result) {
            response.status(201).json(result)
        })
        .catch(function (e) {
            console.log(e)
            response.status(500).json({error: "Erro ao cadastrar a poção."})
        })
}

function deletePotion(request, response) {
    Potion.destroy({where: {id: request.params.id}})
        .then(function (result) {
            if (result == 1) {
                return response.status(200).json({message: "Poção removida com sucesso!"})
            }
            response.status(404).json({error: "Poção não encontrada."})
        })
        .catch(function (e) {
            console.log(e)
            response.status(500).json({error: "Erro ao remover a poção."})
        })
}

export default {findAllPotions, createPotion, deletePotion}