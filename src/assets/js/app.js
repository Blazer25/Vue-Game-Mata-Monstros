new Vue({
    el: '#app',
    data: {
        //Variáveis
        jogoRodando: false,
        vidaJogador: 100,
        vidaMonstro: 100,
        logs: []
    },
    computed: {
        //Retorno do resultado do jogo (ganhou ou perdeu)
        resultadoJogo() {
            return this.vidaJogador == 0 || this.vidaMonstro == 0
        }
    },
    methods: {
        //Iniciar o jogo (botão)
        iniciarJogo() {
            this.jogoRodando = true
            this.vidaJogador = 100
            this.vidaMonstro = 100
            this.logs = []
            
        },

        //Especial -> False para ataque normal e true para ataque especial.  
        ataque(especial) {
            this.ferirInimigo('vidaMonstro', 5, 10, especial,'Monstro', 'Jogador', 'monster' )
            this.ferirInimigo('vidaJogador', 7, 12, false, 'Jogador', 'Monstro', 'player')
        },
        // O que irá causar dano ao inimigo, é esperado que seja passado a vida do jogador, valor min/max de dano e se é um ataque especial ou não
        //Também espera os params sobre o log de ataque (quem atacou, alvo do ataque e a classe CSS)
        ferirInimigo(vidaJogador, valorMinimo, valorMaximo, especial, quemAtacou, AlvoAtacado,classeDeCadaTipoDeAtaque ) {
            const maiorDano = especial ? 5 : 0 // se for especial irá causar +5 de dano, se não, +0

            const causarDano = this.gerandoNumeroAleatorio(valorMinimo + maiorDano, valorMaximo + maiorDano)
            this[vidaJogador] = Math.max(this[vidaJogador] - causarDano, 0 )

            this.registraLogDeBatalha(`O ${quemAtacou} atacou o ${AlvoAtacado}, com ${causarDano} pontos de dano.`, classeDeCadaTipoDeAtaque)
        },

        // Gerando o número aleatório
        gerandoNumeroAleatorio(valorMinimo, valorMaximo) {
            const valor = Math.random() * (valorMaximo - valorMinimo) + valorMinimo

            return Math.round(valor)
        },

        // Método de cura
        curar(valorMinimo, valorMaximo){
            const recuperarVida = this.gerandoNumeroAleatorio(valorMinimo, valorMaximo)
            this.vidaJogador = Math.min(this.vidaJogador + recuperarVida, 100)
            this.registraLogDeBatalha(`O Jogador ganhou ${recuperarVida} pontos de vida`, 'heal')
        },

        // quando o jogador é curado, ao mesmo tempo ele é atacado pelo monstro
        sofrerAtaqueAoCurar(){
            this.curar(15,20)
            this.ferirInimigo('vidaJogador', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        registraLogDeBatalha(texto, classeDeCadaTipoDeAtaque){
            this.logs.unshift({ texto, classeDeCadaTipoDeAtaque })
        }
    },
    // Some com os botões da tela quando o jogo é finalizado
    watch: {
        resultadoJogo(valor) {
            if (valor) this.jogoRodando = false
        }
    }
})