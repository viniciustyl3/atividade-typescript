export {};

// Exercício 10: Sistema de estacionamento (projeto integrador)

type Placa = string;
type Periodo = [entrada: number, saida: number]; // horas cheias, ex.: [8, 11]

type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };
type Veiculo = Carro | Moto | Caminhao;

enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO',
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

function calcularTarifa(v: Veiculo, horas: number): number {
  const adicionais = horas - 1;
  switch (v.tipo) {
    case 'carro':
      return 8 + 5 * adicionais;
    case 'moto':
      return 4 + 2 * adicionais;
    case 'caminhao':
      return 15 + 10 * adicionais;
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}

// Teste da verificação exaustiva: acrescentando Van à união, sem tratá-la no switch:
//   type Van = { readonly placa: Placa; tipo: 'van'; lugares: number };
//   type Veiculo = Carro | Moto | Caminhao | Van;
// ERRO TS2322: Type 'Van' is not assignable to type 'never'. (em `const _naoTratado: never = v;`)
// O never garantiu que, ao surgir um novo tipo de veículo, o compilador aponte
// exatamente os switches que esqueceram de tratá-lo, em vez de falhar só em produção.

function fecharTicket(t: Ticket): Ticket {
  const [entrada, saida] = t.periodo;
  const horas = Math.max(saida - entrada, 1);
  const bruto = calcularTarifa(t.veiculo, horas);
  const valor = t.selo ? bruto * 0.5 : bruto;
  return { ...t, valor, situacao: SituacaoTicket.Pago };
}

function registrar(msg: string): void {
  console.log(msg);
}

function horasDe(t: Ticket): number {
  return Math.max(t.periodo[1] - t.periodo[0], 1);
}

function descrever(t: Ticket): string {
  const v = (t.valor ?? 0).toFixed(2);
  const selo = t.selo ? ' (selo -50%)' : '';
  return `[${t.situacao}] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${horasDe(t)}h - R$ ${v}${selo}`;
}

// Entrada externa
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerVeiculo(json: string): Veiculo {
  let dados: unknown;
  try {
    dados = JSON.parse(json);
  } catch {
    return falhar('JSON malformado');
  }
  if (typeof dados !== 'object' || dados === null) return falhar('veículo não é um objeto');
  if (!('placa' in dados) || typeof dados.placa !== 'string') return falhar('campo "placa" inválido');
  if (!('tipo' in dados) || typeof dados.tipo !== 'string') return falhar('campo "tipo" inválido');

  const placa = dados.placa;
  switch (dados.tipo) {
    case 'carro':
      if (!('portas' in dados) || (dados.portas !== 2 && dados.portas !== 4)) {
        return falhar('campo "portas" inválido');
      }
      return { placa, tipo: 'carro', portas: dados.portas };
    case 'moto':
      if (!('cilindradas' in dados) || typeof dados.cilindradas !== 'number') {
        return falhar('campo "cilindradas" inválido');
      }
      return { placa, tipo: 'moto', cilindradas: dados.cilindradas };
    case 'caminhao':
      if (!('eixos' in dados) || typeof dados.eixos !== 'number') {
        return falhar('campo "eixos" inválido');
      }
      return { placa, tipo: 'caminhao', eixos: dados.eixos };
    default:
      return falhar(`tipo "${dados.tipo}" desconhecido`);
  }
}

// Dados de teste (os veículos chegam como JSON)
const jsons: [string, Periodo, boolean][] = [
  ['{"placa":"ABC1D23","tipo":"carro","portas":4}', [8, 11], false],
  ['{"placa":"MOT0A12","tipo":"moto","cilindradas":160}', [9, 10], false],
  ['{"placa":"CAM9Z99","tipo":"caminhao","eixos":3}', [7, 12], false],
  ['{"placa":"XYZ4E56","tipo":"carro","portas":2}', [14, 16], true],
];

const abertos: Ticket[] = jsons.map(([json, periodo, selo]) => ({
  veiculo: lerVeiculo(json),
  periodo,
  selo,
  situacao: SituacaoTicket.Aberto,
}));

// Relatório
const fechados = abertos.map(fecharTicket);
fechados.filter((t) => t.situacao === SituacaoTicket.Pago).forEach((t) => registrar(descrever(t)));

const faturamento = fechados.reduce((soma, t) => soma + (t.valor ?? 0), 0);
console.log(`Faturamento: R$ ${faturamento.toFixed(2)}`);

const entradas = fechados.reduce(
  (cont, t) => ({ ...cont, [t.veiculo.tipo]: cont[t.veiculo.tipo] + 1 }),
  { carro: 0, moto: 0, caminhao: 0 },
);
console.log(`Entradas: carro=${entradas.carro}, moto=${entradas.moto}, caminhao=${entradas.caminhao}`);

try {
  lerVeiculo('{"placa":"BIC0001","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) console.log(`Erro ao ler veículo: ${erro.message}`);
}
