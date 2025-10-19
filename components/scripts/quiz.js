let perguntas = [
  {
    "pergunta": "Quanto é 6 + 3?",
    "opcoes": ["9", "6", "4", "3"],
    "resposta": "9"
  },
  {
    "pergunta": "Qual número vem depois do 9?",
    "opcoes": ["8", "11", "10", "12"],
    "resposta": "10"
  },
  {
    "pergunta": "Quanto é 5-2?",
    "opcoes": ["3", "4", "2", "1"],
    "resposta": "3"
  },
  {
    "pergunta": "Mateus tem um cesto com 6 maçãs e 2 bananas. Quantas frutas há no total?",
    "opcoes": ["10", "7", "8", "9"],
    "resposta": "8"
  },
  {
    "pergunta": "Se Nai tem 10 balas e come 3, com quantas balas ela fica?",
    "opcoes": ["5", "7", "8", "6"],
    "resposta": "7"
  },
  {
    "pergunta": "Qual é o resultado de 5 × 2?",
    "opcoes": ["7", "12", "10", "15"],
    "resposta": "10"
  },
  {
    "pergunta": "Um cachorro tem 4 patas. Quantas patas têm 2 cachorros?",
    "opcoes": ["4", "8", "10", "6"],
    "resposta": "8"
  },
  {
    "pergunta": "Tiago tem 2 caixas com 6 lápis em cada uma. Quantos lápis ele tem no total?",
    "opcoes": ["10", "12", "8", "14"],
    "resposta": "12"
  },
  {
    "pergunta": "Um ônibus tem 20 lugares. Se 12 pessoas já estão sentadas, quantos lugares ainda estão livres?",
    "opcoes": ["7", "9", "8", "10"],
    "resposta": "8"
  },
  {
    "pergunta": "Luiza tem 12 balas e quer dividir igualmente entre 4 amigos. Quantas balas cada um recebe?",
    "opcoes": ["3", "4", "6", "2"],
    "resposta": "3"
  }
];

let indice = 7;
let moedas = 0;

inicializarJogo();

function inicializarJogo(){
  let monstro = document.getElementById("monstro");
  switch(indice){
    case 0:
      monstro.innerHTML += `<img src="/game_assets/monstros/tartaruga.png" class="conteudo_organizacao_imagem">`;
      break;
    case 1:
      monstro.innerHTML += `<img src="/game_assets/monstros/carangueijo.png" class="conteudo_organizacao_imagem">`;
      break;
    case 2:
      monstro.innerHTML += `<img src="/game_assets/monstros/papagaio.png" class="conteudo_organizacao_imagem">`;
      break;
    case 3:
      monstro.innerHTML += `<img src="/game_assets/monstros/macaco.png" class="conteudo_organizacao_imagem">`;
      break;
    case 4:
      monstro.innerHTML += `<img src="/game_assets/monstros/tiki.png" class="conteudo_organizacao_imagem">`;
      break;
    case 5:
      monstro.innerHTML += `<img src="/game_assets/monstros/sereia.png" class="conteudo_organizacao_imagem">`;
      break; 
    case 6:
      monstro.innerHTML += `<img src="/game_assets/monstros/pirata zumbi.png" class="conteudo_organizacao_imagem">`;
      break;
    case 7:
      monstro.innerHTML += `<img src="/game_assets/monstros/serpente marinha.png" class="conteudo_organizacao_imagem">`;
      break;
    case 8:
      monstro.innerHTML += `<img src="/game_assets/monstros/titã.png" class="conteudo_organizacao_imagem">`;
      break;  
    case 9:
      monstro.innerHTML += `<img src="/game_assets/monstros/fantasma pirata.png" class="conteudo_organizacao_imagem">`;
      break; 
  }

  let texto = document.getElementById("pergunta");
  texto.innerHTML = perguntas[indice].pergunta;

  let opcoes = document.getElementById("opcoes");
  opcoes.innerHTML = "";

  for(i = 0; i < 4; i++) {
    opcoes.innerHTML +=`<div class="conteudo_organizacao_quiz_opcoes_resposta">
                          <button>
                              <div class="conteudo_organizacao_quiz_opcoes_resposta_imagem">
                                  <img src="/game_assets/opções.png">
                                  <div class="conteudo_organizacao_quiz_opcoes_resposta_texto">
                                      <p>${perguntas[indice].opcoes[i]}</p>
                                  </div>
                              </div>
                          </button>
                      </div>`;
  }
}

function verificarResposta(num){
  if(perguntas[indice].resposta == perguntas[indice].opcoes[num]){
    
  }
}