import { Jogo } from './Jogo.js';
import { cookies } from './cookies.js';
import { palavras } from './palavras.js';
import { criaTeclado } from './teclado/teclado.js';

const palavraSecreta = document.getElementById('palavraSecreta');
const spanLetrasErradas = document.getElementById('spLetrasJogadas');
const imagemForca = document.getElementById('imgForca');
const botaoNovaPalavra = document.getElementById('btnNovaPalavra');
const instrucoesNovoJogo = document.getElementById('instrucoes-novo-jogo');
const instrucoesTeclado = document.getElementById('instrucoes-teclado');
const audioAcerto = new Audio('./audios/acerto.wav');
const audioErro = new Audio('./audios/erro.wav');
const jogos = document.getElementById('jogos');
const vitorias = document.getElementById('vitorias');
const derrotas = document.getElementById('derrotas');
const rodape = document.getElementById('rodape');

let placar = cookies();
const jogo = new Jogo(palavras);

document.body.addEventListener('keyup', verificaTeclasGerais);
botaoNovaPalavra.addEventListener('click', novoJogo);
window.addEventListener('load', () => inicializaJogo());

function inicializaJogo() {
  if (navigator.maxTouchPoints > 0) rodape.style.display = 'none';
  criaTeclado();
  document.querySelectorAll('.tecla').forEach((tecla) => {
    tecla.addEventListener('click', teclou);
  });
  inicializaPlacar();
  atualizaPontos();
  novoJogo();
}

function inicializaPlacar() {
  if (!placar.pontos) placar.pontos = 0;
  if (!placar.vitorias) placar.vitorias = 0;
  if (!placar.derrotas) placar.derrotas = 0;
}

function novoJogo() {
  jogo.sorteiaPalavra();
  atualizaPlacar();
  limpaResultado();
  desativaElementos(false);
}

function teclou(evento) {
  verificaPalavra(evento.target.textContent);
  evento.target.disabled = true;
  evento.target.classList.remove('ativo');
}

function verificaTeclasGerais(evento) {
  if (evento.keyCode < 91 && evento.keyCode > 64) {
    const botao = document.getElementById(`tecla-${evento.key.toUpperCase()}`);
    botao.click();
  } else evento.key === 'Escape' && botaoNovaPalavra.click();
}

function verificaPalavra(letra) {
  jogo.verificaLetra(letra);
  atualizaPlacar();
  verificaJogada();
}

function atualizaPlacar() {
  palavraSecreta.textContent = jogo.palavraSecreta.join('');
  spanLetrasErradas.textContent = jogo.letrasErradas.join(' - ');
}

function atualizaPontos() {
  jogos.textContent = placar.vitorias + placar.derrotas;
  vitorias.textContent = placar.vitorias;
  derrotas.textContent = placar.derrotas;
}

function verificaJogada() {
  if (jogo.errou) {
    audioErro.play();
    atualizaForca();
  } else {
    audioAcerto.play();
    verificaVitoria();
  }
}

function atualizaForca() {
  imagemForca.src = `img/Forca0${jogo.erros}.png`;
  if (jogo.erros > 5) {
    derrota();
    fimJogo();
  }
}

function verificaVitoria() {
  if (jogo.palavraSorteada == jogo.palavraSecreta.join('')) {
    vitoria();
    fimJogo();
  }
}

function fimJogo() {
  falar(new SpeechSynthesisUtterance(jogo.palavraSorteada.toLowerCase()));
  palavraSecreta.textContent = jogo.palavraSorteada;
  desativaElementos(true);
  atualizaPontos();
}

function desativaElementos(acao) {
  botaoNovaPalavra.disabled = !acao;
  if (acao) {
    botaoNovaPalavra.classList.add('ativo');
    instrucoesNovoJogo.classList.remove('instrucoes-desativada');
    instrucoesTeclado.classList.add('instrucoes-desativada');
  } else {
    botaoNovaPalavra.classList.remove('ativo');
    instrucoesNovoJogo.classList.add('instrucoes-desativada');
    instrucoesTeclado.classList.remove('instrucoes-desativada');
  }
  document.querySelectorAll('.tecla').forEach((elemento) => {
    elemento.disabled = acao;
    acao ? elemento.classList.remove('ativo') : elemento.classList.add('ativo');
  });
}

function derrota() {
  palavraSecreta.classList.add('errou');
  placar.derrotas++;
  placar.setCookie('derrotas', placar.derrotas, 12);
}

function vitoria() {
  let pontos = (7 - parseInt(jogo.erros)) ** 2;

  palavraSecreta.classList.add('acertou');
  placar.vitorias++;
  placar.setCookie('vitorias', placar.vitorias, 12);
  placar.pontos += pontos;
  placar.setCookie('pontos', placar.pontos, 12);
}

function falar(texto) {
  const vozes = speechSynthesis.getVoices().filter(voz => voz.lang == 'pt-BR');
  if (vozes) {
    texto.voice = vozes[Math.floor(Math.random() * vozes.length)];
    texto.rate = 1.2;
    texto.lang = 'pt-BR';
    speechSynthesis.speak(texto);
  }
}

function limpaResultado() {
  palavraSecreta.classList.remove('acertou', 'errou');
  atualizaForca();
  desativaElementos(false);
}