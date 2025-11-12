"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Tabuleiro e posições
    const pirata = document.getElementById('pirata');
    const pontos = document.querySelectorAll('.ponto-clicavel');
    const imagemMonstro = document.querySelector(".conteudo_organizacao_imagem");
    let casaAtual = 1;
    let moedas = 0;
    let vidas = 3;
    let indice = 0;

    // Sons do jogo
    const somDerrota = document.getElementById('somDerrota');
    const somVitoria = document.getElementById('somVitoria');
    const somMoeda = document.getElementById('somMoeda');
    const somErro = document.getElementById('somErro');
    const somQuiz = document.getElementById('somQuiz');
    const somClique = document.getElementById('somClique');

    let perguntas = [];

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

    // mapeie todas as possibilidades de vida pra evitar undefined
    const erros = {
        3: "erro1.webp",
        2: "erro2.webp",
        1: "erro3.webp"
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
        '12': { top: '64%', left: '74%' }
    };

    const waypoints = {
        '3-4': [{ top: '60%', left: '44%' }],
        '6-7': [{ top: '23%', left: '35%' }],
        '7-8': [{ top: '22%', left: '49%' }],
        '8-9': [{ top: '31%', left: '62%' }],
        '9-10': [{ top: '26%', left: '78%' }],
        '10-11': [{ top: '71%', left: '62%' }],
        '11-12': [{ top: '71%', left: '73%' }]
    };

    function inicializarPontos() {
        pontos.forEach(ponto => {
            const casaAttr = ponto.getAttribute('data-casa');
            const casaNumero = parseInt(casaAttr, 10);
            const pos = posicoesDasCasas[casaAttr] || posicoesDasCasas[casaNumero];

            if (pos) {
                ponto.style.top = pos.top;
                ponto.style.left = pos.left;

                // listener sem async/await desnecessário no handler
                ponto.addEventListener('click', () => {
                    tentarMoverPara(casaNumero);
                });
            } else {
                console.warn(`Posição não encontrada para a casa: ${casaAttr}`);
            }
        });
    }

    function atualizarPontoAtivo() {
        const proximaCasa = casaAtual + 1;

        pontos.forEach(ponto => {
            const casaAttr = ponto.getAttribute('data-casa');
            const casaNumero = parseInt(casaAttr, 10);

            // limpa classes por padrão
            ponto.classList.remove('proxima-casa', 'ponto-gradiente', 'casa-completa');

            if (casaNumero === proximaCasa) {
                ponto.classList.add('proxima-casa');
                if (proximaCasa < 12) ponto.classList.add('ponto-gradiente');
            } else if (casaNumero === proximaCasa - 1) {
                ponto.classList.add('casa-completa');
            }
        });
    }

    async function tentarMoverPara(casaNumero) {
        if (typeof casaNumero !== 'number') return;
        if (casaNumero !== casaAtual + 1) {
            return;
        }

        // bloqueio extra: espera perguntas carregarem antes de permitir movimento final
        if (!perguntas || perguntas.length === 0) {
            console.warn("Perguntas ainda não carregadas — aguardando carregar antes de prosseguir.");
            await iniciarJogo(); // tenta carregar agora
            if (!perguntas || perguntas.length === 0) {
                // se ainda não houver perguntas, evita prosseguir
                console.warn("Não foi possível carregar perguntas. Movimento cancelado.");
                return;
            }
        }

        await moverPirataPara(casaNumero);
        casaAtual = casaNumero;

        if (casaAtual >= 12) {
            mostrarTelaVitoria();
            return;
        }

        if (casaAtual === 2) {
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
                // alguns navegadores podem enviar várias propriedades; pegamos top/left
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
        if (!pos || !pirata) return;
        pirata.style.top = pos.top;
        pirata.style.left = pos.left;
        await esperarTransicao(pirata, tempoEspera + 300);
        await new Promise(r => setTimeout(r, 50));
    }

    async function moverPirataPara(casaDestino) {
        const inicio = posicoesDasCasas[String(casaAtual)];
        const fim = posicoesDasCasas[String(casaDestino)];
        if (!inicio || !fim) {
            console.warn(`Posições inválidas: inicio(${casaAtual}) ou fim(${casaDestino}) não encontradas.`);
            return;
        }

        const chave = `${casaAtual}-${casaDestino}`;
        const wp = waypoints[chave] || [];

        for (let i = 0; i < wp.length; i++) {
            await moveParaPosicao(wp[i], 400);
        }

        await moveParaPosicao(fim, 500);
    }

    function removerVoltar() {
        const el = document.getElementById("voltar");
        if (el) el.classList.add("escondido");
    }

    inicializarPontos();
    const pos1 = posicoesDasCasas['1'];
    if (pos1 && pirata) {
        pirata.style.top = pos1.top;
        pirata.style.left = pos1.left;
    }

    // INICIO DAS CONFIGURAÇÕES DE SOM

    function ativarSomERedirecionar(linkId, soundId, musicaAtualId = null) {
        const linkElement = document.getElementById(linkId);
        const soundElement = document.getElementById(soundId);

        if (linkElement && soundElement) {
            linkElement.addEventListener('click', function (event) {
                if (musicaAtualId) {
                    salvarEPausarMusica(musicaAtualId);
                }

                const urlDestino = this.href;
                if (!urlDestino) return;

                event.preventDefault();

                soundElement.currentTime = 0;
                soundElement.play().catch(() => {
                    window.location.href = urlDestino;
                });

                const onEnded = function () {
                    window.location.href = urlDestino;
                    soundElement.removeEventListener('ended', onEnded);
                };
                soundElement.addEventListener('ended', onEnded);
            });
        }
    }

    // registros de cliques
    ativarSomERedirecionar('jogarSomClique', 'somClique', 'musicaMenu');
    ativarSomERedirecionar('opcoesSomClique', 'somClique', 'musicaMenu');
    ativarSomERedirecionar('VoltarSomCreditos', 'somClique', 'musicaCreditos');
    ativarSomERedirecionar('VoltarSomCreditos', 'somClique', 'musicaMenu');
    ativarSomERedirecionar('ilhaComSom', 'somClique', 'musicaMenu');
    ativarSomERedirecionar('BotaoComSom', 'somClique', 'musicaMenu');
    ativarSomERedirecionar('VoltarilhaComSom', 'somClique', 'musicaMenu');
    ativarSomERedirecionar('reiniciar_jogo_vitoria', 'somClique', 'musicaMenu');
    ativarSomERedirecionar('reiniciar_jogo_derrota', 'somClique', 'musicaMenu');

    function tocarSomClique() {
        if (somClique) {
            try {
                somClique.currentTime = 0;
                somClique.play().catch(e => {
                    console.warn("Falha ao reproduzir somClique:", e);
                });
            } catch (e) {
                console.warn("Erro ao tentar tocar somClique:", e);
            }
        }
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest && e.target.closest('.ponto-clicavel')) {
            tocarSomClique();
        }
    });

    function salvarEPausarMusica(musicaId) {
        const musica = document.getElementById(musicaId);
        if (musica){
            if (musicaId !== 'musicaTabuleiro') {
                localStorage.setItem('musicaTempo', musica.currentTime);
            }
            musica.pause();
        }
    }

    function iniciarMusicaDeFundo(musicaId) {
        const musica = document.getElementById(musicaId);
        const tempoSalvo = localStorage.getItem('musicaTempo');

        if (musica) {
            const iniciar = () => {
                if (tempoSalvo) {
                    musica.currentTime = parseFloat(tempoSalvo);
                } else {
                    musica.currentTime = 0;
                }

                musica.play().catch(e => {
                    console.warn(`Autoplay bloqueado para ${musicaId}. Aguardando interação...`);
                });
            };
            if (musica.readyState >= 1) {
                iniciar();
            } else {
                musica.addEventListener('loadedmetadata', iniciar, { once: true });
            }
        }
    }

    iniciarMusicaDeFundo('musicaMenu');
    iniciarMusicaDeFundo('musicaCreditos');
    iniciarMusicaDeFundo('musicaSelecao');
    iniciarMusicaDeFundo('musicaTabuleiro');

    window.addEventListener('click', function desbloqueioMusica() {

    iniciarMusicaDeFundo('musicaMenu'); 
    iniciarMusicaDeFundo('musicaCreditos');
    iniciarMusicaDeFundo('musicaSelecao');
    window.removeEventListener('click', desbloqueioMusica);

    }, { once: true });

    // FIM DAS CONFIGURAÇÕES DE SOM

    function vidaMoedas() {
        const vidaLocal = document.getElementById("valor-vida");
        if (vidaLocal) {
            vidaLocal.innerHTML = `<img src="../../game_assets/tabuleiro/iconevida.webp" alt="Vida" class="icone-rodape">
            <p class="texto_barra">${vidas}</p>`;
        }
        const moedaLocal = document.getElementById("valor-moeda");
        if (moedaLocal) {
            moedaLocal.innerHTML = `<img src="../../game_assets/tabuleiro/iconemoeda.webp" alt="Moeda" class="icone-rodape">
            <p class="texto_barra">${moedas}</p>`;
        }
    }

    vidaMoedas();
    atualizarPontoAtivo();

    function mostrarQuiz() {
        const quiz = document.getElementById("quiz");
        if (quiz) quiz.classList.remove("escondido");
        if (somQuiz) {
            somQuiz.currentTime = 0;
            somQuiz.play().catch(e => console.warn("Erro ao tocar somQuiz:", e));
        }
    }

    function fecharQuiz() {
        const quiz = document.getElementById("quiz");
        if (quiz) quiz.classList.add("escondido");
        const conteudoMoedas = document.getElementById("conteudo_moedas");
        if (conteudoMoedas) conteudoMoedas.classList.add("conteudo_escondido");
        const conteudoVidas = document.getElementById("conteudo_vidas");
        if (conteudoVidas) conteudoVidas.classList.add("conteudo_escondido");
    }

    function fecharErro() {
        const conteudoVidas = document.getElementById("conteudo_vidas");
        if (conteudoVidas) conteudoVidas.classList.add("conteudo_escondido");
    }

    async function carregarPerguntas() {
        try {
            const response = await fetch("../data/perguntas.json");
            if (!response.ok) {
                throw new Error(`Falha ao buscar perguntas: ${response.status}`);
            }
            const dados = await response.json();
            return dados;
        } catch (err) {
            console.error("Erro ao carregar perguntas:", err);
            return [];
        }
    }

    async function iniciarJogo() {
        if (!perguntas || perguntas.length === 0) {
            perguntas = await carregarPerguntas();
        }
    }

    function mostrarPerguntas() {
        // validações antes de acessar arrays
        if (!perguntas || !perguntas[indice]) {
            console.warn("Pergunta inválida ou não carregada para índice:", indice);
            return;
        }

        const nomeMonstro = monstros[indice] || monstros[0];
        if (imagemMonstro) {
            imagemMonstro.src = `../../game_assets/quiz/${nomeMonstro}`;
        }

        const texto = document.getElementById("pergunta");
        if (texto) texto.innerHTML = perguntas[indice].pergunta || "";

        const opcoes = document.getElementById("opcoes");
        if (!opcoes) return;
        opcoes.innerHTML = "";

        for (let i = 0; i < 4; i++) {
            const opcText = (perguntas[indice].opcoes && perguntas[indice].opcoes[i]) ? perguntas[indice].opcoes[i] : "";
            opcoes.innerHTML += `<div class="conteudo_organizacao_quiz_opcoes_resposta">
                                <button class="botao_opcao" data-resposta-index="${i}">
                                    <div class="conteudo_organizacao_quiz_opcoes_resposta_imagem">
                                        <img src="../../game_assets/quiz/opções.webp" alt="opcao">
                                        <div class="conteudo_organizacao_quiz_opcoes_resposta_texto">
                                            <p>${opcText}</p>
                                        </div>
                                    </div>
                                </button>
                            </div>`;
        }

        // adiciona listeners programaticamente (evita uso inline onclick)
        const botoes = opcoes.querySelectorAll('.botao_opcao');
        botoes.forEach(botao => {
            botao.addEventListener('click', () => {
                const idx = parseInt(botao.getAttribute('data-resposta-index'), 10);
                verificarResposta(idx);
            });
        });
    }

    function mostrarTelaVitoria() {
        salvarEPausarMusica('musicaTabuleiro')
        if (somVitoria) {
            try { somVitoria.currentTime = 0; somVitoria.play(); } catch (e) { console.warn(e); }
        }
        const tela = document.getElementById("tela_vitoria_container");
        mostrarMoedasFinal();
        if (tela) {
            tela.classList.remove("escondido");
            tela.classList.add("mostrar");
        }
    }

    function mostrarTelaDerrota() {
        salvarEPausarMusica('musicaTabuleiro')
        if (somDerrota) {
            try { somDerrota.currentTime = 0; somDerrota.play(); } catch (e) { console.warn(e); }
        }
        const tela = document.getElementById("tela_derrota_container");
        mostrarMoedasFinal();
        if (tela) {
            tela.classList.remove("escondido");
            tela.classList.add("mostrar");
        }
    }

    function desativarBotoes() {
        const todosOsBotoes = document.querySelectorAll(".botao_opcao");
        todosOsBotoes.forEach(botao => {
            botao.disabled = true;
            botao.style.pointerEvents = 'none';

            const containerDaOpcao = botao.closest('.conteudo_organizacao_quiz_opcoes_resposta');
            if (containerDaOpcao) containerDaOpcao.classList.add('desativado');
        });
    }

    function ativarBotoes() {
        const todosOsBotoes = document.querySelectorAll(".botao_opcao");
        todosOsBotoes.forEach(botao => {
            botao.disabled = false;
            botao.style.pointerEvents = 'auto';

            const containerDaOpcao = botao.closest('.conteudo_organizacao_quiz_opcoes_resposta');
            if (containerDaOpcao) containerDaOpcao.classList.remove('desativado');
        });
    }

    function mostrarMoedasFinal() {
        const vitoriaMoeda = document.getElementById("moedas_vitoria");
        const derrotaMoeda = document.getElementById("moedas_derrota");

        const conteudo = `
            <div class="moedas_final_conteudo">
                <img src="../../game_assets/tabuleiro/iconemoeda.webp" alt="Moeda">
                <span class="texto_barra">x${moedas}</span>
            </div>
        `;

        if (vitoriaMoeda) vitoriaMoeda.innerHTML = conteudo;
        if (derrotaMoeda) derrotaMoeda.innerHTML = conteudo;
    }

    // tornamos a função global, mas com checagens internas
    window.verificarResposta = function (num) {
        if (!perguntas || !perguntas[indice]) {
            console.warn("Tentativa de verificar resposta sem perguntas carregadas.");
            return;
        }

        let validar = false;
        const mensagemMoedas = document.getElementById("conteudo_moedas");
        const perguntaObj = perguntas[indice];
        const opcEscolhida = perguntaObj.opcoes ? perguntaObj.opcoes[num] : undefined;

        if (perguntaObj.resposta === opcEscolhida) {
            if (mensagemMoedas) mensagemMoedas.classList.remove("conteudo_escondido");
            if (somMoeda) {
                somMoeda.currentTime = 0;
                somMoeda.play().catch(e => console.warn("Erro ao tocar somMoeda:", e));
            }
            moedas += 3;
            validar = true;
        } else {
            const mensagemVidas = document.getElementById("conteudo_vidas");
            const imagemErro = erros[vidas] || erros[1];
            if (mensagemVidas) {
                mensagemVidas.innerHTML = `<img src="../../game_assets/quiz/fundoopcao.webp" alt="fundo">
                <img src="../../game_assets/quiz/${imagemErro}" class="conteudo_escondido_texto" alt="erro">`;
                mensagemVidas.classList.remove("conteudo_escondido");
            }

            if (somErro && vidas >= 2) {
                somErro.currentTime = 0;
                somErro.play().catch(e => console.warn("Erro ao tocar somErro:", e));
            }

            vidas -= 1;
            desativarBotoes();

            setTimeout(() => {
                fecharErro();
                ativarBotoes();
            }, 2300);
        }

        if (validar === true) {
            desativarBotoes();
            setTimeout(fecharQuiz, 2300);
        }

        vidaMoedas();

        if (vidas <= 0) {
            mostrarTelaDerrota();
        }
    };

    // carrega perguntas inicialmente (non-blocking)
    iniciarJogo();
});
