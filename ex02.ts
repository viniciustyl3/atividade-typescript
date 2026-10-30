export {};

// Exercício 02: Cupom fiscal

const nomeDigitado: string = ' maria da silva ';

function formatarNome(nome: string): string {
  const minusculas = ['da', 'de', 'do'];
  return nome
    .trim()
    .split(' ')
    .filter((p) => p !== '') // remove espaços duplicados
    .map((p, i) => {
      const palavra = p.toLowerCase();
      if (i > 0 && minusculas.includes(palavra)) return palavra;
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(' ');
}

const precoLido = '12.40';
const quantidadeLida = '3un';
const preco: number = Number(precoLido);
const quantidade: number = parseInt(quantidadeLida);

const clienteFidelidade: boolean = true;
const numeroCupom = 42;

const subtotal = preco * quantidade;
const desconto = clienteFidelidade ? subtotal * 0.05 : 0;
const total = subtotal - desconto;

const cupom = `CUPOM Nº ${String(numeroCupom).padStart(6, '0')}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${total.toFixed(2)}`;

console.log(cupom);
