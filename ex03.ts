export {};

// Exercício 03: Ficha de paciente

const paciente: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '123.456.789-00',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'Pedro Souza', telefone: '(69) 99999-0000' },
};

// Só os campos obrigatórios (reaproveita o tipo de "paciente" com typeof)
const paciente2: typeof paciente = {
  cpf: '987.654.321-00',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false,
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  const alergias = p.alergias ? `Alergias: ${p.alergias.join(', ')}` : 'Sem alergias registradas';
  return `${p.nome}, ${p.idade} anos. ${alergias}`;
}

console.log(resumo(paciente));
console.log(resumo(paciente2));

// Erros provocados:
// paciente.cpf = '000.000.000-00'; // ERRO TS2540: Cannot assign to 'cpf' because it is a read-only property.
// const p3: typeof paciente = { cpf: '1', nome: 'X', idade: 1, plano: false, peso: 70 }; // ERRO TS2353: Object literal may only specify known properties, and 'peso' does not exist in type '{ readonly cpf: string; nome: string; ... }'.

// Reflexão:
let dados: object = paciente;
// dados.nome; // ERRO TS2339: Property 'nome' does not exist on type 'object'.
// Por quê: o tipo `object` só diz "isto é um valor não primitivo (objeto, array, função...)".
// Ele não carrega nenhuma propriedade conhecida, então o compilador não deixa acessar `nome`.
// O tipo foi alargado de propósito: perdemos o formato do objeto original.

let x: {} = 10;
// let y: object = 10; // ERRO TS2322: Type 'number' is not assignable to type 'object'.
// `{}` significa "qualquer valor que não seja null nem undefined", e isso inclui primitivos
// como o número 10 (que pode ser tratado como objeto Number ao acessar métodos).
// `object` só aceita tipos não primitivos (objetos, arrays, funções), então 10 é recusado.
console.log(dados, x);
