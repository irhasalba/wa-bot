// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === "/start" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Silahkan Masukan Hadist yang ingin dicari")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
    if (message.body === "bukhari muslim" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Berikut Adalah Hadist yang anda cari")
        .then((result) => {
          console.log(result);
        })
        .catch((erro) => {
          console.error(erro);
        });
    }
  });
}
