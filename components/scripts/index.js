document.addEventListener('DOMContentLoaded', () => {
    const musicaFundo = document.getElementById('musica_fundo');
    const somClique = document.getElementById('som_clique');
    const som = [
        "../../game_assets/opcoes/som.webp",
        "../../game_assets/opcoes/som_desligado.webp"
    ]
    const musica = [
        "../../game_assets/opcoes/musica.webp",
        "../../game_assets/opcoes/musica_desligada.webp"
    ]

    let somCliqueAtivo = true;

    function mostrarAba(aba) {
        let creditos = document.getElementById(aba);
        creditos.classList.remove("esconder");
    }

    function fecharAba(aba) {
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

    function manipularMusica(elemento) {
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

    // Manipulação do som de clique
    
    function tocarSomClique() {
        if (somCliqueAtivo && somClique) {
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

    function alterarSomClique() {
        somCliqueAtivo = !somCliqueAtivo; 
        if (somCliqueAtivo) {
            tocarSomClique();
        }
        return somCliqueAtivo;
    }

    function manipularSomClique(elemento) {
        const imgElement = elemento.querySelector('img');
        alterarSomClique(); 

        if (somCliqueAtivo) {
            imgElement.src = som[0];
        } else {
            imgElement.src = som[1];
        }
    }

    window.tocarSomClique = tocarSomClique;
    window.mostrarAba = mostrarAba;
    window.fecharAba = fecharAba;
    window.manipularMusica = manipularMusica;
    window.manipularSomClique = manipularSomClique;
});