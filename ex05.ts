export {};

// Exercício 05: Boletim do clima

type Leitura = [cidade: string, temperatura: number];

const leituras: Leitura[] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29],
];

function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

const temps = leituras.map(([, t]) => t);
const [minima, maxima] = extremos(temps);
const media = temps.reduce((a, b) => a + b, 0) / temps.length;
console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);

// Contatos de imprensa: e-mail opcional
type Contato = [nome: string, telefone: string, email?: string];
const contato1: Contato = ['Ana', '(69) 99999-0000', 'ana@jornal.com'];
const contato2: Contato = ['Bruno', '(69) 98888-1111'];
console.error(contato1, contato2);

// Histórico semanal com elemento rest
type Historico = [cidade: string, ...temperaturas: number[]];
function mediaHistorico([cidade, ...temperaturas]: Historico): string {
  const m = temperaturas.reduce((a, b) => a + b, 0) / temperaturas.length;
  return `Média semanal de ${cidade}: ${m.toFixed(1)}°C`;
}
console.error(mediaHistorico(['Porto Velho', 33, 34, 35, 32, 34, 36, 33]));

const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[0] = 'AM'; // ERRO TS2540: Cannot assign to '0' because it is a read-only property.
console.error(capitalOficial);
