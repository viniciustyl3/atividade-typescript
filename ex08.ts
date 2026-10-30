export {};

// Exercício 08: Formulário de cadastro

const codigo: number | string = 42;

function formatarCodigo(c: number | string): string {
  const numero = typeof c === 'number' ? c : parseInt(c.replace(/\D/g, ''), 10);
  return `CLI-${String(numero).padStart(4, '0')}`;
}

type Tamanho = 'P' | 'M' | 'G' | 'GG';
const tamanho: Tamanho = 'M';
// const tamanhoInvalido: Tamanho = 'XG'; // ERRO TS2322: Type '"XG"' is not assignable to type 'Tamanho'.

type Regiao = 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul';

function calcularFrete(regiao: Regiao): number {
  switch (regiao) {
    case 'norte': return 25;
    case 'nordeste': return 20;
    case 'centro-oeste': return 18;
    case 'sudeste': return 12;
    case 'sul': return 15;
  }
}

const rua = 'Rua das Flores, 100';
const complemento: string | null = null;

function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, '');
}

// Inferência de literais:
const r = 'sul';          // const: tipo inferido é o literal 'sul' -> pode ser passado
// let r2 = 'sul';        // let: o tipo é alargado para string, pois o valor pode mudar depois
// calcularFrete(r2);     // ERRO TS2345: Argument of type 'string' is not assignable to parameter of type 'Regiao'.
let r3 = 'sul' as const;  // correção: com `as const` o let mantém o tipo literal 'sul'

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${tamanho}`);
console.log(`Entrega: ${rua} - ${complemento ?? '(sem complemento)'}`);
console.log(`Frete para o sul: R$ ${calcularFrete(r).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
console.error(limparTelefone(69999990000), calcularFrete(r3), formatarCodigo('CLI-0042'));
