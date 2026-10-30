export {};

// Exercício 09: Lendo a resposta de uma API de clima

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

// 1) Versão com any (só para ver o problema)
function lerComAny(json: string): void {
  const dados: any = JSON.parse(json);
  console.log(dados.temperatura.toFixed(1));
}
// lerComAny(respostaQuebrada);
// Erro só na execução: TypeError: dados.temperatura.toFixed is not a function
// (o compilador não reclama, pois `any` desliga a checagem de tipos)

// 2) Versão segura com unknown
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerClima(json: string): { cidade: string; temperatura: number } {
  let dados: unknown;
  try {
    dados = JSON.parse(json);
  } catch (e: unknown) {
    if (e instanceof SyntaxError) falhar('JSON malformado');
    throw e;
  }

  if (typeof dados !== 'object' || dados === null) {
    falhar('resposta não é um objeto');
  }
  if (!('cidade' in dados) || typeof dados.cidade !== 'string') {
    falhar('campo "cidade" inválido');
  }
  if (!('temperatura' in dados) || typeof dados.temperatura !== 'number') {
    falhar('campo "temperatura" inválido');
  }
  return { cidade: dados.cidade, temperatura: dados.temperatura };
}

// 3) Testando as três respostas
for (const resposta of [respostaOk, respostaQuebrada, respostaInvalida]) {
  try {
    const clima = lerClima(resposta);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    }
  }
}

// Demonstração do problema do any (erro em tempo de execução)
try {
  lerComAny(respostaQuebrada);
} catch (erro: unknown) {
  if (erro instanceof Error) console.error(`[any] ${erro.message}`);
}
