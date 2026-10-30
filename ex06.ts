export {};

// Exercício 06: Status do pedido no app de delivery

enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado,
}

enum FormaPagamento {
  Pix = 'PIX',
  Cartao = 'CARTAO',
  Dinheiro = 'DINHEIRO',
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo:
      return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega:
      return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue:
      return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado:
      return 'Pedido cancelado.';
  }
}

function avancar(status: StatusPedido): StatusPedido {
  switch (status) {
    case StatusPedido.Recebido:
      return StatusPedido.EmPreparo;
    case StatusPedido.EmPreparo:
      return StatusPedido.SaiuParaEntrega;
    case StatusPedido.SaiuParaEntrega:
      return StatusPedido.Entregue;
    default:
      return status; // Entregue e Cancelado não mudam
  }
}

// Mapeamento reverso: número -> nome (StatusPedido[2] dá 'EmPreparo')
function linha(status: StatusPedido): string {
  return `[${status} - ${StatusPedido[status]}] ${mensagem(status)}`;
}

let atual: StatusPedido = StatusPedido.Recebido;
console.log(linha(atual));
while (atual !== StatusPedido.Entregue) {
  atual = avancar(atual);
  console.log(linha(atual));
}

const pagamento: FormaPagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${pagamento}`);

// const outro: FormaPagamento = 'PIX'; // ERRO TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
// Por quê: enum de string é um tipo próprio (nominal). Só os membros do enum
// (FormaPagamento.Pix) são aceitos, mesmo que o texto seja igual. Isso evita que
// qualquer string solta entre no lugar de um valor válido.
