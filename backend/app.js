import express from 'express'
import cors from 'cors'
import sequelize from './dbconfig.js'
import Potion from './potion.model.js'
import router from './routes.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)

await sequelize.sync({force: true})
console.log('Banco de dados em memória e tabelas criadas!')

try {
  // 1. Sincroniza o banco (cria a tabela 'Potions' na memória RAM)
  // O { force: true } limpa e recria a estrutura toda vez que o servidor reinicia
  await sequelize.sync({ force: true });
  console.log("⚡ Banco de dados em memória sincronizado com sucesso!");

  // 2. Alimenta o banco com as poções de exemplo obrigatórias do enunciado
  await Potion.bulkCreate([
    {
      nome: "Poção Blue Sky",
      descricao: "Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.",
      imagem: "https://i.ibb.co/ZzS7xb2/rsz-sky.png", // Exemplo de URL de imagem 
      preco: 300.0
    },
    {
      nome: "Poção do Perfume Misterioso",
      descricao: "Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.",
      imagem: "https://i.ibb.co/pyhZJXf/rsz-lilas.png",
      preco: 200.0
    },
    {
      nome: "Poção de Pinus",
      descricao: "Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.",
      imagem: "https://i.ibb.co/DkzdL1q/rsz-pinus.png",
      preco: 3000.0
    },
    {
      nome: "Poção da Beleza Eterna",
      descricao: "Veneno que mata rápido.",
      imagem: "https://i.ibb.co/9p872NK/rsz-1beleza.png",
      preco: 100.0
    },
    {
      nome: "Poção da Hidratação",
      descricao: "Uma complexa combinação de átomos de Hidrogênio e Oxigênio. Refresca instantâneamente. Cuidado: pode levar ao vício!",
      imagem: "https://www.pngarts.com/files/3/Water-Bottle-PNG-Free-Download.png",
      preco: 5.0
    },
    {
      nome: "Estus Flask",
      descricao: "Sente que a sua chama interior está se apagando? Essa poção vai te tirar do vazio dentro do seu peito.",
      imagem: "https://static.wikia.nocookie.net/darksouls/images/0/08/Estus_Flask_%28DSIII%29_-_01.png/revision/latest?cb=20160613233757",
      preco: 1500.0
    },
    {
      nome: "Blood Vial",
      descricao: "Essa poção é muito popular na cidade de Yharnam e entre os vampiros. Esse sangue misterioso cura doenças.",
      imagem: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ca64d18a-11e1-48d4-8ea2-47308246b4b4/dg9yhz1-1894da8c-2bdb-4cd6-9c35-e10524b85740.png/v1/fill/w_710,h_1125/bloodborne_blood_vial_by_technomancer_01_dg9yhz1-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYyMiIsInBhdGgiOiIvZi9jYTY0ZDE4YS0xMWUxLTQ4ZDQtOGVhMi00NzMwODI0NmI0YjQvZGc5eWh6MS0xODk0ZGE4Yy0yYmRiLTRjZDYtOWMzNS1lMTA1MjRiODU3NDAucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.PJ0vIwAQWCBSPAfi3NkXHgMSd984sd1XRFPSyrAX8eE",
      preco: 800.0
    }
  ]);
  console.log("🧪 Poções iniciais da Merigold injetadas no banco com sucesso!");

  // 3. Inicia a escuta do servidor HTTP
  app.listen(port, function () {
    console.log(`🚀 Servidor Web Service rodando redondo na porta ${port}!`);
  });

} catch (error) {
  console.error("❌ Falha crítica ao iniciar o servidor ou o banco de dados:", error);
}