const celulas = document.querySelectorAll('.celula')
let checarVez = true

const jogador_x = 'X'
const jogador_o = 'O'

const combinacoes = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

document.addEventListener('click', (event) => {
    if (event.target.matches('.celula')) {
        jogar(event.target.id)
    }
})

function jogar(id) {
    const celula = document.getElementById(id)
    vez = checarVez ? jogador_x : jogador_o // se for true é a vez do jogador x
    celula.textContent = vez //exibe jogada na celula
    celula.classList.add(vez)
    checarVencedor(vez)
}

function checarVencedor(vez) {
    const vencedor = combinacoes.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(vez)
        })
    })

    if (vencedor) {
        encerrarJogo(vez)
    } else if (checarEmpate()) {
        encerrarJogo()
    } else {
        checarVez = !checarVez //alterna vez
    }
}

function checarEmpate() {
    let x = 0
    let o = 0

    for (index in celulas) {
        if (!isNaN(index)) {

            if (celulas[index].classList.contains(jogador_x)) {
                x++
            }

            if (celulas[index].classList.contains(jogador_o)) {
                o++
            }

        }
    }

    return x + o === 9 ? true : false
}

function encerrarJogo(vencedor = null) {
   const resultado = document.getElementById('resultado')
   const botao = document.getElementById('botao')
   const p = document.createElement('p')
   let mensagem = null

   resultado.style.display = 'block'
   resultado.appendChild(p)
   botao.style.display = 'block'
   
    if (vencedor) {
        p.innerHTML = `O player [<span>${vencedor}</span>] venceu a partida!`
    } else {
        p.innerHTML = 'VELHA!!! O jogo empatou.'
    }

    botao.addEventListener('click',()=>{
        location.reload()
    })
}

