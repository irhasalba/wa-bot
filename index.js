// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");

const fetch = require("node-fetch");

const hadist = require("./features/hadist");

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
        .sendText(
          message.from,
          `Assalamualaikum Sahabat \n Selamat Datang Di Bot Hadist \n Created By : Muhammad Irhas Albais \n API By : Buka-Hadist \n Untuk memulai silahkan balas dengan diawali '/' dan diikuti kata kunci `
        )
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }

    const body = message.body.charAt(0);
    if (body == "c" && message.isGroupMsg === false) {
      hadist
        .getHadist()
        .then((respoonse) => respoonse.json())
        .then((data) => {
          const randomly = Math.floor(Math.random() * data.results.length);
          const arab = data.results[randomly].arab_text;
          const translated = data.results[randomly].translated;
          const title = data.results[randomly].title;

          client.sendText(
            message.from,
            `Nomor Hadist : ${title} \n \n Hadist : ${arab} \n \n Terjemahan : ${translated}`
          );
        });
    }
  });
}
