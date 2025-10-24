// tabuleiro.js
document.addEventListener('DOMContentLoaded', () => {
    const pirata = document.getElementById('pirata');
    const pontos = document.querySelectorAll('.ponto-clicavel');
    let casaAtual = 1;

    const posicoesDasCasas = {
        '1': { top: '71%', left: '26%' },
        '2': { top: '71%', left: '35%' },
        '3': { top: '70%', left: '45%' },
        '4': { top: '48%', left: '46%' },
        '5': { top: '44%', left: '31%' },
        '6': { top: '26%', left: '29%' },
        '7': { top: '22%', left: '40%' },
        '8': { top: '30%', left: '51%' },
        '9': { top: '25%', left: '71%' },
        '10': { top: '44%', left: '74%' },
        '11': { top: '73%', left: '67%' },
        '12': { top: '61%', left: '73%' },
    };

    const waypoints = {
        '3-4': [
            { top: '60%', left: '44%' },
        ],
        '6-7': [
            { top: '23%', left: '35%' },
        ],
        '7-8': [
            { top: '22%', left: '49%' },
        ],
        '8-9': [
            { top: '31%', left: '62%' },
        ],
        '9-10': [
            { top: '26%', left: '78%' },
        ],
        '10-11': [
            { top: '71%', left: '62%' },
        ],
        '11-12': [
            { top: '71%', left: '73%' },
        ],
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

    async function tentarMoverPara(casaNumero) {
        // Impede mover se não for a próxima casa
        if (casaNumero !== casaAtual + 1) {
            alert('Você só pode mover para a próxima casa!');
            return;
        }

        
        const resposta = prompt(`Casa ${casaNumero}: digite 1 para mover, 0 para cancelar:`) || '0';
        if (resposta.trim() === '1') {
            await moverPirataPara(casaNumero);
            casaAtual = casaNumero; 
        } else {
            alert('Movimento cancelado.');
        }
    }

    // Helper que aguarda a transição CSS terminar (com timeout fallback)
    function esperarTransicao(element, timeout = 800) {
        return new Promise(resolve => {
            let terminado = false;
            const onEnd = (e) => {
                // garantir que é a transição de top/left que terminou
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

    // Move para uma posição {top: 'xx%', left: 'yy%'} e aguarda a transição
    async function moveParaPosicao(pos, tempoEspera = 500) {
        if (!pos) return;
        pirata.style.top = pos.top;
        pirata.style.left = pos.left;
        // espera transição terminar (ou timeout)
        await esperarTransicao(pirata, tempoEspera + 300);
        // pequeno delay extra opcional
        await new Promise(r => setTimeout(r, 50));
    }

    // função principal que recebe a casa destino e verifica se há waypoints
    async function moverPirataPara(casaDestino) {
        const inicio = posicoesDasCasas[casaAtual];
        const fim = posicoesDasCasas[casaDestino];
        if (!inicio || !fim) return;

        // chave do trecho (ordem importa: from-to)
        const chave = `${casaAtual}-${casaDestino}`;
        const wp = waypoints[chave] || [];

        // monta a sequência completa de posições: início (opcional) -> waypoints -> destino
        // não movemos para "inicio" porque já está lá; apenas iteramos sobre wp e fim
        for (let i = 0; i < wp.length; i++) {
            await moveParaPosicao(wp[i], 400); // cada segmento pode ter sua duração
        }

        // por fim, vai para o destino final
        await moveParaPosicao(fim, 500);
    }

    inicializarPontos();
    // posiciona no início
    (function posInicial() {
        const pos1 = posicoesDasCasas[1];
        if (pos1) {
            pirata.style.top = pos1.top;
            pirata.style.left = pos1.left;
        }
    })();
});
