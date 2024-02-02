export function criaTeclado() {
  const linhas = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  const teclado = document.getElementById('teclado');

  teclado.classList.add('teclado');
  for (let indice = 0; indice < linhas.length; indice++) {
    criaLinhas(linhas[indice], indice);
  }
  function criaLinhas(linha, numeroLinha) {
    let linhaAtual = document.createElement('div');
    let quantidadeTeclasFantasma = linhas[0].length - linha.length;
    linhaAtual.classList.add('linha');
  
    adicionaTeclaFantasma(quantidadeTeclasFantasma, linhaAtual);
  
    for (let indice = 0; indice < linha.length; indice++) {
      let tecla = document.createElement('button');
      tecla.classList.add('tecla');
      tecla.id = `tecla-${linha[indice]}`;
      tecla.value = linha[indice].charCodeAt(0);
      tecla.textContent = linha[indice];
      linhaAtual.appendChild(tecla);
    }
  
    adicionaTeclaFantasma(quantidadeTeclasFantasma, linhaAtual);
  
    teclado.appendChild(linhaAtual);
  }
  function adicionaTeclaFantasma(quantidade, linhaAtual) {
    for (quantidade; quantidade > 0; quantidade--) {
      let teclaFantasma = document.createElement('button');
      teclaFantasma.classList.add('tecla-fantasma');
      linhaAtual.appendChild(teclaFantasma);
    }
  } 
}