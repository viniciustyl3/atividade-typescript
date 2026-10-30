export {};

// Exercício 07: Central de notificações

type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return; // return antecipado (vazio)
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  destinatarios.forEach((d) => enviar(d, mensagem));
}

const aviso = 'Reunião de pais sexta às 19h';
notificarTodos(['ana@escola.com'], aviso, porEmail);
notificarTodos(['joao.resp'], aviso, porApp);
notificarTodos(['(69) 99999-0000'], 'x'.repeat(200), porSms);

// function teste(): void { return 10; } // ERRO TS2322: Type 'number' is not assignable to type 'void'.

// Reflexão:
const contar: Notificador = (d, m) => m.length; // aceito
// Quando o tipo de FUNÇÃO tem retorno void, ele significa "o chamador não vai usar o retorno",
// e não "a função não pode retornar nada". Assim, uma função que retorna valor continua
// compatível. Isso permite, por exemplo, passar uma arrow function que retorna algo para
// forEach, que espera um callback void. Já uma declaração `function f(): void { return 10; }`
// é checada diretamente e dá erro.
console.error(contar('a', 'abc'));
