export {};

// Exercício 04: Lista de compras do mês

const itens: { nome: string; preco: number; quantidade: number }[] = [
  { nome: 'Arroz 5kg', preco: 28.9, quantidade: 1 },
  { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
  { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
  { nome: 'Café 500g', preco: 17.9, quantidade: 1 },
  { nome: 'Sabão em pó', preco: 12.5, quantidade: 1 },
];

const nomes: string[] = itens.map((i) => i.nome);
const caros = itens.filter((i) => i.preco > 10);
const total: number = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);

const categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza'];
// categorias.push('Bebidas'); // ERRO TS2339: Property 'push' does not exist on type 'readonly string[]'.

// Despensa: 3 prateleiras, cada uma com a quantidade de itens por posição
const despensa: number[][] = [[2, 0, 1], [4, 4], [1]];
const itensNaDespensa = despensa
  .map((prateleira) => prateleira.reduce((a, b) => a + b, 0))
  .reduce((a, b) => a + b, 0);

// Desestruturação e spread
const [primeiro, segundo] = itens;
const novaLista = [...itens, { nome: 'Açúcar 1kg', preco: 5.5, quantidade: 1 }];

console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.map((i) => i.nome).join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);
console.log(`Itens na despensa: ${itensNaDespensa}`);

// Extras (não fazem parte da saída esperada, mas mostram a desestruturação e o spread)
console.error(`Primeiro: ${primeiro.nome} | Segundo: ${segundo.nome}`);
console.error(`Original: ${itens.length} itens | Nova lista: ${novaLista.length} itens`);
