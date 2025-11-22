document.addEventListener('DOMContentLoaded', () => {
    // --- MÚSICA E SONS ---
    const musicaFundo = document.getElementById('musica_fundo');
    const somClique = document.getElementById('som_clique');
    const somPergunta = document.getElementById('som_pergunta');
    const somVitoria = document.getElementById('som_vitoria');
    const somDerrota = document.getElementById('som_derrota');
    const somMoeda = document.getElementById('som_moeda');
    const somVida = document.getElementById('som_vida');

    const som = [
        "game_assets/opcoes/som.webp",
        "game_assets/opcoes/som_desligado.webp"
    ]
    const musica = [
        "game_assets/opcoes/musica.webp",
        "game_assets/opcoes/musica_desligada.webp"
    ]

    let somAtivo = true;

    window.mostrarAba = function (aba) {
        let creditos = document.getElementById(aba);
        creditos.classList.remove("esconder");
    }

    window.fecharAba = function (aba) {
        let creditos = document.getElementById(aba);
        creditos.classList.add("esconder");
    }

    // Iniciar a música
    function tocarMusica() {
        if (musicaFundo && musicaFundo.paused) {
            musicaFundo.muted = false;
            musicaFundo.play().catch(error => {
                console.log("A reprodução automática ainda está bloqueada.");
            });
            document.removeEventListener('click', tocarMusica);
        }
    }

    document.addEventListener('click', tocarMusica, { once: true });

    window.manipularMusica = function (elemento) {
        const imgElement = elemento.querySelector('img');
        if (musicaFundo && !musicaFundo.paused) {
            imgElement.src = musica[1];
            musicaFundo.pause();
        }
        else {
            musicaFundo.play();
            imgElement.src = musica[0];
        }
    }

    // Manipulação do som e opções de sons

    window.tocarSomClique = function () {
        if (somAtivo && somClique) {
            try {
                somClique.currentTime = 0;
                somClique.play().catch(e => {
                    console.log("Falha ao reproduzir somClique:", e);
                });
            } catch (e) {
                console.log("Erro ao tentar tocar somClique:", e);
            }
        }
    }

    function tocarSomPergunta() {
        if (somAtivo && somPergunta) {
            try {
                somPergunta.currentTime = 0;
                somPergunta.play().catch(e => {
                    console.log("Falha ao reproduzir somPergunta:", e);
                });
            } catch (e) {
                console.log("Erro ao tentar tocar somPergunta:", e);
            }
        }
    }

    function tocarSomVitoria() {
        if (somAtivo && somVitoria) {
            try {
                somVitoria.currentTime = 0;
                somVitoria.play().catch(e => {
                    console.log("Falha ao reproduzir SomVitoria:", e);
                });
            } catch (e) {
                console.log("Erro ao tentar tocar SomVitoria:", e);
            }
        }
    }

    function tocarSomDerrota() {
        if (somAtivo && somDerrota) {
            try {
                somDerrota.currentTime = 0;
                somDerrota.play().catch(e => {
                    console.log("Falha ao reproduzir somDerrota:", e);
                });
            } catch (e) {
                console.log("Erro ao tentar tocar somDerrota:", e);
            }
        }
    }

    function tocarSomMoeda() {
        if (somAtivo && somMoeda) {
            try {
                somMoeda.currentTime = 0;
                somMoeda.play().catch(e => {
                    console.log("Falha ao reproduzir somMoeda:", e);
                });
            } catch (e) {
                console.log("Erro ao tentar tocar somMoeda:", e);
            }
        }
    }

    function tocarSomVida() {
        if (somAtivo && somVida) {
            try {
                somVida.currentTime = 0;
                somVida.play().catch(e => {
                    console.log("Falha ao reproduzir somVida:", e);
                });
            } catch (e) {
                console.log("Erro ao tentar tocar somVida:", e);
            }
        }
    }

    function alterarSom() {
        somAtivo = !somAtivo;
        if (somAtivo) {
            tocarSomClique();
        }
        return somAtivo;
    }

    window.manipularSomClique = function (elemento) {
        const imgElement = elemento.querySelector('img');
        alterarSom();

        if (somAtivo) {
            imgElement.src = som[0];
        } else {
            imgElement.src = som[1];
        }
    }

    // --- CONFIGURAÇÕES DE MAPAS ---

    const CONFIG_MAPAS = {
        'ilha': {
            imagemFundo: 'game_assets/tabuleiro/ilha/mapa.webp',
            posicoesCasas: {
                '1': { top: '75%', left: '25%' },
                '2': { top: '77%', left: '35%' },
                '3': { top: '68%', left: '45%' },
                '4': { top: '48%', left: '46%' },
                '5': { top: '40%', left: '30%' },
                '6': { top: '23%', left: '29%' },
                '7': { top: '19%', left: '40%' },
                '8': { top: '28%', left: '51%' },
                '9': { top: '23%', left: '71%' },
                '10': { top: '44%', left: '74%' },
                '11': { top: '76%', left: '67%' },
                '12': { top: '64%', left: '74%' },
            },
            waypoints: {
                '3-4': [{ top: '60%', left: '44%' },],
                '6-7': [{ top: '23%', left: '35%' },],
                '7-8': [{ top: '22%', left: '49%' },],
                '8-9': [{ top: '31%', left: '62%' },],
                '9-10': [{ top: '26%', left: '78%' },],
                '10-11': [{ top: '71%', left: '62%' },],
                '11-12': [{ top: '71%', left: '73%' },],
            },
            monstros: [
                "ilha/tartaruga.webp",
                "ilha/carangueijo.webp",
                "ilha/papagaio.webp",
                "ilha/macaco.webp",
                "ilha/tiki.webp",
                "ilha/sereia.webp",
                "ilha/pirata zumbi.webp",
                "ilha/serpente marinha.webp",
                "ilha/titã.webp",
                "ilha/fantasma pirata.webp"
            ],
            pergunta: 'game_assets/quiz/ilha/pergunta.webp',
            fundoPergunta: 'game_assets/quiz/ilha/fundoperguntas.webp',
            opcoes: 'ilha/opcoes.webp',
            personagem: 'game_assets/tabuleiro/ilha/iconepirata.webp',
            imagemBau: 'game_assets/tabuleiro/ilha/bau.webp',
            chavePerguntas: 'ilha'
        },
        'caverna': {
            imagemFundo: 'game_assets/tabuleiro/caverna/caverna.webp',
            posicoesCasas: {
                '1': { top: '78%', left: '28%' },
                '2': { top: '91%', left: '23%' },
                '3': { top: '60%', left: '35%' },
                '4': { top: '43%', left: '28%' },
                '5': { top: '24%', left: '22%' },
                '6': { top: '26%', left: '40%' },
                '7': { top: '47%', left: '55%' },
                '8': { top: '28%', left: '70%' },
                '9': { top: '43%', left: '73%' },
                '10': { top: '74%', left: '74%' },
                '11': { top: '85%', left: '62%' },
                '12': { top: '74%', left: '45%' },
            },
            waypoints: {
                '1-2': [{ top: '85%', left: '30%' },],
                '2-3': [{ top: '83%', left: '20%' },],
                '3-4': [{ top: '50%', left: '37%' },],
                '4-5': [{ top: '35%', left: '18%' },],
                '5-6': [{ top: '18%', left: '29%' },],
                '8-9': [{ top: '13%', left: '80%' },],
                '9-10': [{ top: '54%', left: '68%' },],
                '10-11': [{ top: '90%', left: '78%' },],
            },
            monstros: [
                "caverna/barata.webp",
                "caverna/centopeia.webp",
                "caverna/aranha.webp",
                "caverna/morcego.webp",
                "caverna/goblin.webp",
                "caverna/dragaobebe.webp",
                "caverna/goblinpai.webp",
                "caverna/fantasma.webp",
                "caverna/alien.webp",
                "caverna/dragao.webp"
            ],
            pergunta: 'game_assets/quiz/caverna/pergunta.webp',
            fundoPergunta: 'game_assets/quiz/caverna/fundoperguntas.webp',
            opcoes: 'caverna/opcoes.webp',
            personagem: 'game_assets/tabuleiro/caverna/iconeexplorador.webp',
            imagemBau: 'game_assets/tabuleiro/caverna/bau.webp',
            chavePerguntas: 'caverna'
        },
        'deserto': {
            imagemFundo: 'game_assets/tabuleiro/deserto/deserto.webp',
            posicoesCasas: {
                '1': { top: '92%', left: '46%' },
                '2': { top: '91%', left: '21%' },
                '3': { top: '77%', left: '30%' },
                '4': { top: '67%', left: '42%' },
                '5': { top: '57%', left: '32%' },
                '6': { top: '50%', left: '20%' },
                '7': { top: '30%', left: '23%' },
                '8': { top: '19%', left: '31%' },
                '9': { top: '12%', left: '40%' },
                '10': { top: '21%', left: '52%' },
                '11': { top: '27%', left: '62%' },
                '12': { top: '13%', left: '79%' },
            },
            waypoints: {
                '2-3': [{ top: '80%', left: '22%' },],
            },
            monstros: [
                "deserto/besouro.webp",
                "deserto/gato.webp",
                "deserto/dromedario.webp",
                "deserto/cobra.webp",
                "deserto/mumia.webp",
                "deserto/esfinge.webp",
                "deserto/leao.webp",
                "deserto/passaro.webp",
                "deserto/leaodepe.webp",
                "deserto/anubis.webp"
            ],
            pergunta: 'game_assets/quiz/deserto/pergunta.webp',
            fundoPergunta: 'game_assets/quiz/deserto/fundoperguntas.webp',
            opcoes: 'deserto/opcoes.webp',
            personagem: 'game_assets/tabuleiro/deserto/iconeegito.webp',
            imagemBau: 'game_assets/tabuleiro/deserto/bau.webp',
            chavePerguntas: 'deserto'
        }
    };

    window.reiniciarJogo = function () {
        casaAtual = 1;
        moedas = 0;
        vidas = 3;
        indice = 0;

        const posInicial = posicoesDasCasas[1];
        if (posInicial) {
            protagonista.style.top = posInicial.top;
            protagonista.style.left = posInicial.left;
        }

        resetarCasas();
        adicionarVoltar();
        vidaMoedas();
        atualizarPontoAtivo();
        fecharQuiz();
        ativarBotoes();
    }

    window.carregarMapa = function (idMapa) {
        const config = CONFIG_MAPAS[idMapa];

        if (!config) {
            console.error("Configuração de mapa não encontrada para:", idMapa);
            return;
        }

        posicoesDasCasas = config.posicoesCasas;
        waypoints = config.waypoints || {};
        monstros = config.monstros;
        chavePerguntasAtual = config.chavePerguntas;
        imagemOpcao = config.opcoes;

        const mapaTabuleiro = document.querySelector('.tabuleiro_conteudo');
        if (mapaTabuleiro) {
            mapaTabuleiro.style.backgroundImage = `url(${config.imagemFundo})`;
        }

        if (protagonista && config.personagem) {
            protagonista.src = config.personagem;
        }

        const bau = document.querySelector('.ponto_clicavel[data-casa="12"]');
        if (bau) {
            bau.style.backgroundImage = `url(${config.imagemBau})`;
        }

        const fundoDasPerguntas = document.querySelector('.quiz_conteudo');
        if (fundoDasPerguntas) {
            fundoDasPerguntas.style.backgroundImage = `url(${config.fundoPergunta})`;
        }

        const localPerguntas = document.getElementById('imagem_pergunta');
        if (localPerguntas) {
            localPerguntas.src = config.pergunta;
        }

        const quizContainer = document.getElementById('texto_quiz');

        if (quizContainer) {
            quizContainer.classList.remove('quiz_tema_branco', 'quiz_tamanho_opcao');

            if (idMapa === 'caverna') {
                quizContainer.classList.add('quiz_tema_branco');
            }

            if (idMapa === 'caverna' || idMapa === 'deserto') {
                quizContainer.classList.add('quiz_tamanho_opcao');
            }
        }

        atualizarPosicoesVisuais();

        if (typeof window.reiniciarJogo === 'function') {
            window.reiniciarJogo();
        }

        fecharAba('aba_mapas');
        mostrarAba('tabuleiro');
        iniciarJogo();
    };

    function atualizarPosicoesVisuais() {
        pontos.forEach(ponto => {
            const casaNumero = parseInt(ponto.getAttribute('data-casa'));
            const pos = posicoesDasCasas[casaNumero];

            if (pos) {
                ponto.style.top = pos.top;
                ponto.style.left = pos.left;
                ponto.style.display = 'block';
            } else {
                ponto.style.display = 'none';
            }
        });
    }

    // --- TABULEIRO E QUIZ ---

    const protagonista = document.getElementById('protagonista');
    const pontos = document.querySelectorAll('.ponto_clicavel');
    const imagemMonstro = document.querySelector(".quiz_conteudo_organizacao_imagem");
    let casaAtual = 1;
    let moedas = 0;
    let vidas = 3;
    let indice = 0;

    let monstros = CONFIG_MAPAS['ilha'].monstros;
    let posicoesDasCasas = CONFIG_MAPAS['ilha'].posicoesCasas;
    let waypoints = CONFIG_MAPAS['ilha'].waypoints;
    let chavePerguntasAtual = 'ilha';
    let imagemOpcao = CONFIG_MAPAS['ilha'].opcoes;
    let perguntas;

    const erros = {
        3: "erro1.webp",
        2: "erro2.webp",
    };

    function inicializarPontos() {
        pontos.forEach(ponto => {
            const casaNumero = parseInt(ponto.getAttribute('data-casa'));
            ponto.addEventListener('click', async () => {
                await tentarMoverPara(casaNumero);
            });
        });
        atualizarPosicoesVisuais();
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
                if (casaNumero == proximaCasa - 1) {
                    ponto.classList.add('casa-completa')
                }
            }
        });
    }

    function resetarCasas() {
        pontos.forEach(ponto => {
            ponto.classList.remove('casa-completa');
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
            tocarSomVitoria()
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
        protagonista.style.top = pos.top;
        protagonista.style.left = pos.left;
        await esperarTransicao(protagonista, tempoEspera + 300);
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

    function removerVoltar() {
        let quiz = document.querySelector(".tabuleiro_conteudo_espacamento_cabecalho");
        quiz.classList.add("escondido");
    }

    function adicionarVoltar() {
        let quiz = document.querySelector(".tabuleiro_conteudo_espacamento_cabecalho");
        quiz.classList.remove("escondido");
    }

    inicializarPontos();
    const pos1 = posicoesDasCasas[1];
    if (pos1) {
        protagonista.style.top = pos1.top;
        protagonista.style.left = pos1.left;
    }

    // Perguntas e manipução de itens

    function vidaMoedas() {
        let vidaLocal = document.getElementById("valor_vida");
        vidaLocal.innerHTML = `<img src="game_assets/tabuleiro/iconevida.webp" class="icone-rodape">
        <p class="texto_barra">${vidas}</p>`;
        let moedaLocal = document.getElementById("valor_moeda");
        moedaLocal.innerHTML = `<img src="game_assets/tabuleiro/iconemoeda.webp" class="icone-rodape">
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
        document.getElementById("quiz_conteudo_moedas").classList.add("quiz_conteudo_escondido");
        document.getElementById("quiz_conteudo_vidas").classList.add("quiz_conteudo_escondido");
    }

    function fecharErro() {
        document.getElementById("quiz_conteudo_vidas").classList.add("quiz_conteudo_escondido");
    }

    async function carregarPerguntas() {
        let response = await fetch("components/data/perguntas.json");
        let dados = await response.json();
        return dados;
    }

    async function iniciarJogo() {
        let dadosCompletos = await carregarPerguntas();
        perguntas = dadosCompletos[chavePerguntasAtual];
    }

    function mostrarPerguntas() {
        tocarSomPergunta();
        let nomeMonstro = monstros[indice];
        imagemMonstro.src = `game_assets/quiz/${nomeMonstro}`;

        let texto = document.getElementById("pergunta");
        texto.innerHTML = perguntas[indice].pergunta;

        let opcoes = document.getElementById("opcoes");
        opcoes.innerHTML = "";

        for (let i = 0; i < 3; i++) {
            opcoes.innerHTML += `<div class="quiz_conteudo_organizacao_quiz_opcoes_resposta">
                                <button class="quiz_botao_opcao" onclick="verificarResposta(${i})">
                                    <div class="quiz_conteudo_organizacao_quiz_opcoes_resposta_imagem">
                                        <img src="game_assets/quiz/${imagemOpcao}">
                                        <div class="quiz_conteudo_organizacao_quiz_opcoes_resposta_texto">
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

    window.esconderTelaVitoria = function () {
        const tela = document.getElementById("tela_vitoria_container");
        tela.classList.remove("mostrar");
        tela.classList.add("escondido");
    }

    window.esconderTelaDerrota = function () {
        const tela = document.getElementById("tela_derrota_container");
        tela.classList.remove("mostrar");
        tela.classList.add("escondido");
    }

    function desativarBotoes() {
        let todosOsBotoes = document.querySelectorAll(".quiz_botao_opcao");
        todosOsBotoes.forEach(botao => {
            botao.disabled = true;
            botao.style.pointerEvents = 'none';

            let containerDaOpcao = botao.closest('.quiz_conteudo_organizacao_quiz_opcoes_resposta');

            if (containerDaOpcao) {
                containerDaOpcao.classList.add('desativado');
            }
        });
    }

    function ativarBotoes() {
        let todosOsBotoes = document.querySelectorAll(".quiz_botao_opcao");
        todosOsBotoes.forEach(botao => {
            botao.disabled = false;
            botao.style.pointerEvents = 'auto';

            let containerDaOpcao = botao.closest('.quiz_conteudo_organizacao_quiz_opcoes_resposta');

            if (containerDaOpcao) {
                containerDaOpcao.classList.remove('desativado');
            }
        });
    }

    function mostrarMoedasFinal() {
        const vitoriaMoeda = document.getElementById("moedas_vitoria");
        const derrotaMoeda = document.getElementById("moedas_derrota");

        const conteudo = `
         <div class="moedas_final_conteudo">
            <img src="game_assets/tabuleiro/iconemoeda.webp">
            <span class="texto_barra">x${moedas}</span>
        </div>
    `;

        if (vitoriaMoeda) vitoriaMoeda.innerHTML = conteudo;
        if (derrotaMoeda) derrotaMoeda.innerHTML = conteudo;
    }

    window.verificarResposta = function (num) {
        let mensagemMoedas = document.getElementById("quiz_conteudo_moedas");

        if (perguntas[indice].resposta == perguntas[indice].opcoes[num]) {
            mensagemMoedas.classList.remove("quiz_conteudo_escondido");
            tocarSomMoeda();
            moedas += 3;
            desativarBotoes();
            setTimeout(fecharQuiz, 2300);
        }
        else {
            let imagemErro = erros[vidas] || erros[2];

            vidas -= 1;
            tocarSomVida();

            if (vidas <= 0) {
                fecharQuiz();
                mostrarTelaDerrota();
                tocarSomDerrota()
            } else {
                let mensagemVidas = document.getElementById("quiz_conteudo_vidas");

                mensagemVidas.innerHTML = `<img src="game_assets/quiz/fundoopcao.webp">
                <img src="game_assets/quiz/${imagemErro}" class="quiz_conteudo_escondido_texto">`;

                mensagemVidas.classList.remove("quiz_conteudo_escondido");
                desativarBotoes();

                setTimeout(() => {
                    fecharErro();
                    ativarBotoes();
                }, 2300);
            }
        }
        vidaMoedas();
    };

    iniciarJogo();
});