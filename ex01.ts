export {};

// Exercício 01: Caixa da padaria

const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
let quantidade1: number = 12;

const nomeProduto2: string = 'Bolo de cenoura';
const precoUnitario2: number = 18.5;
const quantidade2: number = 2;

// Sem anotação: o TypeScript infere o tipo a partir do valor.
let aberta = true; // tipo inferido: boolean

const subtotal1 = precoUnitario1 * quantidade1;
const subtotal2 = precoUnitario2 * quantidade2;
const total = subtotal1 + subtotal2;

const paesNoAno = 1_250_000; // separador numérico
const categoria = 0x1A;      // hexadecimal; ao imprimir, aparece em decimal

// Erro provocado:
// quantidade1 = 'doze'; // ERRO TS2322: Type 'string' is not assignable to type 'number'.

console.log(`${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`);
console.log(`${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesNoAno}`);
console.log(`Categoria: ${categoria}`);
