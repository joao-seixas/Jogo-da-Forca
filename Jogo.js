/*Construtor do objeto 'Jogo', com dois métodos:

sorteiaPalavra() - que escolhe aleatoriamente uma palavra dentro do array, cria a palavra secreta conforme a palavra sorteada e reseta as variáveis do objeto

verificaLetra() - que verifica se a letra enviada pertence à palavra sorteada, fazendo a atualização da palavra secreta e indicando na propriedade booleana 'errou' se a jogada resultou ou não num erro do jogador

e com as seguintes propriedades:

todasPalavras - array completo de todas as palavras que podem ser sorteadas

palavraSecreta - string com a palavra sorteada substituída por underscore (respeitando eventuais hífens), que é atualizada automaticamente pelo método verificaLetra()

letrasErradas - array com o conjunto de letras que foram jogadas e não pertencem à palavraSorteada

erros - quantidade de erros cometidos pelo jogador

errou - booleano que indica se a última jogada foi errada (true) ou não (false)*/

export class Jogo {
  constructor(palavras) {
    this.todasPalavras = palavras;
  }

  sorteiaPalavra() {
    this.palavraSorteada = this.todasPalavras[Math.floor(Math.random() * this.todasPalavras.length)].toUpperCase();
    this.palavraSecreta = this.#criaPalavraSecreta();
    this.#resetaVariaveis();
  }

  #resetaVariaveis() {
    this.erros = 0;
    this.letrasErradas = [];
    this.errou = false;
  }

  #criaPalavraSecreta() {
    let palavra = [];

    for (let indice = 0; indice < this.palavraSorteada.length; indice++)
      this.palavraSorteada[indice] == '-' ? palavra.push('-') : palavra.push('_');

    return palavra;
  }

  verificaLetra(letra) {
    letra = letra.toUpperCase();
    let letras = this.#verificaOcorrencias(letra);

    letras.length ? this.#atualizaPalavraSecreta(letras) : this.#errouLetra(letra);
  }

  #verificaOcorrencias(letra) {
    let letras = [];

    for (let indice = 0; indice < this.palavraSorteada.length; indice++)
      this.palavraSorteada[indice].normalize('NFD').replace(/[\u0300-\u036f]/g, '') == letra && letras.push(indice);

    return letras;
  }

  #errouLetra(letra) {
    this.letrasErradas.indexOf(letra) == -1 ? this.#atualizaErros(letra) : this.errou = false;
  }

  #atualizaErros(letra) {
    this.erros++;
    this.letrasErradas.push(letra);
    this.errou = true;
  }

  #atualizaPalavraSecreta(letras) {
    for (let indice = 0; indice < letras.length; indice++)
      this.palavraSecreta[letras[indice]] = this.palavraSorteada[letras[indice]];
    this.errou = false;
  }
}