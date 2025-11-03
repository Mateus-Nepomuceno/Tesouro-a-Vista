document.addEventListener('DOMContentLoaded', () => {
    // Tabuleiro e posições
    const pirata = document.getElementById('pirata');
    const pontos = document.querySelectorAll('.ponto-clicavel');
    const imagemMonstro = document.querySelector(".conteudo_organizacao_imagem");
    let casaAtual = 1;
    let moedas = 0;
    let vidas = 3;
    let indice = 0;

    let perguntas;
    const monstros = [
        "tartaruga.webp",
        "carangueijo.webp",
        "papagaio.webp",
        "macaco.webp",
        "tiki.webp",
        "sereia.webp",
        "pirata zumbi.webp",
        "serpente marinha.webp",
        "titã.webp",
        "fantasma pirata.webp"
    ];

    const erros = {
        3: "erro1.webp",
        2: "erro2.webp",
    };

    const posicoesDasCasas = {
        '1': { top: '69%', left: '26%' },
        '2': { top: '72%', left: '35%' },
        '3': { top: '68%', left: '45%' },
        '4': { top: '48%', left: '46%' },
        '5': { top: '40%', left: '31%' },
        '6': { top: '26%', left: '29%' },
        '7': { top: '22%', left: '40%' },
        '8': { top: '30%', left: '51%' },
        '9': { top: '25%', left: '71%' },
        '10': { top: '44%', left: '74%' },
        '11': { top: '73%', left: '67%' },
        '12': { top: '64%', left: '74%' },
    };

    const waypoints = {
        '3-4': [{ top: '60%', left: '44%' },],
        '6-7': [{ top: '23%', left: '35%' },],
        '7-8': [{ top: '22%', left: '49%' },],
        '8-9': [{ top: '31%', left: '62%' },],
        '9-10': [{ top: '26%', left: '78%' },],
        '10-11': [{ top: '71%', left: '62%' },],
        '11-12': [{ top: '71%', left: '73%' },],
    };

    function inicializarPontos() {
        pontos.forEach(ponto => {
            const casaNumero = parseInt(ponto.getAttribute('data-casa'));
            const pos = posicoesDasCasas[casaNumero];

            if (pos) {
                ponto.style.top = pos.top;
                ponto.style.left = pos.left;


                ponto.addEventListener('click', async () => {
                    await tentarMoverPara(casaNumero);
                });
            }
        });
    }

    function atualizarPontoAtivo() {
        const proximaCasa = casaAtual + 1;

        pontos.forEach(ponto => {
            const casaNumero = parseInt(ponto.getAttribute('data-casa'));

            if (casaNumero === proximaCasa) {
                ponto.classList.add('proxima-casa');
                if (proximaCasa < 12)
                    ponto.classList.add('ponto-gradiente');
            } else {
                ponto.classList.remove('proxima-casa');
            }
        });
    }

    async function tentarMoverPara(casaNumero) {
    if (casaNumero !== casaAtual + 1) {
        return;
    }

    await moverPirataPara(casaNumero);
    casaAtual = casaNumero;

    if (casaAtual >= 12) {
        mostrarTelaVitoria();
        return; 
    }

    if (casaAtual == 2) {
        removerVoltar();
    }

    atualizarPontoAtivo();

    indice = casaAtual - 2;
    mostrarPerguntas();
    mostrarQuiz();
}

    function esperarTransicao(element, timeout = 800) {
        return new Promise(resolve => {
            let terminado = false;
            const onEnd = (e) => {
                if (e.propertyName === 'top' || e.propertyName === 'left') {
                    if (!terminado) {
                        terminado = true;
                        element.removeEventListener('transitionend', onEnd);
                        clearTimeout(tid);
                        resolve();
                    }
                }
            };
            element.addEventListener('transitionend', onEnd);
            const tid = setTimeout(() => {
                if (!terminado) {
                    terminado = true;
                    element.removeEventListener('transitionend', onEnd);
                    resolve();
                }
            }, timeout);
        });
    }

    async function moveParaPosicao(pos, tempoEspera = 500) {
        if (!pos) return;
        pirata.style.top = pos.top;
        pirata.style.left = pos.left;
        await esperarTransicao(pirata, tempoEspera + 300);
        await new Promise(r => setTimeout(r, 50));
    }

    async function moverPirataPara(casaDestino) {
        const inicio = posicoesDasCasas[casaAtual];
        const fim = posicoesDasCasas[casaDestino];
        if (!inicio || !fim) return;

        const chave = `${casaAtual}-${casaDestino}`;
        const wp = waypoints[chave] || [];

        for (let i = 0; i < wp.length; i++) {
            await moveParaPosicao(wp[i], 400);
        }


        await moveParaPosicao(fim, 500);
    }

    function removerVoltar(){
        let quiz = document.getElementById("voltar");
        quiz.classList.add("escondido");
    }

    inicializarPontos();
    const pos1 = posicoesDasCasas[1];
    if (pos1) {
        pirata.style.top = pos1.top;
        pirata.style.left = pos1.left;
    }

    // Perguntas e manipução de itens

    function vidaMoedas() {
        let vidaLocal = document.getElementById("valor-vida");
        vidaLocal.innerHTML = `<img src="../../game_assets/tabuleiro/iconevida.webp" alt="Vida" class="icone-rodape">
        <p class="texto_barra">${vidas}</p>`;
        let moedaLocal = document.getElementById("valor-moeda");
        moedaLocal.innerHTML = `<img src="../../game_assets/tabuleiro/iconemoeda.webp" alt="Moeda" class="icone-rodape">
        <p class="texto_barra">${moedas}</p>`;
    }

    vidaMoedas();
    atualizarPontoAtivo();

    function mostrarQuiz() {
        let quiz = document.getElementById("quiz");
        quiz.classList.remove("escondido");
        
    }

    function fecharQuiz() {
        let quiz = document.getElementById("quiz");
        quiz.classList.add("escondido");
        document.getElementById("conteudo_moedas").classList.add("conteudo_escondido");
        document.getElementById("conteudo_vidas").classList.add("conteudo_escondido");
    }

    function fecharErro(){
        document.getElementById("conteudo_vidas").classList.add("conteudo_escondido");
    }

    async function carregarPerguntas() {
        let response = await fetch("../data/perguntas.json");
        let dados = await response.json();
        return dados;
    }

    async function iniciarJogo() {
        perguntas = await carregarPerguntas();
    }

    function mostrarPerguntas() {
        let nomeMonstro = monstros[indice];
        imagemMonstro.src = `../../game_assets/quiz/${nomeMonstro}`;

        let texto = document.getElementById("pergunta");
        texto.innerHTML = perguntas[indice].pergunta;

        let opcoes = document.getElementById("opcoes");
        opcoes.innerHTML = "";

        for (let i = 0; i < 4; i++) {
            opcoes.innerHTML += `<div class="conteudo_organizacao_quiz_opcoes_resposta">
                                <button class="botao_opcao" onclick="verificarResposta(${i})">
                                    <div class="conteudo_organizacao_quiz_opcoes_resposta_imagem">
                                        <img src="../../game_assets/quiz/opções.webp">
                                        <div class="conteudo_organizacao_quiz_opcoes_resposta_texto">
                                            <p>${perguntas[indice].opcoes[i]}</p>
                                        </div>
                                    </div>
                                </button>
                            </div>`;
        }
    }

    function mostrarTelaVitoria() {
        const tela = document.getElementById("tela_vitoria_container");
        mostrarMoedasFinal()
        tela.classList.remove("escondido");
        tela.classList.add("mostrar");
    }

    function mostrarTelaDerrota() {
        const tela = document.getElementById("tela_derrota_container");
        mostrarMoedasFinal()
        tela.classList.remove("escondido");
        tela.classList.add("mostrar");
    }

    function mostrarMoedasFinal() {
    const vitoriaMoeda = document.getElementById("moedas_vitoria");
    const derrotaMoeda = document.getElementById("moedas_derrota");

    const conteudo = `
        <span class="moedas_final_conteudo">
            <span class="texto_barra">Moedas conquistadas: x${moedas}</span>
        </span>
    `;

    if (vitoriaMoeda) vitoriaMoeda.innerHTML = conteudo;
    if (derrotaMoeda) derrotaMoeda.innerHTML = conteudo;
    }

    window.verificarResposta = function (num) {
        let validar = false;
        let mensagem = document.getElementById("conteudo_moedas");
        if (perguntas[indice].resposta == perguntas[indice].opcoes[num]) {
            mensagem.classList.remove("conteudo_escondido");
            moedas += 3;
            validar = true;
        }
        else {
            let mensagem = document.getElementById("conteudo_vidas");
            let imagemErro = erros[vidas];
            mensagem.innerHTML = `<img src="../../game_assets/quiz/fundoopcao.webp">
            <img src="../../game_assets/quiz/${imagemErro}" class="conteudo_escondido_texto">`;
            mensagem.classList.remove("conteudo_escondido");
            vidas -= 1;
            setTimeout(fecharErro, 2300);
        }
        if(validar == true){
            let todosOsBotoes = document.querySelectorAll(".botao_opcao");
            todosOsBotoes.forEach(botao => {
                botao.disabled = true;
                botao.style.pointerEvents = 'none';

                let containerDaOpcao = botao.closest('.conteudo_organizacao_quiz_opcoes_resposta');

                if (containerDaOpcao) {
                    containerDaOpcao.classList.add('desativado');
                }
            });
            setTimeout(fecharQuiz, 2300);
        }
        vidaMoedas();

        if (vidas <= 0) {
            mostrarTelaDerrota();
        }
    };

    iniciarJogo();
});