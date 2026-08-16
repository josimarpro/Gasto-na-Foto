let pedido = 'Olhe a foto deste comprovante e responda em UMA linha, sem escrever mais nada, com 2 pedaços separados por |. Primeiro pedaço: o emoji da categoria, o nome do estabelecimento dentro de <strong>, e depois cada item comprado com seu valor, um por linha usando <br>. Segundo pedaço: o total pago, só o número, com ponto e sempre com duas casas decimais. As categorias são: 🛒 Mercado, 🚗 Transporte, 🍔 Comida, 💊 Saúde, 🎉 Lazer, 🏠 Casa, 💸 Outros. Exemplo de resposta: 🍔 <strong>Padaria Pão Quente</strong><br>Pão — R$ 5,00<br>Leite — R$ 4,50|9.50';
let total = 0;
let quantos = 0;

async function lerFoto() {
  const foto = document.querySelector(".foto").files[0];
  const resposta = await puter.ai.chat(pedido, foto);
  const texto = resposta.message.content;
  let notas = [];
notas.push(texto);
localStorage.setItem("notas", JSON.stringify(notas));
  const partes = texto.split("|");
  document.querySelector(".lista").innerHTML += `<div class="comprovante"><div class="itens">${partes[0]}</div><strong>R$ ${partes[1]}</strong></div>`;
  total += Number(partes[1]);
  quantos += 1;
  document.querySelector(".total").innerText = "R$ " + total.toFixed(2);
  document.querySelector(".quantos").innerText = quantos + " comprovantes lidos";
}